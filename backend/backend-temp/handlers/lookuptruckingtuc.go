package handlers

import (
	"backend/db"
	"context"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// LookupAndSavetfs handles the lookup and save process for TFS data
func LookupAndSavetft(w http.ResponseWriter, r *http.Request) {
	// Check if the writer supports flushing for SSE
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	// Set SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	// Notify the client about clearing the collection
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processtft collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processtft collection.")

	lookupProcessCollection := db.GetCollection("lookup_processtft")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processtft collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processtft collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processtft collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processtft collection successfully.\"}\n\n")
	flusher.Flush()

	// Notify about pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing first aggregation pipeline...\"}\n\n")
	flusher.Flush()
	log.Println("Executing First Aggregation Pipeline.")

	// Define the first aggregation pipeline
	firstPipeline := mongo.Pipeline{
		// Step 1: Filter records with valid Kode and Mitra Code Genesis
		{{Key: "$match", Value: bson.M{
			"Mitra Code Genesis": bson.M{"$exists": true},
			"STTNumbers":         bson.M{"$exists": true},
			"Kode":               bson.M{"$exists": true},
		}}},

		// Step 2: Add a field for converted date with error handling
		{{Key: "$addFields", Value: bson.D{
			{Key: "convertedDate", Value: bson.D{{Key: "$ifNull", Value: bson.A{
				bson.D{{Key: "$dateFromString", Value: bson.M{
					"dateString": "$STTDate",
					"format":     "%d-%b-%Y",
					"onError":    nil, // Set to null if conversion fails
					"onNull":     nil, // Handle cases where the date field is null
				}}},
				"-", // Default value if parsing fails or date is null
			}}}},
		}}},

		// Step 3: Lookup from mastertbs_4
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastertbs_49"},
			{Key: "let", Value: bson.M{"kodedatatft": "$Kode"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$KodeTft", "$$kodedatatft"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "Bill", Value: -1}}}},
				{{Key: "$limit", Value: 1}},
			}},
			{Key: "as", Value: "mastertbs"},
		}}},

		// Step 4: Unwind mastertbs
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$mastertbs"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 5: Lookup from mastermn_1
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastermn_1"},
			{Key: "localField", Value: "Mitra Code Genesis"},
			{Key: "foreignField", Value: "Mitra Code Genesis"},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$project", Value: bson.D{
					{Key: "Mitra Code Genesis", Value: 1},
					{Key: "Kategori", Value: 1},
					{Key: "Nama Mitra", Value: 1},
					{Key: "3LC", Value: 1},
				}}},
			}},
			{Key: "as", Value: "mastermn"},
		}}},

		// Step 6: Unwind mastermn
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$mastermn"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// // Step 7: Lookup from masterls_3
		// {{Key: "$lookup", Value: bson.D{
		// 	{Key: "from", Value: "masterls_3"},
		// 	{Key: "let", Value: bson.M{"sttNo": "$STTNumbers"}},
		// 	{Key: "pipeline", Value: mongo.Pipeline{
		// 		{{Key: "$match", Value: bson.D{
		// 			{Key: "$expr", Value: bson.D{
		// 				{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
		// 			}},
		// 		}}},
		// 		{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
		// 		{{Key: "$project", Value: bson.D{
		// 			{Key: "Last Status", Value: 1},
		// 			{Key: "STT Updated Actor Name", Value: 1},
		// 		}}},
		// 	}},
		// 	{Key: "as", Value: "masterls"},
		// }}},

		// // Step 8: Unwind masterls and handle null values
		// {{Key: "$unwind", Value: bson.D{
		// 	{Key: "path", Value: "$masterls"},
		// 	{Key: "preserveNullAndEmptyArrays", Value: true},
		// }}},

		// // Step 9: Add Last Status as #N/A if null
		// {{Key: "$addFields", Value: bson.D{
		// 	{Key: "Last Status", Value: bson.D{
		// 		{Key: "$ifNull", Value: bson.A{"$masterls.Last Status", "#N/A"}},
		// 	}},
		// }}},

		// Step 10: Lookup from masteric_2
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastermt_10"},
			{Key: "let", Value: bson.M{"sttNo": "$STTNumbers"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$Manifest", "$$sttNo"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "Created At", Value: -1}}}},
				{{Key: "$project", Value: bson.D{
					{Key: "Created At", Value: 1},
					{Key: "Rute", Value: 1},
					{Key: "Manifest Custom Gross Weight", Value: 1},
				}}},
			}},
			{Key: "as", Value: "mastermt"},
		}}},

		// Step 11: Unwind masteric
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$mastermt"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 12: Project the final structure
		{{Key: "$project", Value: bson.D{
			// from datatft
			{Key: "KodeSubConsol", Value: 1},
			{Key: "Mitra Code Genesis", Value: 1},
			{Key: "Bill", Value: 1},
			{Key: "STTNumbers", Value: 1},
			{Key: "Kode", Value: 1},
			{Key: "STTDate", Value: 1},
			{Key: "Origin", Value: 1},
			{Key: "Destination", Value: 1},
			{Key: "Berat", Value: 1},
			{Key: "RatePerKg", Value: 1},
			{Key: "Trucking(TUC)Fee", Value: 1},
			{Key: "Keterangan", Value: 1},
			{Key: "CreatedBy", Value: 1},
			{Key: "Type", Value: 1},

			//add fields
			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
			{Key: "Created At (Master MTUC)", Value: "$mastermt.Created At"},
			{Key: "Rute (Master MTUC)", Value: "$mastermt.Rute"},
			{Key: "Manifest Custom Gross Weight (Master MTUC)", Value: "$mastermt.Manifest Custom Gross Weight"},
			// {Key: "Last Status (Master LS)", Value: "$masterls.Last Status"},
			// {Key: "STT Booked At (Master IC)", Value: "$masteric.STT Booked At"},
			// {Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
			// {Key: "Origin (Master IC)", Value: "$masteric.Origin"},
			// {Key: "Destination (Master IC)", Value: "$masteric.Destination"},
			// {Key: "Gross Weight (Master IC)", Value: "$masteric.Gross Weight"},
			// {Key: "First AWB Nubmer (Master IC)", Value: "$masteric.First AWB Nubmer"},
			// {Key: "Last AWB Number (Master IC)", Value: "$masteric.Last AWB Number"},
			// {Key: "Lag Route (Master IC)", Value: "$masteric.Lag Route"},
			// {Key: "Lag Mode (Master IC)", Value: "$masteric.Lag Mode"},
			// {Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
		}}},

		// Step 13: Merge the results into lookup_processtft
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processtft"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the first pipeline
	collection := db.GetCollection("datatft")
	_, err := collection.Aggregate(context.Background(), firstPipeline)
	if err != nil {
		log.Printf("First aggregation pipeline failed: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"First aggregation failed: %v\"}\n\n", err)
		flusher.Flush()
		return
	}

	// Notify about second pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing second aggregation pipeline for route lookup...\"}\n\n")
	flusher.Flush()
	log.Println("Executing Second Aggregation Pipeline for Routes.")

	// Define second pipeline for route lookup
	secondPipeline := mongo.Pipeline{
		// Match documents with Rute from MTUC
		{{Key: "$match", Value: bson.M{
			"Rute (Master MTUC)": bson.M{"$exists": true},
		}}},

		// Lookup from masterrt_8 using MTUC route
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterrt_8"},
			{Key: "let", Value: bson.M{"routeValue": "$Rute (Master MTUC)"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$Rute", "$$routeValue"}},
					}},
				}}},
				{{Key: "$project", Value: bson.D{
					{Key: "Truck Rate", Value: 1},
					{Key: "_id", Value: 0},
				}}},
			}},
			{Key: "as", Value: "routeInfo"},
		}}},

		// Unwind lookup results
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$routeInfo"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Add truck rate field
		{{Key: "$addFields", Value: bson.D{
			{Key: "Truck Rate (Master RT)", Value: "$routeInfo.Truck Rate"},
		}}},

		{{Key: "$project", Value: bson.D{
			{Key: "routeInfo", Value: 0}, // Menghapus field routeInfo
		}}},

		// Merge results
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processtft"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}
	// Execute second pipeline
	collection = db.GetCollection("lookup_processtft")
	_, err = collection.Aggregate(context.Background(), secondPipeline)
	if err != nil {
		log.Printf("Second aggregation pipeline failed: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Second aggregation failed: %v\"}\n\n", err)
		flusher.Flush()
		return
	}

	// Send completion event
	fmt.Fprintf(w, "event: complete\ndata: {\"message\": \"Lookup and Save process completed successfully!\"}\n\n")
	flusher.Flush()
	log.Println("LookupAndSave process completed successfully.")
}
