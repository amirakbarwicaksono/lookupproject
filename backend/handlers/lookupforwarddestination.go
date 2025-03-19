// package handlers

// import (
// 	"Framework/db"
// 	"context"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/mongo"
// )

// // datafro
// // Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
// func LookupAndSavefrd(w http.ResponseWriter, r *http.Request) {
// 	// Check if the writer supports flushing for SSE
// 	flusher, ok := w.(http.Flusher)
// 	if !ok {
// 		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
// 		return
// 	}

// 	// Set SSE headers
// 	w.Header().Set("Content-Type", "text/event-stream")
// 	w.Header().Set("Cache-Control", "no-cache")
// 	w.Header().Set("Connection", "keep-alive")

// 	// Notify the client about clearing the collection
// 	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processfrd collection...\"}\n\n")
// 	flusher.Flush()
// 	log.Println("Clearing data in lookup_processfrd collection.")

// 	lookupProcessCollection := db.GetCollection("lookup_processfrd")
// 	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
// 		log.Printf("Failed to clear data in lookup_processfrd collection: %v", err)
// 		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processfrd collection\"}\n\n")
// 		flusher.Flush()
// 		return
// 	}

// 	log.Println("Cleared data in lookup_processfrd collection successfully.")
// 	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processfrd collection successfully.\"}\n\n")
// 	flusher.Flush()

// 	// Notify about pipeline execution
// 	fmt.Fprintf(w, "data: {\"message\": \"Executing aggregation pipeline...\"}\n\n")
// 	flusher.Flush()
// 	log.Println("Executing Aggregation Pipeline.")

// 	// Define the aggregation pipeline
// 	// Define the aggregation pipeline
// 	pipeline := mongo.Pipeline{
// 		// Step 1: Filter records with valid Kode and Mitra Code Genesis
// 		{{Key: "$match", Value: bson.M{
// 			"Kode":               bson.M{"$exists": true},
// 			"Mitra Code Genesis": bson.M{"$exists": true},
// 		}}},

// 		// Step 2: Add a field for converted date with error handling
// 		{{Key: "$addFields", Value: bson.D{
// 			{Key: "convertedDateFrd", Value: bson.D{{Key: "$ifNull", Value: bson.A{
// 				bson.D{{Key: "$dateFromString", Value: bson.M{
// 					"dateString": bson.D{{Key: "$concat", Value: bson.A{
// 						bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 0, 7}}},
// 						"20",
// 						bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 7, 2}}},
// 					}}},
// 					"format":  "%d-%b-%Y",
// 					"onError": nil, // Default value if conversion fails
// 					"onNull":  nil, // Handle cases where the date field is null
// 				}}},
// 				nil, // Default value if parsing fails or date is null
// 			}}}},
// 		}}},

// 		// Step 2: Lookup from mastertbs_4
// 		{{Key: "$lookup", Value: bson.D{
// 			{Key: "from", Value: "mastertbs_46"},
// 			{Key: "let", Value: bson.M{"kodeDatakof": "$Kode"}}, // Asumsi "Kode" berasal dari dokumen utama
// 			{Key: "pipeline", Value: mongo.Pipeline{
// 				{{Key: "$match", Value: bson.D{
// 					{Key: "$expr", Value: bson.D{
// 						{Key: "$eq", Value: bson.A{"$KodeFrd", "$$kodeDatakof"}}, // Ganti "$Kode" dengan "$KodeFro"
// 					}},
// 				}}},
// 				{{Key: "$sort", Value: bson.D{{Key: "Bill", Value: -1}}}},
// 				{{Key: "$limit", Value: 1}},
// 			}},
// 			{Key: "as", Value: "mastertbs"},
// 		}}},
// 		// Step 3: Unwind mastertbs
// 		{{Key: "$unwind", Value: bson.D{
// 			{Key: "path", Value: "$mastertbs"},
// 			{Key: "preserveNullAndEmptyArrays", Value: true},
// 		}}},

