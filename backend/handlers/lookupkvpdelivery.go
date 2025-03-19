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

// datakdf
// Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
func LookupAndSavekdf(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processkdf collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processkdf collection.")

	lookupProcessCollection := db.GetCollection("lookup_processkdf")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processkdf collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processkdf collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processkdf collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processkdf collection successfully.\"}\n\n")
	flusher.Flush()

	// Notify about pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing aggregation pipeline...\"}\n\n")
	flusher.Flush()
	log.Println("Executing Aggregation Pipeline.")

	// Define the aggregation pipeline
	pipeline := mongo.Pipeline{
		// Step 1: Filter records with valid Kode and Mitra Code Genesis
		{{Key: "$match", Value: bson.M{
			"transaction_note": bson.M{"$exists": true},
			"courier_id":       bson.M{"$exists": true},
		}}},

		// Step 2: Add a field for converted date with error handling
		{{Key: "$addFields", Value: bson.D{
			{Key: "convertedDate", Value: bson.D{{Key: "$ifNull", Value: bson.A{
				bson.D{{Key: "$dateFromString", Value: bson.M{
					"dateString": "$created_at",
					"format":     "%d-%b-%Y",
					"onError":    nil, // Set to null if conversion fails
					"onNull":     nil, // Handle cases where the date field is null
				}}},
				"-", // Default value if parsing fails or date is null
			}}}},
		}}},

		// Step 2: Lookup from mastertbs_4
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastertbs_51"},
			{Key: "let", Value: bson.M{"kodeDatakdf": "$transaction_note"}}, // Asumsi "Kode" berasal dari dokumen utama
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$KodeKdf", "$$kodeDatakdf"}}, // Ganti "$Kode" dengan "$KodeFro"
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "Bill", Value: -1}}}},
				{{Key: "$limit", Value: 1}},
			}},
			{Key: "as", Value: "mastertbs"},
		}}},
		// Step 3: Unwind mastertbs
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$mastertbs"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 4: Lookup from mastermn_1
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastermn_1"},
			{Key: "localField", Value: "courier_id"},
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

		// Step 5: Unwind mastermn
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$mastermn"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 6: Lookup from masteric_2
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masteric_2"},
			{Key: "let", Value: bson.M{"sttNo": "$transaction_note"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
				{{Key: "$project", Value: bson.D{
					{Key: "STT Booked At", Value: 1},
					{Key: "Client Name", Value: 1},
					{Key: "Origin", Value: 1},
					{Key: "Destination", Value: 1},
					{Key: "Product", Value: 1},
					{Key: "Chargeable Weight", Value: 1},
					{Key: "Client Category", Value: 1},
					{Key: "COD Amount", Value: 1},
					{Key: " PublishRateFeeFixed ", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masteric"},
		}}},

		// Step 7: Unwind masteric
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masteric"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 8: Lookup from masterbc_5
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterbc_5"},
			{Key: "let", Value: bson.M{"sttNo": "$transaction_note"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$Stt ID", "$$sttNo"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "Invoice/Number", Value: -1}}}},
				{{Key: "$project", Value: bson.D{
					{Key: "Stt Chargeable Weight", Value: 1},
					{Key: "Invoice/Number", Value: 1},
				}}},
				{{Key: "$limit", Value: 1}},
			}},
			{Key: "as", Value: "masterbc"},
		}}},

		// Step 9: Unwind masterbc
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterbc"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 10: Project the final structure
		{{Key: "$project", Value: bson.D{
			// Fields from datakdf
			{Key: "balance_history_id", Value: 1},
			{Key: "courier_id", Value: 1},
			{Key: "balance_type", Value: 1},
			{Key: "balance_amount", Value: 1},
			{Key: "current_balance_amount", Value: 1},
			{Key: "transaction_type", Value: 1},
			{Key: "transaction_note", Value: 1},
			{Key: "bank_id", Value: 1},
			{Key: "bank_account_owner", Value: 1},
			{Key: "bank_account_number", Value: 1},
			{Key: "created_at", Value: 1},
			{Key: "T", Value: 1},
			{Key: "Type", Value: 1},

			// Lookup fields
			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
			{Key: "STT Booked At (Master IC)", Value: "$masteric.STT Booked At"},
			{Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
			{Key: "Origin (Master IC)", Value: "$masteric.Origin"},
			{Key: "Destination (Master IC)", Value: "$masteric.Destination"},
			{Key: "Product (Master IC)", Value: "$masteric.Product"},
			{Key: "Chargeable Weight (Master IC)", Value: "$masteric.Chargeable Weight"},
			{Key: "COD Amount (Master IC)", Value: "$masteric.COD Amount"},
			{Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
			{Key: "Stt Chargeable Weight (Master BC)", Value: "$masterbc.Stt Chargeable Weight"}, // From masterbc_5
			{Key: "Invoice/Number (Master BC)", Value: "$masterbc.Invoice/Number"},               // From masterbc_5
		}}},

		// Step 11: Merge the results into lookup_process
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processkdf"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the pipeline
	collection := db.GetCollection("datakdf")
	_, err := collection.Aggregate(context.Background(), pipeline)
	if err != nil {
		log.Printf("Aggregation pipeline failed: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Aggregation failed: %v\"}\n\n", err)
		flusher.Flush()
		return
	}

	// Send completion event
	fmt.Fprintf(w, "event: complete\ndata: {\"message\": \"Lookup and Save process completed successfully!\"}\n\n")
	flusher.Flush()
	log.Println("LookupAndSave process completed successfully.")
}
