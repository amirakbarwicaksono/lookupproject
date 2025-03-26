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

// datasof
// Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
func LookupAndSavesof(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processsof collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processsof collection.")

	lookupProcessCollection := db.GetCollection("lookup_processsof")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processsof collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processsof collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processsof collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processsof collection successfully.\"}\n\n")
	flusher.Flush()

	// Notify about pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing aggregation pipeline...\"}\n\n")
	flusher.Flush()
	log.Println("Executing Aggregation Pipeline.")

	// Define the aggregation pipeline
	pipeline := mongo.Pipeline{
		// Step 1: Filter records with valid Kode and Mitra Code Genesis
		{{Key: "$match", Value: bson.M{
			"Kode":               bson.M{"$exists": true},
			"Mitra Code Genesis": bson.M{"$exists": true},
		}}},

		// Step 2: Lookup from mastertbs_4
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastertbs_42"},
			{Key: "let", Value: bson.M{"kodeDatakof": "$Kode"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$Kode", "$$kodeDatakof"}},
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
			{Key: "localField", Value: "Mitra Code Genesis"},
			{Key: "foreignField", Value: "Mitra Code Genesis"},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$project", Value: bson.D{
					{Key: "Mitra Code Genesis", Value: 1},
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

		// Step 6: Lookup from masterls_3
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterls_3"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
				{{Key: "$project", Value: bson.D{
					{Key: "Last Status", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masterls"},
		}}},

		// Step 7: Unwind masterls and handle null values
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterls"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 8: Add Last Status as #N/A if null
		{{Key: "$addFields", Value: bson.D{
			{Key: "Last Status", Value: bson.D{
				{Key: "$ifNull", Value: bson.A{"$masterls.Last Status", "#N/A"}},
			}},
		}}},

		// Step 9: Lookup from masteric_2
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masteric_2"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
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
					{Key: " PublishRateFeeFixed ", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masteric"},
		}}},

		// Step 10: Unwind masteric
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masteric"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 11: Lookup from masterbc_5
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterbc_5"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
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

		// Step 12: Unwind masterbc
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterbc"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 13: Project the final structure
		{{Key: "$project", Value: bson.D{
			// Fields from datasof
			{Key: "STT No", Value: 1},
			{Key: "Kode", Value: 1},
			{Key: "Bill", Value: 1},
			{Key: "Stt Booked Date", Value: 1},
			{Key: "Stt Pod Date", Value: 1},
			{Key: "Lag Route", Value: 1},
			{Key: "Origin", Value: 1},
			{Key: "Destination", Value: 1},
			{Key: "Product", Value: 1},
			{Key: "Client Name", Value: 1},
			{Key: "Chargeable Weight", Value: 1},
			{Key: "Publish Rate Cost", Value: 1},
			{Key: "Mitra Code Genesis", Value: 1},
			{Key: " Outbound Fee ", Value: 1},
			{Key: "Ket", Value: 1},
			{Key: "Mitra Type", Value: 1},
			{Key: "Pic", Value: 1},

			// Lookup fields
			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
			{Key: "Last Status (Master Last Status) ", Value: "$Last Status"},
			{Key: "STT Booked At (Master IC)", Value: "$masteric.STT Booked At"},
			{Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
			{Key: "Origin (Master IC)", Value: "$masteric.Origin"},
			{Key: "Destination (Master IC)", Value: "$masteric.Destination"},
			{Key: "Product (Master IC)", Value: "$masteric.Product"},
			{Key: "Chargeable Weight (Master IC)", Value: "$masteric.Chargeable Weight"},
			{Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
			{Key: "PublishRateFeeFixed (Master IC)", Value: "$masteric. PublishRateFeeFixed "},
			{Key: "Stt Chargeable Weight (Master BC)", Value: "$masterbc.Stt Chargeable Weight"}, // From masterbc_5
			{Key: "Invoice/Number (Master BC)", Value: "$masterbc.Invoice/Number"},               // From masterbc_5
		}}},

		// Step 14: Merge the results into lookup_process
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processsof"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the pipeline
	collection := db.GetCollection("datasof")
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

// datasif
// Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
func LookupAndSavesif(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processsif collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processsif collection.")

	lookupProcessCollection := db.GetCollection("lookup_processsif")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processsif collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processsif collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processsif collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processsif collection successfully.\"}\n\n")
	flusher.Flush()

	// Notify about pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing aggregation pipeline...\"}\n\n")
	flusher.Flush()
	log.Println("Executing Aggregation Pipeline.")

	// Define the aggregation pipeline
	pipeline := mongo.Pipeline{
		// Step 1: Filter records with valid Kode and Mitra Code Genesis
		{{Key: "$match", Value: bson.M{
			"Kode":               bson.M{"$exists": true},
			"Mitra Code Genesis": bson.M{"$exists": true},
		}}},

		// Step 2: Lookup from mastertbs_4
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastertbs_43"},
			{Key: "let", Value: bson.M{"kodeDatakof": "$Kode"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$Kode", "$$kodeDatakof"}},
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
			{Key: "localField", Value: "Mitra Code Genesis"},
			{Key: "foreignField", Value: "Mitra Code Genesis"},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$project", Value: bson.D{
					{Key: "Mitra Code Genesis", Value: 1},
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

		// Step 6: Lookup from masterls_3
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterls_3"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
				{{Key: "$project", Value: bson.D{
					{Key: "Last Status", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masterls"},
		}}},

		// Step 7: Unwind masterls and handle null values
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterls"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 8: Add Last Status as #N/A if null
		{{Key: "$addFields", Value: bson.D{
			{Key: "Last Status", Value: bson.D{
				{Key: "$ifNull", Value: bson.A{"$masterls.Last Status", "#N/A"}},
			}},
		}}},

		// Step 9: Lookup from masteric_2
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masteric_2"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
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
					{Key: " PublishRateFeeFixed ", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masteric"},
		}}},

		// Step 10: Unwind masteric
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masteric"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 11: Lookup from masterbc_5
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterbc_5"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
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

		// Step 12: Unwind masterbc
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterbc"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 13: Project the final structure
		{{Key: "$project", Value: bson.D{
			// Fields from datasif
			{Key: "STT No", Value: 1},
			{Key: "Kode", Value: 1},
			{Key: "Bill", Value: 1},
			{Key: "Stt Booked Date", Value: 1},
			{Key: "Stt Pod Date", Value: 1},
			{Key: "Lag Route", Value: 1},
			{Key: "Origin", Value: 1},
			{Key: "Destination", Value: 1},
			{Key: "Product", Value: 1},
			{Key: "Client Name", Value: 1},
			{Key: "Chargeable Weight", Value: 1},
			{Key: "Publish Rate Cost", Value: 1},
			{Key: "Mitra Code Genesis", Value: 1},
			{Key: " Inbound Fee ", Value: 1},
			{Key: "Ket", Value: 1},
			{Key: "Mitra Type", Value: 1},
			{Key: "Pic", Value: 1},

			// Lookup fields
			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
			{Key: "Last Status (Master Last Status) ", Value: "$Last Status"},
			{Key: "STT Booked At (Master IC)", Value: "$masteric.STT Booked At"},
			{Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
			{Key: "Origin (Master IC)", Value: "$masteric.Origin"},
			{Key: "Destination (Master IC)", Value: "$masteric.Destination"},
			{Key: "Product (Master IC)", Value: "$masteric.Product"},
			{Key: "Chargeable Weight (Master IC)", Value: "$masteric.Chargeable Weight"},
			{Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
			{Key: "PublishRateFeeFixed (Master IC)", Value: "$masteric. PublishRateFeeFixed "},
			{Key: "Stt Chargeable Weight (Master BC)", Value: "$masterbc.Stt Chargeable Weight"}, // From masterbc_5
			{Key: "Invoice/Number (Master BC)", Value: "$masterbc.Invoice/Number"},               // From masterbc_5
		}}},

		// Step 14: Merge the results into lookup_process
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processsif"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the pipeline
	collection := db.GetCollection("datasif")
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

// datapof
// Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
func LookupAndSavepof(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processpof collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processpof collection.")

	lookupProcessCollection := db.GetCollection("lookup_processpof")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processpof collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processpof collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processpof collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processpof collection successfully.\"}\n\n")
	flusher.Flush()

	// Notify about pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing aggregation pipeline...\"}\n\n")
	flusher.Flush()
	log.Println("Executing Aggregation Pipeline.")

	// Define the aggregation pipeline
	pipeline := mongo.Pipeline{
		// Step 1: Filter records with valid Kode and Mitra Code Genesis
		{{Key: "$match", Value: bson.M{
			"Kode":               bson.M{"$exists": true},
			"Mitra Code Genesis": bson.M{"$exists": true},
		}}},

		// Step 2: Lookup from mastertbs_4
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastertbs_44"},
			{Key: "let", Value: bson.M{"kodeDatakof": "$Kode"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$Kode", "$$kodeDatakof"}},
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
			{Key: "localField", Value: "Mitra Code Genesis"},
			{Key: "foreignField", Value: "Mitra Code Genesis"},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$project", Value: bson.D{
					{Key: "Mitra Code Genesis", Value: 1},
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

		// Step 6: Lookup from masterls_3
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterls_3"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
					}},
				}}},
				{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
				{{Key: "$project", Value: bson.D{
					{Key: "Last Status", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masterls"},
		}}},

		// Step 7: Unwind masterls and handle null values
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterls"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 8: Add Last Status as #N/A if null
		{{Key: "$addFields", Value: bson.D{
			{Key: "Last Status", Value: bson.D{
				{Key: "$ifNull", Value: bson.A{"$masterls.Last Status", "#N/A"}},
			}},
		}}},

		// Step 9: Lookup from masteric_2
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masteric_2"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
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
					{Key: " PublishRateFeeFixed ", Value: 1},
				}}},
			}},
			{Key: "as", Value: "masteric"},
		}}},

		// Step 10: Unwind masteric
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masteric"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 11: Lookup from masterbc_5
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterbc_5"},
			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
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

		// Step 12: Unwind masterbc
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$masterbc"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},

		// Step 13: Project the final structure
		{{Key: "$project", Value: bson.D{
			// Fields from datapof
			{Key: "STT No", Value: 1},
			{Key: "Kode", Value: 1},
			{Key: "Bill", Value: 1},
			{Key: "Stt Booked Date", Value: 1},
			{Key: "Stt Pod Date", Value: 1},
			{Key: "Lag Route", Value: 1},
			{Key: "Origin", Value: 1},
			{Key: "Destination", Value: 1},
			{Key: "Product", Value: 1},
			{Key: "Client Name", Value: 1},
			{Key: "Chargeable Weight", Value: 1},
			{Key: " Publish Rate Cost ", Value: 1},
			{Key: "Mitra Code Genesis", Value: 1},
			{Key: "Pickup Fee", Value: 1},
			{Key: "Ket", Value: 1},
			{Key: "Mitra Type", Value: 1},
			{Key: "Pic", Value: 1},

			// Lookup fields
			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
			{Key: "Last Status (Master Last Status) ", Value: "$Last Status"},
			{Key: "STT Booked At (Master IC)", Value: "$masteric.STT Booked At"},
			{Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
			{Key: "Origin (Master IC)", Value: "$masteric.Origin"},
			{Key: "Destination (Master IC)", Value: "$masteric.Destination"},
			{Key: "Product (Master IC)", Value: "$masteric.Product"},
			{Key: "Chargeable Weight (Master IC)", Value: "$masteric.Chargeable Weight"},
			{Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
			{Key: "PublishRateFeeFixed (Master IC)", Value: "$masteric. PublishRateFeeFixed "},
			{Key: "Stt Chargeable Weight (Master BC)", Value: "$masterbc.Stt Chargeable Weight"}, // From masterbc_5
			{Key: "Invoice/Number (Master BC)", Value: "$masterbc.Invoice/Number"},               // From masterbc_5
		}}},

		// Step 14: Merge the results into lookup_process
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processpof"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the pipeline
	collection := db.GetCollection("datapof")
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