// 		// Step 4: Lookup from mastermn_1
// 		{{Key: "$lookup", Value: bson.D{
// 			{Key: "from", Value: "mastermn_1"},
// 			{Key: "localField", Value: "Mitra Code Genesis"},
// 			{Key: "foreignField", Value: "Mitra Code Genesis"},
// 			{Key: "pipeline", Value: mongo.Pipeline{
// 				{{Key: "$project", Value: bson.D{
// 					{Key: "Mitra Code Genesis", Value: 1},
// 					{Key: "Nama Mitra", Value: 1},
// 					{Key: "3LC", Value: 1},
// 				}}},
// 			}},
// 			{Key: "as", Value: "mastermn"},
// 		}}},

// 		// Step 5: Unwind mastermn
// 		{{Key: "$unwind", Value: bson.D{
// 			{Key: "path", Value: "$mastermn"},
// 			{Key: "preserveNullAndEmptyArrays", Value: true},
// 		}}},

// 		// Step 6: Lookup from masterls_3
// 		{{Key: "$lookup", Value: bson.D{
// 			{Key: "from", Value: "masterls_3"},
// 			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
// 			{Key: "pipeline", Value: mongo.Pipeline{
// 				{{Key: "$match", Value: bson.D{
// 					{Key: "$expr", Value: bson.D{
// 						{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
// 					}},
// 				}}},
// 				{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
// 				{{Key: "$project", Value: bson.D{
// 					{Key: "Last Status", Value: 1},
// 					{Key: "STT Updated Actor Name", Value: 1},
// 				}}},
// 			}},
// 			{Key: "as", Value: "masterls"},
// 		}}},

// 		// Step 7: Unwind masterls and handle null values
// 		{{Key: "$unwind", Value: bson.D{
// 			{Key: "path", Value: "$masterls"},
// 			{Key: "preserveNullAndEmptyArrays", Value: true},
// 		}}},

// 		// Step 8: Add Last Status as #N/A if null
// 		{{Key: "$addFields", Value: bson.D{
// 			{Key: "Last Status", Value: bson.D{
// 				{Key: "$ifNull", Value: bson.A{"$masterls.Last Status", "#N/A"}},
// 			}},
// 		}}},

// 		// Step 9: Lookup from masteric_2
// 		{{Key: "$lookup", Value: bson.D{
// 			{Key: "from", Value: "masteric_2"},
// 			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
// 			{Key: "pipeline", Value: mongo.Pipeline{
// 				{{Key: "$match", Value: bson.D{
// 					{Key: "$expr", Value: bson.D{
// 						{Key: "$eq", Value: bson.A{"$STT No", "$$sttNo"}},
// 					}},
// 				}}},
// 				{{Key: "$sort", Value: bson.D{{Key: "STT Booked At", Value: -1}}}},
// 				{{Key: "$project", Value: bson.D{
// 					{Key: "STT Booked At", Value: 1},
// 					{Key: "Client Name", Value: 1},
// 					{Key: "Origin", Value: 1},
// 					{Key: "Forward Area Origin", Value: 1},
// 					{Key: "Destination", Value: 1},
// 					{Key: "Forward Area Destination", Value: 1},
// 					{Key: "Product", Value: 1},
// 					{Key: "Chargeable Weight", Value: 1},
// 					{Key: "Forward Rate Origin", Value: 1},
// 					{Key: "Forward Rate Destination", Value: 1},
// 					{Key: "Client Category", Value: 1},
// 					{Key: " PublishRateFeeFixed ", Value: 1},
// 				}}},
// 			}},
// 			{Key: "as", Value: "masteric"},
// 		}}},

// 		// Step 10: Unwind masteric
// 		{{Key: "$unwind", Value: bson.D{
// 			{Key: "path", Value: "$masteric"},
// 			{Key: "preserveNullAndEmptyArrays", Value: true},
// 		}}},

// 		// Step 11: Lookup from masterbc_5
// 		{{Key: "$lookup", Value: bson.D{
// 			{Key: "from", Value: "masterbc_5"},
// 			{Key: "let", Value: bson.M{"sttNo": "$STT No"}},
// 			{Key: "pipeline", Value: mongo.Pipeline{
// 				{{Key: "$match", Value: bson.D{
// 					{Key: "$expr", Value: bson.D{
// 						{Key: "$eq", Value: bson.A{"$Stt ID", "$$sttNo"}},
// 					}},
// 				}}},
// 				{{Key: "$sort", Value: bson.D{{Key: "Invoice/Number", Value: -1}}}},
// 				{{Key: "$project", Value: bson.D{
// 					{Key: "Stt Chargeable Weight", Value: 1},
// 					{Key: "Invoice/Number", Value: 1},
// 				}}},
// 				{{Key: "$limit", Value: 1}},
// 			}},
// 			{Key: "as", Value: "masterbc"},
// 		}}},

// 		// Step 12: Unwind masterbc
// 		{{Key: "$unwind", Value: bson.D{
// 			{Key: "path", Value: "$masterbc"},
// 			{Key: "preserveNullAndEmptyArrays", Value: true},
// 		}}},

// 		// Step 13: Project the final structure
// 		{{Key: "$project", Value: bson.D{
// 			// Fields from datafro
// 			{Key: "STT No", Value: 1},
// 			{Key: "Kode", Value: 1},
// 			{Key: "Bill", Value: 1},
// 			{Key: "Stt Booked Date", Value: 1},
// 			{Key: "convertedDateFrd", Value: 1}, // Tambahkan untuk convertdate
// 			{Key: "Stt Pod Date", Value: 1},
// 			{Key: "Lag Route", Value: 1},
// 			{Key: "Origin", Value: 1},
// 			{Key: "Destination", Value: 1},
// 			{Key: "Product", Value: 1},
// 			{Key: "Client Name", Value: 1},
// 			{Key: "Chargeable Weight", Value: 1},
// 			{Key: " Publish Rate Cost ", Value: 1},
// 			{Key: "Mitra Code Genesis", Value: 1},
// 			{Key: "Forward Rate Destination", Value: 1},
// 			{Key: "Ket", Value: 1},
// 			{Key: "Pic", Value: 1},

// 			// Lookup fields
// 			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
// 			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
// 			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
// 			{Key: "Last Status (Master Last Status) ", Value: "$Last Status"},
// 			{Key: "STT Updated Actor Name (Master Last Status)", Value: "$masterls.STT Updated Actor Name"},
// 			{Key: "STT Booked At (Master IC)", Value: "$masteric.STT Booked At"},
// 			{Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
// 			{Key: "Origin (Master IC)", Value: "$masteric.Origin"},
// 			{Key: "Forward Area Origin (Master IC)", Value: "$masteric.Forward Area Origin"},
// 			{Key: "Destination (Master IC)", Value: "$masteric.Destination"},
// 			{Key: "Forward Area Destination (Master IC)", Value: "$masteric.Forward Area Destination"},
// 			{Key: "Product (Master IC)", Value: "$masteric.Product"},
// 			{Key: "Chargeable Weight (Master IC)", Value: "$masteric.Chargeable Weight"},
// 			{Key: "Forward Rate Origin (Master IC)", Value: "$masteric.Forward Rate Origin"},
// 			{Key: "Forward Rate Destination (Master IC)", Value: "$masteric.Forward Rate Destination"},
// 			{Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
// 			{Key: "PublishRateFeeFixed (Master IC)", Value: "$masteric. PublishRateFeeFixed "},
// 			{Key: "Stt Chargeable Weight (Master BC)", Value: "$masterbc.Stt Chargeable Weight"}, // From masterbc_5
// 			{Key: "Invoice/Number (Master BC)", Value: "$masterbc.Invoice/Number"},               // From masterbc_5
// 		}}},

// 		// Step 14: Merge the results into lookup_process
// 		{{Key: "$merge", Value: bson.D{
// 			{Key: "into", Value: "lookup_processfrd"},
// 			{Key: "whenMatched", Value: "merge"},
// 			{Key: "whenNotMatched", Value: "insert"},
// 		}}},
// 	}

// 	// Execute the pipeline
// 	collection := db.GetCollection("datafrd")
// 	_, err := collection.Aggregate(context.Background(), pipeline)
// 	if err != nil {
// 		log.Printf("Aggregation pipeline failed: %v", err)
// 		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Aggregation failed: %v\"}\n\n", err)
// 		flusher.Flush()
// 		return
// 	}

// 	// Send completion event
// 	fmt.Fprintf(w, "event: complete\ndata: {\"message\": \"Lookup and Save process completed successfully!\"}\n\n")
// 	flusher.Flush()
// 	log.Println("LookupAndSave process completed successfully.")
// }

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

// LookupAndSavefrd handles the lookup and save process for FRD data
func LookupAndSavefrd(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processfrd collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processfrd collection.")

	lookupProcessCollection := db.GetCollection("lookup_processfrd")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processfrd collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processfrd collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processfrd collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processfrd collection successfully.\"}\n\n")
	flusher.Flush()

	// Notify about pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing first aggregation pipeline...\"}\n\n")
	flusher.Flush()
	log.Println("Executing First Aggregation Pipeline.")

	// Define the first aggregation pipeline
	firstPipeline := mongo.Pipeline{
		// Step 1: Filter records with valid Kode and Mitra Code Genesis
		{{Key: "$match", Value: bson.M{
			"Kode":               bson.M{"$exists": true},
			"Mitra Code Genesis": bson.M{"$exists": true},
		}}},

		// // Step 2: Add a field for converted date with error handling (Treatment Date)
		// {{Key: "$addFields", Value: bson.D{
		// 	{Key: "convertedDateFrd", Value: bson.D{{Key: "$ifNull", Value: bson.A{
		// 		bson.D{{Key: "$dateFromString", Value: bson.M{
		// 			"dateString": bson.D{{Key: "$concat", Value: bson.A{
		// 				bson.D{{Key: "$cond", Value: bson.A{
		// 					bson.D{{Key: "$eq", Value: bson.A{
		// 						bson.D{{Key: "$strLenCP", Value: bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 0, 2}}}}},
		// 						1,
		// 					}}},
		// 					bson.D{{Key: "$concat", Value: bson.A{"0", bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 0, 1}}}}}},
		// 					bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 0, 2}}},
		// 				}}},
		// 				"-",
		// 				bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 3, 3}}},
		// 				"-",
		// 				"20",
		// 				bson.D{{Key: "$substr", Value: bson.A{"$Stt Booked Date", 7, 2}}},
		// 			}}},
		// 			"format":  "%d-%b-%Y",
		// 			"onError": "-",
		// 			"onNull":  "-",
		// 		}}},
		// 		"-",
		// 	}}}},
		// }}},

		// Step 2: Add a field for converted date with error handling
		{{Key: "$addFields", Value: bson.D{
			{Key: "convertedDateFrd", Value: bson.D{{Key: "$ifNull", Value: bson.A{
				bson.D{{Key: "$cond", Value: bson.M{
					"if": bson.D{{Key: "$and", Value: bson.A{
						bson.D{{Key: "$ne", Value: bson.A{"$Stt Booked Date", nil}}},
						bson.D{{Key: "$ne", Value: bson.A{"$Stt Booked Date", ""}}},
					}}},
					"then": bson.D{{Key: "$dateFromString", Value: bson.M{
						"dateString": bson.D{{Key: "$let", Value: bson.M{
							"vars": bson.M{
								"dateParts": bson.D{{Key: "$split", Value: bson.A{"$Stt Booked Date", "-"}}},
							},
							"in": bson.D{{Key: "$cond", Value: bson.M{
								"if": bson.D{{Key: "$and", Value: bson.A{
									bson.D{{Key: "$isArray", Value: "$$dateParts"}},
									bson.D{{Key: "$gt", Value: bson.A{bson.D{{Key: "$size", Value: "$$dateParts"}}, 2}}},
								}}},
								"then": bson.D{{Key: "$concat", Value: bson.A{
									bson.D{{Key: "$cond", Value: bson.A{
										bson.D{{Key: "$lt", Value: bson.A{
											bson.D{{Key: "$strLenCP", Value: bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}}}},
											2,
										}}},
										bson.D{{Key: "$concat", Value: bson.A{
											"0",
											bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
										}}},
										bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
									}}},
									"-",
									bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 1}}},
									"-20",
									bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 2}}},
								}}},
								"else": "ERR_INVALID_DATE_FORMAT", // Error code for invalid date format
							}}},
						}}},
						"format":  "%d-%b-%Y",
						"onError": "ERR_DATE_CONVERSION_FAILED", // Error code for date conversion failure
						"onNull":  "ERR_NULL_DATE_VALUE",        // Error code for null date value
					}}},
					"else": "ERR_MISSING_STT_BOOKED_AT", // Error code for missing STT Booked At field
				}}},
				"ERR_GENERAL_FAILURE", // General failure fallback
			}}}},
		}}},

		// Step 3: Lookup from mastertbs_4
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "mastertbs_46"},
			{Key: "let", Value: bson.M{"kodeDatakof": "$Kode"}},
			{Key: "pipeline", Value: mongo.Pipeline{
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$eq", Value: bson.A{"$KodeFrd", "$$kodeDatakof"}},
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
					{Key: "STT Updated Actor Name", Value: 1},
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
					{Key: "Forward Area Origin", Value: 1},
					{Key: "Destination", Value: 1},
					{Key: "Forward Area Destination", Value: 1},
					{Key: "Product", Value: 1},
					{Key: "Chargeable Weight", Value: 1},
					{Key: "Forward Rate Origin", Value: 1},
					{Key: "Forward Rate Destination", Value: 1},
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

		// // Step 12: Add field for ISODate conversion (Treatment Date)
		// {{Key: "$addFields", Value: bson.D{
		// 	{Key: "convertedDate", Value: bson.D{{Key: "$ifNull", Value: bson.A{
		// 		bson.D{{Key: "$dateFromString", Value: bson.M{
		// 			"dateString": bson.D{{Key: "$concat", Value: bson.A{
		// 				bson.D{{Key: "$cond", Value: bson.A{
		// 					bson.D{{Key: "$eq", Value: bson.A{
		// 						bson.D{{Key: "$strLenCP", Value: bson.D{{Key: "$substr", Value: bson.A{"$masteric.STT Booked At", 0, 2}}}}},
		// 						1,
		// 					}}},
		// 					bson.D{{Key: "$concat", Value: bson.A{"0", bson.D{{Key: "$substr", Value: bson.A{"$masteric.STT Booked At", 0, 1}}}}}},
		// 					bson.D{{Key: "$substr", Value: bson.A{"$masteric.STT Booked At", 0, 2}}},
		// 				}}},
		// 				"-",
		// 				bson.D{{Key: "$substr", Value: bson.A{"$masteric.STT Booked At", 3, 3}}},
		// 				"-",
		// 				"20",
		// 				bson.D{{Key: "$substr", Value: bson.A{"$masteric.STT Booked At", 7, 2}}},
		// 			}}},
		// 			"format":  "%d-%b-%Y",
		// 			"onError": "-",
		// 			"onNull":  "-",
		// 		}}},
		// 		"-",
		// 	}}}},
		// }}},

		// // Step 12: Add field for ISODate conversion
		// {{Key: "$addFields", Value: bson.D{
		// 	{Key: "convertedDate", Value: bson.D{{Key: "$ifNull", Value: bson.A{
		// 		bson.D{{Key: "$dateFromString", Value: bson.M{
		// 			"dateString": bson.D{{Key: "$let", Value: bson.M{
		// 				"vars": bson.M{
		// 					"dateParts": bson.D{{Key: "$split", Value: bson.A{"$masteric.STT Booked At", "-"}}},
		// 				},
		// 				"in": bson.D{{Key: "$concat", Value: bson.A{
		// 					bson.D{{Key: "$cond", Value: bson.A{
		// 						bson.D{{Key: "$lt", Value: bson.A{
		// 							bson.D{{Key: "$strLenCP", Value: bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}}}},
		// 							2,
		// 						}}},
		// 						bson.D{{Key: "$concat", Value: bson.A{
		// 							"0",
		// 							bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
		// 						}}},
		// 						bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
		// 					}}},
		// 					"-",
		// 					bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 1}}},
		// 					"-20",
		// 					bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 2}}},
		// 				}}},
		// 			}}},
		// 			"format":  "%d-%b-%Y",
		// 			"onError": "-",
		// 			"onNull":  "-",
		// 		}}},
		// 		"-",
		// 	}}}},
		// }}},

		// // Step 12: Add field for ISODate conversion
		// {{Key: "$addFields", Value: bson.D{
		// 	{Key: "convertedDate", Value: bson.D{{Key: "$ifNull", Value: bson.A{
		// 		bson.D{{Key: "$dateFromString", Value: bson.M{
		// 			"dateString": bson.D{{Key: "$cond", Value: bson.M{
		// 				"if": bson.D{{Key: "$ne", Value: bson.A{"$masteric.STT Booked At", nil}}},
		// 				"then": bson.D{{Key: "$let", Value: bson.M{
		// 					"vars": bson.M{
		// 						"dateParts": bson.D{{Key: "$split", Value: bson.A{"$masteric.STT Booked At", "-"}}},
		// 					},
		// 					"in": bson.D{{Key: "$concat", Value: bson.A{
		// 						bson.D{{Key: "$cond", Value: bson.A{
		// 							bson.D{{Key: "$lt", Value: bson.A{
		// 								bson.D{{Key: "$strLenCP", Value: bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}}}},
		// 								2,
		// 							}}},
		// 							bson.D{{Key: "$concat", Value: bson.A{
		// 								"0",
		// 								bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
		// 							}}},
		// 							bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
		// 						}}},
		// 						"-",
		// 						bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 1}}},
		// 						"-20",
		// 						bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 2}}},
		// 					}}},
		// 				}}},
		// 				"else": "-",
		// 			}}},
		// 			"format":  "%d-%b-%Y",
		// 			"onError": "-",
		// 			"onNull":  "-",
		// 		}}},
		// 		"-",
		// 	}}}},
		// }}},

		// Step 12: Add field for ISODate conversion
		{{Key: "$addFields", Value: bson.D{
			{Key: "convertedDate", Value: bson.D{{Key: "$ifNull", Value: bson.A{
				bson.D{{Key: "$cond", Value: bson.M{
					"if": bson.D{{Key: "$and", Value: bson.A{
						bson.D{{Key: "$ne", Value: bson.A{"$masteric.STT Booked At", nil}}},
						bson.D{{Key: "$ne", Value: bson.A{"$masteric.STT Booked At", ""}}},
					}}},
					"then": bson.D{{Key: "$dateFromString", Value: bson.M{
						"dateString": bson.D{{Key: "$let", Value: bson.M{
							"vars": bson.M{
								"dateParts": bson.D{{Key: "$cond", Value: bson.M{
									"if":   bson.D{{Key: "$indexOfBytes", Value: bson.A{"$masteric.STT Booked At", "-"}}},
									"then": bson.D{{Key: "$split", Value: bson.A{"$masteric.STT Booked At", "-"}}},
									"else": bson.D{{Key: "$split", Value: bson.A{"$masteric.STT Booked At", "/"}}},
								}}},
							},
							"in": bson.D{{Key: "$cond", Value: bson.M{
								"if": bson.D{{Key: "$and", Value: bson.A{
									bson.D{{Key: "$isArray", Value: "$$dateParts"}},
									bson.D{{Key: "$gt", Value: bson.A{bson.D{{Key: "$size", Value: "$$dateParts"}}, 2}}},
								}}},
								"then": bson.D{{Key: "$concat", Value: bson.A{
									bson.D{{Key: "$cond", Value: bson.A{
										bson.D{{Key: "$lt", Value: bson.A{
											bson.D{{Key: "$strLenCP", Value: bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}}}},
											2,
										}}},
										bson.D{{Key: "$concat", Value: bson.A{
											"0",
											bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
										}}},
										bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 0}}},
									}}},
									"-",
									bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 1}}},
									"-20",
									bson.D{{Key: "$arrayElemAt", Value: bson.A{"$$dateParts", 2}}},
								}}},
								"else": "ERR_INVALID_DATE_FORMAT", // Error code for invalid date format
							}}},
						}}},
						"format":  "%d-%b-%Y",
						"onError": "ERR_DATE_CONVERSION_FAILED", // Error code for date conversion failure
						"onNull":  "ERR_NULL_DATE_VALUE",        // Error code for null date value
					}}},
					"else": "ERR_MISSING_STT_BOOKED_AT", // Error code for missing STT Booked At field
				}}},
				"ERR_GENERAL_FAILURE", // General failure fallback
			}}}},
		}}},

		// Step 13: Project the final structure
		{{Key: "$project", Value: bson.D{
			// Fields from datafrd
			{Key: "STT No", Value: 1},
			{Key: "Kode", Value: 1},
			{Key: "Bill", Value: 1},
			{Key: "Stt Booked Date", Value: 1},
			{Key: "convertedDateFrd", Value: 1},
			{Key: "Stt Pod Date", Value: 1},
			{Key: "Lag Route", Value: 1},
			{Key: "Origin", Value: 1},
			{Key: "Destination", Value: 1},
			{Key: "Product", Value: 1},
			{Key: "Client Name", Value: 1},
			{Key: "Chargeable Weight", Value: 1},
			{Key: " Publish Rate Cost ", Value: 1},
			{Key: "Mitra Code Genesis", Value: 1},
			{Key: "Forward Rate Destination", Value: 1},
			{Key: "Ket", Value: 1},
			{Key: "Pic", Value: 1},

			// Lookup fields
			{Key: "Cek Double STT Dg Bulan Sebelumnya", Value: "$mastertbs.Bill"},
			{Key: "Nama Mitra (Master Mitra Name)", Value: "$mastermn.Nama Mitra"},
			{Key: "3LC (Master Mitra Name)", Value: "$mastermn.3LC"},
			{Key: "Last Status (Master Last Status) ", Value: "$Last Status"},
			{Key: "STT Updated Actor Name (Master Last Status)", Value: "$masterls.STT Updated Actor Name"},
			{Key: "STT Booked At (Master IC )", Value: "$masteric.STT Booked At"},
			{Key: "STT Booked At (Master IC)", Value: "$convertedDate"},
			{Key: "Client Name (Master IC)", Value: "$masteric.Client Name"},
			{Key: "Origin (Master IC)", Value: "$masteric.Origin"},
			{Key: "Forward Area Origin (Master IC)", Value: "$masteric.Forward Area Origin"},
			{Key: "Destination (Master IC)", Value: "$masteric.Destination"},
			{Key: "Forward Area Destination (Master IC)", Value: "$masteric.Forward Area Destination"},
			{Key: "Product (Master IC)", Value: "$masteric.Product"},
			{Key: "Chargeable Weight (Master IC)", Value: "$masteric.Chargeable Weight"},
			{Key: "Forward Rate Origin (Master IC)", Value: "$masteric.Forward Rate Origin"},
			{Key: "Forward Rate Destination (Master IC)", Value: "$masteric.Forward Rate Destination"},
			{Key: "STTTypeFeeFixed (Master IC)", Value: "$masteric.Client Category"},
			{Key: "PublishRateFeeFixed (Master IC)", Value: "$masteric. PublishRateFeeFixed "},
			{Key: "Stt Chargeable Weight (Master BC)", Value: "$masterbc.Stt Chargeable Weight"},
			{Key: "Invoice/Number (Master BC)", Value: "$masterbc.Invoice/Number"},
		}}},

		// Step 14: Merge the results into lookup_processfrd
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processfrd"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the first pipeline
	collection := db.GetCollection("datafrd")
	_, err := collection.Aggregate(context.Background(), firstPipeline)
	if err != nil {
		log.Printf("First aggregation pipeline failed: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"First aggregation failed: %v\"}\n\n", err)
		flusher.Flush()
		return
	}

	// Notify about second pipeline execution
	fmt.Fprintf(w, "data: {\"message\": \"Executing second aggregation pipeline for Forward Area Destination lookup...\"}\n\n")
	flusher.Flush()
	log.Println("Executing Second Aggregation Pipeline for Forward Area Origin.")

	// Define second pipeline for Forward Area Origin lookup
	secondPipeline := mongo.Pipeline{
		// Match documents with Forward Area Origin (Master IC)
		{{Key: "$match", Value: bson.M{
			"Forward Area Destination (Master IC)": bson.M{"$exists": true},
			"STT Booked At (Master IC)":            bson.M{"$exists": true},
		}}},
		// Lookup from masterrf_7 using Forward Area Origin (Master IC)
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "masterrf_7"},
			{Key: "let", Value: bson.M{
				"forwardAreaOrigin": "$Forward Area Destination (Master IC)",
				"sttBookedAt":       "$STT Booked At (Master IC)",
			}},
			{Key: "pipeline", Value: mongo.Pipeline{
				// Step 1: Match documents where "District Name" matches "Forward Area Origin (Master IC)"
				//         and "isoSTTBookedAt" is within start_date and end_date range
				{{Key: "$match", Value: bson.D{
					{Key: "$expr", Value: bson.D{
						{Key: "$and", Value: bson.A{
							bson.D{{Key: "$eq", Value: bson.A{"$District Name", "$$forwardAreaOrigin"}}},
							bson.D{{Key: "$lte", Value: bson.A{"$start_date", "$$sttBookedAt"}}},
							bson.D{{Key: "$gte", Value: bson.A{"$end_date", "$$sttBookedAt"}}},
						}},
					}},
				}}},
				// Step 2: Project only the necessary fields
				{{Key: "$project", Value: bson.D{
					{Key: "District Name", Value: 1},
					{Key: "FWD Base Origin", Value: 1},
					{Key: "FWD Base Destination", Value: 1},
					{Key: "Keterangan", Value: 1},
					{Key: "_id", Value: 0},
				}}},
			}},
			{Key: "as", Value: "forwardAreaInfo"},
		}}},
		// Unwind lookup results
		{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$forwardAreaInfo"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},
		// Add fields from masterrf_7
		{{Key: "$addFields", Value: bson.D{
			{Key: "Forward Area Rate (Master RF)", Value: "$forwardAreaInfo.FWD Base Origin"},
			{Key: "Forward Area Destination (Master RF)", Value: "$forwardAreaInfo.FWD Base Destination"},
			{Key: "Keterangan (Master RF)", Value: "$forwardAreaInfo.Keterangan"},
		}}},
		// Remove temporary lookup field
		{{Key: "$project", Value: bson.D{
			{Key: "forwardAreaInfo", Value: 0},
		}}},
		// Merge results back into lookup_processfrd
		{{Key: "$merge", Value: bson.D{
			{Key: "into", Value: "lookup_processfrd"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute second pipeline
	lookupProcessCollection = db.GetCollection("lookup_processfrd")
	_, err = lookupProcessCollection.Aggregate(context.Background(), secondPipeline)
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
