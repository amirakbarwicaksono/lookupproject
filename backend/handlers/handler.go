package handlers

import (
	"backend/db"
	"backend/models"
	"context"
	"crypto/sha256"
	"encoding/csv"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strings"
	"time"
	"unicode"

	"github.com/shopspring/decimal"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

// Fungsi untuk login difrontend, berdasarkan databased users.
// LoginRequest represents the incoming login request
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// LoginResponse represents the response for a successful or failed login
type LoginResponse struct {
	Success bool     `json:"success"`
	Message string   `json:"message"`
	Access  []string `json:"access,omitempty"`
	Keyword []string `json:"keyword,omitempty"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the incoming login request
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Get the MongoDB collection
	collection := db.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find the user by username
	var user models.User
	err := collection.FindOne(ctx, map[string]string{"username": req.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Verify the password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Generate a JWT token (optional)
	// Uncomment if JWT is used for stateless authentication
	// token, err := generateJWT(user)
	// if err != nil {
	// 	http.Error(w, "Failed to generate token", http.StatusInternalServerError)
	// 	return
	// }

	// Return user access and keyword details
	response := LoginResponse{
		Success: true,
		Message: "Login successful",
		Access:  user.Access,
		Keyword: user.Keyword,
		// Token: token, // Uncomment if using JWT
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetSubpages(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the access array from the request body
	var userAccess []string
	if err := json.NewDecoder(r.Body).Decode(&userAccess); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// // Log for debugging
	// fmt.Println("Fetching subpages with access:", userAccess)

	// Get the MongoDB collection
	collection := db.GetCollection("applists")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Filter subpages based on user's access
	filter := map[string]interface{}{
		"nick": map[string]interface{}{
			"$in": userAccess,
		},
	}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Println("Error fetching data:", err) // Debug log
		http.Error(w, "Failed to fetch subpages", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	// Parse results into a slice
	var subpages []map[string]interface{}
	if err := cursor.All(ctx, &subpages); err != nil {
		fmt.Println("Error parsing data:", err) // Debug log
		http.Error(w, "Failed to parse subpages", http.StatusInternalServerError)
		return
	}

	// // Debug log for parsed data
	// fmt.Printf("Fetched subpages: %+v\n", subpages)

	// Send JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(subpages)
}

// Batas fungsi untuk login difrontend, berdasarkan databased users.
// Fungsi untuk Lihat Overview Data Yang Diupload di tiap tiap Collection di MongoDB
// CountCollections retrieves the estimated document count for all specified collections
func CountCollections(w http.ResponseWriter, r *http.Request) {
	collectionNames := []string{
		"datakof",
		"datakif",
		"datasof",
		"datasif",
		"datapof",
		"datafro",
		"datafrd",
		"datadef",
		"datatfs",
		"datatft",
		"datakpf",
		"datakdf",
		"mastermn_1",
		"masteric_2",
		"masterls_3",
		"mastertbs_4",
		"mastertbs_41",
		"mastertbs_42",
		"mastertbs_43",
		"mastertbs_44",
		"mastertbs_45",
		"mastertbs_46",
		"mastertbs_47",
		"mastertbs_48",
		"mastertbs_49",
		"mastertbs_50",
		"mastertbs_51",
		"masterbc_5",
		"masterrg_6",
		"masterrf_7",
		"masterrt_8",
		"masterdl_9",
		"mastermt_10",
	}

	var counts []struct {
		Collection string `json:"collection"`
		Count      int64  `json:"count"`
	}

	for _, name := range collectionNames {
		collection := db.GetCollection(name)
		// Use EstimatedDocumentCount for faster approximate counts
		count, err := collection.EstimatedDocumentCount(context.Background())
		if err != nil {
			log.Printf("Failed to estimate document count for collection %s: %v", name, err)
			counts = append(counts, struct {
				Collection string `json:"collection"`
				Count      int64  `json:"count"`
			}{name, -1}) // -1 indicates an error
			continue
		}
		counts = append(counts, struct {
			Collection string `json:"collection"`
			Count      int64  `json:"count"`
		}{name, count})
	}

	// Encode the counts into the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(counts); err != nil {
		log.Printf("Failed to encode counts: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

// GetUpdateLogs retrieves the latest update logs for all specified collections
func GetUpdateLogs(w http.ResponseWriter, r *http.Request) {
	collectionNames := []string{
		"datakof",
		"datakif",
		"datasof",
		"datasif",
		"datapof",
		"datafro",
		"datafrd",
		"datadef",
		"datatfs", // Skip for now
		"datatft", // Skip for now
		"datakpf", // Skip for now
		"datakdf", // Skip for now
		"mastermn_1",
		"masteric_2",
		"masterls_3",
		"mastertbs_4",
		"mastertbs_41",
		"mastertbs_42",
		"mastertbs_43",
		"mastertbs_44",
		"mastertbs_45",
		"mastertbs_46",
		"mastertbs_47",
		"mastertbs_48",
		"mastertbs_49",
		"mastertbs_50",
		"mastertbs_51",
		"masterbc_5",
		"masterrg_6",
		"masterrf_7",
		"masterrt_8",
		"masterdl_9",
		"mastermt_10",
	}

	var updateLogs []struct {
		Collection  string `json:"collection"`
		LastUpdated string `json:"lastUpdated"`
		RecordCount int    `json:"recordCount"`
		Status      string `json:"status"`
	}

	// Get the update_logs collection
	updateLogsCollection := db.GetCollection("update_logs")

	for _, name := range collectionNames {
		// Find the latest log for the given collection
		var logEntry struct {
			CollectionName string    `bson:"collection_name"`
			UploadedAt     time.Time `bson:"uploaded_at"`
			RecordCount    int       `bson:"record_count"`
			Status         string    `bson:"status"`
		}

		err := updateLogsCollection.
			FindOne(context.Background(), bson.M{"collection_name": name}, options.FindOne().SetSort(bson.D{{Key: "uploaded_at", Value: -1}})).
			Decode(&logEntry)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				// If no documents found, append an empty log entry
				updateLogs = append(updateLogs, struct {
					Collection  string `json:"collection"`
					LastUpdated string `json:"lastUpdated"`
					RecordCount int    `json:"recordCount"`
					Status      string `json:"status"`
				}{name, "No updates", 0, "No Data"})
			} else {
				log.Printf("Failed to retrieve log for collection %s: %v", name, err)
				http.Error(w, "Failed to retrieve update logs", http.StatusInternalServerError)
				return
			}
		} else {
			updateLogs = append(updateLogs, struct {
				Collection  string `json:"collection"`
				LastUpdated string `json:"lastUpdated"`
				RecordCount int    `json:"recordCount"`
				Status      string `json:"status"`
			}{
				Collection:  logEntry.CollectionName,
				LastUpdated: logEntry.UploadedAt.Format(time.RFC3339),
				RecordCount: logEntry.RecordCount,
				Status:      logEntry.Status,
			})
		}
	}

	// Encode the update logs into the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updateLogs); err != nil {
		log.Printf("Failed to encode update logs: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

// Fungsi untuk upload data ditiap-tiap data CSV (baik master maupun data yang akan diproses)
// Map of collection names to corresponding structs for header validation
var collectionStructs = map[string]interface{}{
	"datakof":      models.Datakof{},
	"datakif":      models.Datakif{},
	"datasof":      models.Datasof{},
	"datasif":      models.Datasif{},
	"datapof":      models.Datapof{},
	"datafro":      models.Datafro{},
	"datafrd":      models.Datafrd{},
	"datadef":      models.Datadef{},
	"datatfs":      models.Datatfs{},
	"datatft":      models.Datatft{},
	"datakpf":      models.Datakpf{},
	"datakdf":      models.Datakdf{},
	"mastermn_1":   models.Mastermn_1{},
	"masteric_2":   models.Masteric_2{},
	"masterls_3":   models.Masterls_3{},
	"mastertbs_4":  models.Mastertbs_4{},
	"mastertbs_41": models.Mastertbs_41{},
	"mastertbs_42": models.Mastertbs_42{},
	"mastertbs_43": models.Mastertbs_43{},
	"mastertbs_44": models.Mastertbs_44{},
	"mastertbs_45": models.Mastertbs_45{},
	"mastertbs_46": models.Mastertbs_46{},
	"mastertbs_47": models.Mastertbs_47{},
	"mastertbs_48": models.Mastertbs_48{},
	"mastertbs_49": models.Mastertbs_49{},
	"mastertbs_50": models.Mastertbs_50{},
	"mastertbs_51": models.Mastertbs_51{},
	"masterbc_5":   models.Masterbc_5{},
	"masterrg_6":   models.Masterrg_6{},
	"masterrf_7":   models.Masterrf_7{},
	"masterrt_8":   models.Masterrt_8{},
	"masterdl_9":   models.Masterdl_9{},
	"mastermt_10":  models.Mastermt_10{},
}

// Map of collections requiring data removal before upload
var collectionsToClear = map[string]bool{
	"datakof":      true, // Use DeleteMany for this collection
	"datakif":      true, // Use DeleteMany for this collection
	"datasof":      true, // Use DeleteMany for this collection
	"datasif":      true,
	"datapof":      true,
	"datafro":      true,
	"datafrd":      true,
	"datadef":      true,
	"datatfs":      true,
	"datatft":      true,
	"datakpf":      true,
	"datakdf":      true,
	"mastermn_1":   true,  // Use DeleteMany for this collection
	"masteric_2":   false, // Skip data removal
	"masterls_3":   false, // Skip data removal
	"mastertbs_4":  false, // Skip data removal
	"mastertbs_41": false,
	"mastertbs_42": false, //new added
	"mastertbs_43": false, //new added
	"mastertbs_44": false, //new added
	"mastertbs_45": false, //new added
	"mastertbs_46": false, //new added
	"mastertbs_47": false, //new added
	"mastertbs_48": false, //new added
	"mastertbs_49": false, //new added
	"mastertbs_50": false, //new added
	"mastertbs_51": false, //new added
	"masterbc_5":   false, // Skip data removal
	"masterrg_6":   false, // Skip data removal
	"masterrf_7":   false, // Skip data removal
	"masterrt_8":   false, // Skip data removal
	"masterdl_9":   false, // Skip data removal
	"mastermt_10":  false, // Skip data removal
}

// Function to clean spaces and replace non-breaking spaces
func TrimSpacesAndRemoveChar160(input string) string {
	// Step 1: Trim leading and trailing spaces
	trimmed := strings.TrimSpace(input)

	// Step 2: Replace non-breaking spaces and non-printable characters
	return strings.Map(func(r rune) rune {
		if r == 160 || r == '\u00A0' || !unicode.IsPrint(r) || r == '�' { // Non-breaking space and non-printable
			return ' ' // Replace with a regular space
		}
		return r // Keep printable characters
	}, trimmed)
}

func respondWithJSONError(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// Get the list of expected headers from struct tags
func getStructHeaders(structType interface{}) []string {
	v := reflect.TypeOf(structType)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}

	var headers []string
	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		tag := field.Tag.Get("bson")
		if tag != "" && tag != "-" {
			headers = append(headers, tag)
		}
	}
	return headers
}

// Validate CSV headers against the expected struct headers
func validateHeaders(csvHeaders, expectedHeaders []string) error {
	if len(csvHeaders) != len(expectedHeaders) {
		return fmt.Errorf("header count mismatch: expected %d, got %d", len(expectedHeaders), len(csvHeaders))
	}
	for i, csvHeader := range csvHeaders {
		if csvHeader != expectedHeaders[i] {
			return fmt.Errorf("header mismatch at column %d: expected '%s', got '%s'", i+1, expectedHeaders[i], csvHeader)
		}
	}
	return nil
}

// GenerateUniqueKey creates a unique key by hashing the concatenated record fields
func GenerateUniqueKey(record map[string]interface{}) string {
	hash := sha256.New()
	for key, value := range record {
		hash.Write([]byte(fmt.Sprintf("%s:%v;", key, value)))
	}
	return hex.EncodeToString(hash.Sum(nil))
}

func UploadData(w http.ResponseWriter, r *http.Request) {
	collectionName := r.URL.Query().Get("collection")
	username := r.URL.Query().Get("username") // Username of the uploader
	month := r.FormValue("month")             // Month of the data aktifkan ini nanti

	if collectionName == "" || username == "" || month == "" {
		respondWithJSONError(w, http.StatusBadRequest, "Collection name, username, and month are required")
		return
	}

	// Validate the collection name
	structType, exists := collectionStructs[collectionName]
	if !exists {
		respondWithJSONError(w, http.StatusBadRequest, fmt.Sprintf("Unknown collection: %s", collectionName))
		return
	}

	// Parse the CSV file
	file, _, err := r.FormFile("file")
	if err != nil {
		respondWithJSONError(w, http.StatusBadRequest, "Failed to read CSV file: "+err.Error())
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)

	// Read CSV headers
	csvHeaders, err := reader.Read()
	if err != nil {
		respondWithJSONError(w, http.StatusBadRequest, "Failed to read CSV headers: "+err.Error())
		return
	}

	// Get expected headers from the struct
	expectedHeaders := getStructHeaders(structType)
	if err := validateHeaders(csvHeaders, expectedHeaders); err != nil {
		respondWithJSONError(w, http.StatusBadRequest, "Header validation failed: "+err.Error())
		return
	}

	// Read CSV records
	records, err := reader.ReadAll()
	if err != nil {
		respondWithJSONError(w, http.StatusBadRequest, "Failed to read CSV data: "+err.Error())
		return
	}

	// Total records from the CSV
	csvTotalCount := len(records)

	// Prepare data and handle duplicates
	var data []interface{}
	seenRecords := make(map[string]struct{})
	for _, record := range records {
		row := make(map[string]interface{})
		for i, value := range record {
			row[csvHeaders[i]] = TrimSpacesAndRemoveChar160(value)
		}
		row["month"] = month //add the month to each record  aktifkan ini nanti
		uniqueKey := GenerateUniqueKey(row)
		if _, exists := seenRecords[uniqueKey]; exists {
			continue // Skip duplicates
		}
		seenRecords[uniqueKey] = struct{}{}
		data = append(data, row)
	}

	// Get the MongoDB collection
	collection := db.GetCollection(collectionName)

	// Fetch "before" record count
	beforeCount, _ := collection.EstimatedDocumentCount(context.Background())

	// Remove existing data if necessary
	if shouldClear, ok := collectionsToClear[collectionName]; ok && shouldClear {
		if _, err := collection.DeleteMany(context.Background(), bson.D{}); err != nil {
			log.Printf("Failed to clear data in collection %s: %v", collectionName, err)
			respondWithJSONError(w, http.StatusInternalServerError, "Failed to clear data in collection")
			return
		}
		log.Printf("Data in collection %s cleared successfully", collectionName)
	}

	// Different handling for specific collections
	const batchSize = 1000
	var totalInserted int

	if collectionName == "datakof" || collectionName == "datakif" || collectionName == "datasof" || collectionName == "datasif" || collectionName == "datapof" || collectionName == "datafro" || collectionName == "datafrd" || collectionName == "datadef" || collectionName == "datakpf" || collectionName == "datakdf" || collectionName == "datatfs" || collectionName == "datatft" || collectionName == "mastermn_1" {
		// InsertMany for collections datakof, datakif, mastermn_1
		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			if _, err := collection.InsertMany(context.Background(), batch); err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert data into database")
				return
			}
			totalInserted += len(batch)
			log.Printf("Inserted batch of %d records into collection %s", len(batch), collectionName)
		}
	} else if collectionName == "masterls_3" {
		// Special handling for masterls_3: Upsert using "STT No"
		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			var bulkOps []mongo.WriteModel
			for _, record := range batch {
				doc := record.(map[string]interface{})
				filter := bson.M{"STT No": doc["STT No"]}
				update := bson.M{"$set": doc}
				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
			}

			res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
			if err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
				return
			}

			totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)
			log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
				res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		}
	} else if collectionName == "masterbc_5" {
		// Special handling for masterbc_5: Upsert using "Stt ID"
		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			var bulkOps []mongo.WriteModel
			for _, record := range batch {
				doc := record.(map[string]interface{})
				filter := bson.M{"Stt ID": doc["Stt ID"]}
				update := bson.M{"$set": doc}
				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
			}

			res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
			if err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
				return
			}

			totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)
			log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
				res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		}
		// } else if collectionName == "masterdl_9" { //matikan jika sudah tidak digunakan.
		// 		// Special handling for masterdl_9: Upsert using "STT No"
		// 		for i := 0; i < len(data); i += batchSize {
		// 			end := i + batchSize
		// 			if end > len(data) {
		// 				end = len(data)
		// 			}
		// 			batch := data[i:end]
		// 			var bulkOps []mongo.WriteModel

		// 			for _, record := range batch {
		// 				doc := record.(map[string]interface{})
		// 				filter := bson.M{"STT No": doc["STT No"]} // Filter berdasarkan "STT No"
		// 				update := bson.M{"$set": doc}             // Update dokumen dengan data baru
		// 				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().
		// 					SetFilter(filter).
		// 					SetUpdate(update).
		// 					SetUpsert(true)) // SetUpsert(true) untuk menambahkan jika tidak ada yang cocok
		// 			}

		// 			// Melakukan BulkWrite ke database
		// 			res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
		// 			if err != nil {
		// 				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username)
		// 				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
		// 				return
		// 			}

		// 			// Menghitung total data yang berhasil dimasukkan atau diperbarui
		// 			totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)

		// 			// Logging hasil bulk write
		// 			log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
		// 				res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		// 		}

		// } else if collectionName == "masteric_2" { // hanya untuk upload
		// 	// Special handling for masteric_2: Upsert using "STT No"
		// 	for i := 0; i < len(data); i += batchSize {
		// 		end := i + batchSize
		// 		if end > len(data) {
		// 			end = len(data)
		// 		}
		// 		batch := data[i:end]
		// 		var bulkOps []mongo.WriteModel

		// 		for _, record := range batch {
		// 			doc := record.(map[string]interface{})
		// 			filter := bson.M{"STT No": doc["STT No"]} // Filter based on "STT No"
		// 			update := bson.M{"$set": doc}             // Update document with new data
		// 			bulkOps = append(bulkOps, mongo.NewUpdateOneModel().
		// 				SetFilter(filter).
		// 				SetUpdate(update).
		// 				SetUpsert(true)) // SetUpsert(true) to add if no match is found
		// 		}

		// 		// Perform BulkWrite to the database
		// 		res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
		// 		if err != nil {
		// 			insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username)
		// 			respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
		// 			return
		// 		}

		// 		// Count the total data successfully inserted or updated
		// 		totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)

		// 		// Log the result of the bulk write
		// 		log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
		// 			res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		// 	}
	} else if collectionName == "mastermt_10" {
		// Special handling for masterbc_5: Upsert using "Manifest"
		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			var bulkOps []mongo.WriteModel
			for _, record := range batch {
				doc := record.(map[string]interface{})
				filter := bson.M{"Manifest": doc["Manifest"]} // Use "Manifest" as the unique key
				update := bson.M{"$set": doc}
				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
			}

			res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
			if err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
				return
			}

			totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)
			log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
				res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		}
	} else if collectionName == "masterrt_8" {
		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			var bulkOps []mongo.WriteModel
			for _, record := range batch {
				doc := record.(map[string]interface{})
				filter := bson.M{
					"Rute":       doc["Rute"],
					"Truck Rate": doc["Truck Rate"],
				}
				update := bson.M{"$set": doc}
				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
			}

			res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
			if err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
				return
			}

			totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)
			log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
				res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		}
	} else if collectionName == "masterrf_7" {
		// Special handling for Masterrf_7: Insert with date range fields
		// Fetch the latest date range for the collection
		dateRangesCollection := db.GetCollection("date_ranges")
		var latestDateRange struct {
			StartDate string `bson:"start_date"`
			EndDate   string `bson:"end_date"`
		}
		err := dateRangesCollection.FindOne(context.Background(), bson.M{"collection": collectionName}, options.FindOne().SetSort(bson.D{{Key: "created_at", Value: -1}})).Decode(&latestDateRange)
		if err != nil {
			log.Printf("Failed to fetch latest date range for collection %s: %v", collectionName, err)
			respondWithJSONError(w, http.StatusInternalServerError, "Failed to fetch latest date range")
			return
		}

		// Convert StartDate and EndDate strings to time.Time (ISODate equivalent in Go)
		startDate, err := time.Parse("02-Jan-06", latestDateRange.StartDate) // Parse string to time.Time
		if err != nil {
			log.Printf("Failed to parse start_date: %v", err)
			respondWithJSONError(w, http.StatusInternalServerError, "Invalid start_date format")
			return
		}
		endDate, err := time.Parse("02-Jan-06", latestDateRange.EndDate) // Parse string to time.Time
		if err != nil {
			log.Printf("Failed to parse end_date: %v", err)
			respondWithJSONError(w, http.StatusInternalServerError, "Invalid end_date format")
			return
		}

		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			for _, record := range batch {
				doc := record.(map[string]interface{})
				doc["start_date"] = startDate
				doc["end_date"] = endDate
			}
			if _, err := collection.InsertMany(context.Background(), batch, options.InsertMany().SetOrdered(false)); err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert data into database")
				return
			}
			totalInserted += len(batch)
			log.Printf("Inserted batch of %d records into collection %s", len(batch), collectionName)
		}
	} else {
		// Default handling for other collections
		for i := 0; i < len(data); i += batchSize {
			end := i + batchSize
			if end > len(data) {
				end = len(data)
			}
			batch := data[i:end]
			var bulkOps []mongo.WriteModel
			for _, record := range batch {
				doc := record.(map[string]interface{})
				uniqueKeyField := getUniqueKeyField(collectionName)
				filter := bson.M{uniqueKeyField: doc[uniqueKeyField]}
				update := bson.M{"$set": doc}
				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
			}

			res, err := collection.BulkWrite(context.Background(), bulkOps, options.BulkWrite().SetOrdered(false))
			if err != nil {
				insertUploadLog(collectionName, csvTotalCount, totalInserted, "Failed", err.Error(), beforeCount, -1, 0, username, month)
				respondWithJSONError(w, http.StatusInternalServerError, "Failed to insert or update data in database")
				return
			}

			totalInserted += int(res.UpsertedCount) + int(res.ModifiedCount)
			log.Printf("Bulk write result - Matched: %d, Modified: %d, Upserted: %d in collection %s",
				res.MatchedCount, res.ModifiedCount, res.UpsertedCount, collectionName)
		}
	}

	// Fetch "after" record count
	afterCount, _ := collection.EstimatedDocumentCount(context.Background())

	// Calculate duplicate count
	duplicateCount := csvTotalCount - (int(afterCount) - int(beforeCount))

	// Insert upload log
	insertUploadLog(collectionName, csvTotalCount /*tambahan*/, totalInserted, "Success", "", beforeCount, afterCount, duplicateCount, username, month)

	// Success response
	log.Printf("Successfully inserted %d records into collection %s", totalInserted, collectionName)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":        "Data uploaded successfully",
		"recordsAdded":   totalInserted,
		"csvTotalCount":  csvTotalCount, //tambahan
		"beforeCount":    beforeCount,
		"afterCount":     afterCount,
		"duplicateCount": duplicateCount, // Ensure this is included
	})
}

// tambahkan uniquekeyfield untuk collectiion baru. ex mastertbs_41.42.43
// Helper to determine unique key field for collections
func getUniqueKeyField(collectionName string) string {
	switch collectionName {
	case "masteric_2":
		return "STT No"
	case "mastertbs_4":
		return "Kode"
	case "mastertbs_41":
		return "Kode"
	case "mastertbs_42":
		return "Kode"
	case "mastertbs_43":
		return "Kode"
	case "mastertbs_44":
		return "Kode"
	case "mastertbs_45":
		return "KodeFro"
	case "mastertbs_46":
		return "KodeFrd"
	case "mastertbs_47":
		return "KodeDef"
	case "mastertbs_48":
		return "KodeTfs"
	case "mastertbs_49":
		return "KodeTft"
	case "mastertbs_50":
		return "KodeKpf"
	case "mastertbs_51":
		return "KodeKdf"
	// case "masterbc_5":
	// 	return "Stt ID"
	case "masterrg_6":
		return "Productroute"
	// case "masterrf_7":
	// 	return "District Name"
	case "masterdl_9":
		return "STT No"
	default:
		return "_id" // Default field
	}
}

func GenerateUniqueKeyForMasterrt(record map[string]interface{}) string {
	rute := fmt.Sprintf("%v", record["Rute"])
	truckRate := fmt.Sprintf("%v", record["Truck Rate"])
	return fmt.Sprintf("%s|%s", rute, truckRate)
}

// Updated insertUploadLog function to include duplicate count
func insertUploadLog(collectionName string, csvTotalCount, recordCount int, status, errorMessage string, beforeCount, afterCount int64, duplicateCount int, username string, month string) {
	logCollection := db.GetCollection("update_logs")
	logEntry := models.UploadLog{
		CollectionName: collectionName,
		CSVTotalCount:  csvTotalCount, // New field for total CSV data count
		RecordCount:    recordCount,
		UploadedAt:     time.Now(),
		Status:         status,
		ErrorMessage:   errorMessage,
		DataBefore:     beforeCount,
		DataAfter:      afterCount,
		DuplicateCount: duplicateCount, // New field for duplicate count
		UploadedBy:     username,
		Month:          month, // New field for month
	}
	if _, err := logCollection.InsertOne(context.Background(), logEntry); err != nil {
		log.Printf("Failed to insert upload log for collection %s: %v", collectionName, err)
	}
}

// Print ke CSV Header untuk panduan team LP
func FetchHeadersAndExport(w http.ResponseWriter, r *http.Request) {
	collectionName := r.URL.Query().Get("collection")
	if collectionName == "" {
		http.Error(w, "Collection name is required", http.StatusBadRequest)
		return
	}

	// Validate the collection name and get the struct type
	structType, exists := collectionStructs[collectionName]
	if !exists {
		http.Error(w, fmt.Sprintf("Unknown collection: %s", collectionName), http.StatusBadRequest)
		return
	}

	// Get headers from the struct
	headers := getStructHeaders(structType)
	if len(headers) == 0 {
		http.Error(w, fmt.Sprintf("No headers found for collection: %s", collectionName), http.StatusInternalServerError)
		return
	}

	// Set response headers for CSV download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment;filename=%s_headers.csv", collectionName))

	// Write headers to CSV
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	if err := csvWriter.Write(headers); err != nil {
		log.Printf("Failed to write headers to CSV: %v", err)
		http.Error(w, "Failed to write CSV file", http.StatusInternalServerError)
		return
	}

	log.Printf("Headers exported for collection %s: %v", collectionName, headers)
}

//Batas Proses Untuk Upload Data

//Handler untuk lookup and save also export to CSV file

// Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
func LookupAndSave(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_process collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_process collection.")

	lookupProcessCollection := db.GetCollection("lookup_process")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_process collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_process collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_process collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_process collection successfully.\"}\n\n")
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
			{Key: "from", Value: "mastertbs_4"},
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
			// Fields from datakof
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
			{Key: "into", Value: "lookup_process"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the pipeline
	collection := db.GetCollection("datakof")
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

// datakif
// Untuk proses data KOF Lookup Up Sesuai dengan Konrdinasi denga team LP
func LookupAndSavekif(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, "data: {\"message\": \"Clearing data in lookup_processkif collection...\"}\n\n")
	flusher.Flush()
	log.Println("Clearing data in lookup_processkif collection.")

	lookupProcessCollection := db.GetCollection("lookup_processkif")
	if _, err := lookupProcessCollection.DeleteMany(context.Background(), bson.D{}); err != nil {
		log.Printf("Failed to clear data in lookup_processkif collection: %v", err)
		fmt.Fprintf(w, "event: error\ndata: {\"message\": \"Failed to clear data in lookup_processkif collection\"}\n\n")
		flusher.Flush()
		return
	}

	log.Println("Cleared data in lookup_processkif collection successfully.")
	fmt.Fprintf(w, "data: {\"message\": \"Data cleared in lookup_processkif collection successfully.\"}\n\n")
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
			{Key: "from", Value: "mastertbs_41"},
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
			// Fields from datakif
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
			{Key: "into", Value: "lookup_processkif"},
			{Key: "whenMatched", Value: "merge"},
			{Key: "whenNotMatched", Value: "insert"},
		}}},
	}

	// Execute the pipeline
	collection := db.GetCollection("datakif")
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

// Export CSV into FEE Collection (datakof etc.)
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSV(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_process")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{
		"STT No",
		"Kode",
		"Bill",
		"Stt Booked Date",
		"Stt Pod Date",
		"Lag Route",
		"Origin",
		"Destination",
		"Product",
		"Client Name",
		"Chargeable Weight",
		"Publish Rate Cost",
		"Mitra Code Genesis",
		"Outbound Fee",
		"Ket",
		"Mitra Type",
		"Pic",
		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F",                         // ADDED FORMAT
		"Routing 1 (File LP Routing)", // ADDED FORMAT
		"Routing 2 (File SC Qs)",      // ADDED FORMAT
		"Route Transit",               // ADDED FORMAT
		"Cek Double",                  // ADDED FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"STT Intracity",                   // ADDED FORMAT
		"Cek Aktual Fee",                  // ADDED FORMAT
		"Cek Double STT Outbound/Inbound", // ADDED FORMAT
		"T/F",                             // ADDED FORMAT
		"Last Status (Master Last Status) ",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Destination (Master IC)",
		"T/F O/D", // ADDED FORMAT
		"Product (Master IC)",
		"T/F", // ADDED FORMAT
		"Chargeable Weight (Master IC)",
		"T/F", // ADDED FORMAT
		"STTTypeFeeFixed (Master IC)",
		"PublishRateFeeFixed (Master IC)",
		"T/F", // ADDED FORMAT
		"Stt Chargeable Weight (Master BC)",
		"T/F", // ADDED FORMAT
		"Invoice/Number (Master BC)",
		"Outbound_fee_Konsol (IC)", // ADDED FORMAT
		"Selisih",                  // ADDED FORMAT
		"Keterangan Selisih",       // ADDED FORMAT
		"Type Fee",                 // ADDED FORMAT
	}

	// Write headers to CSV
	if err := csvWriter.Write(headers); err != nil {
		log.Printf("Failed to write CSV headers: %v", err)
		http.Error(w, "Failed to write CSV headers", http.StatusInternalServerError)
		return
	}

	// Stream data from the collection
	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Printf("Failed to fetch data from lookup_process: %v", err)
		http.Error(w, "Failed to fetch data from lookup_process", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.Background())

	// Iterate over the cursor and write rows one by one
	for cursor.Next(context.Background()) {
		// Decode each document into a map
		var doc map[string]interface{}
		if err := cursor.Decode(&doc); err != nil {
			log.Printf("Failed to decode document: %v", err)
			http.Error(w, "Failed to process data", http.StatusInternalServerError)
			return
		}

		// Map fields from the document to match headers
		row := []string{
			toString(doc["STT No"]),
			toString(doc["Kode"]),
			toString(doc["Bill"]),
			toString(doc["Stt Booked Date"]),
			toString(doc["Stt Pod Date"]),
			toString(doc["Lag Route"]),
			toString(doc["Origin"]),
			toString(doc["Destination"]),
			toString(doc["Product"]),
			toString(doc["Client Name"]),
			formatNumber(doc["Chargeable Weight"]),
			formatNumber(doc["Publish Rate Cost"]),
			toString(doc["Mitra Code Genesis"]),
			formatNumber(doc[" Outbound Fee "]),
			toString(doc["Ket"]),
			toString(doc["Mitra Type"]),
			toString(doc["Pic"]),
			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
			"", // Empty value for Additional Column 5
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
			toString(doc["Last Status (Master Last Status) "]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Product (Master IC)"]),
			"", // Empty value for Additional Column 1
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			"", // Empty value for Additional Column 1
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			formatNumber(doc["PublishRateFeeFixed (Master IC)"]),
			"", // Empty value for Additional Column 1
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			toString(doc["Invoice/Number (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
		}

		// Stream row to CSV
		if err := csvWriter.Write(row); err != nil {
			log.Printf("Failed to write CSV row: %v", err)
			http.Error(w, "Failed to write CSV row", http.StatusInternalServerError)
			return
		}
		csvWriter.Flush()
	}

	// Check for errors in the cursor
	if err := cursor.Err(); err != nil {
		log.Printf("Cursor error: %v", err)
		http.Error(w, "Failed to process data", http.StatusInternalServerError)
		return
	}

	log.Println("CSV export completed successfully")
}

// // Helper function to convert interface{} to string
// func toString(value interface{}) string {
// 	if value == nil {
// 		return ""
// 	}
// 	return fmt.Sprintf("%v", value)
// }

// datakif
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVkif(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processkif")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{
		"STT No",
		"Kode",
		"Bill",
		"Stt Booked Date",
		"Stt Pod Date",
		"Lag Route",
		"Origin",
		"Destination",
		"Product",
		"Client Name",
		"Chargeable Weight",
		"Publish Rate Cost",
		"Mitra Code Genesis",
		"Inbound Fee",
		"Ket",
		"Mitra Type",
		"Pic",
		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F",                         // ADDED FORMAT
		"Routing 1 (File LP Routing)", // ADDED FORMAT
		"Routing 2 (File SC Qs)",      // ADDED FORMAT
		"Route Transit",               // ADDED FORMAT
		"Cek Double",                  // ADDED FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"STT Intracity",                   // ADDED FORMAT
		"Cek Aktual Fee",                  // ADDED FORMAT
		"Cek Double STT Outbound/Inbound", // ADDED FORMAT
		"T/F",                             // ADDED FORMAT
		"Last Status (Master Last Status) ",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Destination (Master IC)",
		"T/F O/D", // ADDED FORMAT
		"Product (Master IC)",
		"T/F", // ADDED FORMAT
		"Chargeable Weight (Master IC)",
		"T/F", // ADDED FORMAT
		"STTTypeFeeFixed (Master IC)",
		"PublishRateFeeFixed (Master IC)",
		"T/F", // ADDED FORMAT
		"Stt Chargeable Weight (Master BC)",
		"T/F", // ADDED FORMAT
		"Invoice/Number (Master BC)",
		"Inbound_fee_Konsol (IC)", // ADDED FORMAT
		"Selisih",                 // ADDED FORMAT
		"Keterangan Selisih",      // ADDED FORMAT
		"Type Fee",                // ADDED FORMAT
	}

	// Write headers to CSV
	if err := csvWriter.Write(headers); err != nil {
		log.Printf("Failed to write CSV headers: %v", err)
		http.Error(w, "Failed to write CSV headers", http.StatusInternalServerError)
		return
	}

	// Stream data from the collection
	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Printf("Failed to fetch data from lookup_processkif: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processkif", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.Background())

	// Iterate over the cursor and write rows one by one
	for cursor.Next(context.Background()) {
		// Decode each document into a map
		var doc map[string]interface{}
		if err := cursor.Decode(&doc); err != nil {
			log.Printf("Failed to decode document: %v", err)
			http.Error(w, "Failed to process data", http.StatusInternalServerError)
			return
		}

		// Map fields from the document to match headers
		row := []string{
			toString(doc["STT No"]),
			toString(doc["Kode"]),
			toString(doc["Bill"]),
			toString(doc["Stt Booked Date"]),
			toString(doc["Stt Pod Date"]),
			toString(doc["Lag Route"]),
			toString(doc["Origin"]),
			toString(doc["Destination"]),
			toString(doc["Product"]),
			toString(doc["Client Name"]),
			formatNumber(doc["Chargeable Weight"]),
			formatNumber(doc["Publish Rate Cost"]),
			toString(doc["Mitra Code Genesis"]),
			formatNumber(doc[" Inbound Fee "]),
			toString(doc["Ket"]),
			toString(doc["Mitra Type"]),
			toString(doc["Pic"]),
			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
			"", // Empty value for Additional Column 5
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
			toString(doc["Last Status (Master Last Status) "]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Product (Master IC)"]),
			"", // Empty value for Additional Column 1
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			"", // Empty value for Additional Column 1
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			formatNumber(doc["PublishRateFeeFixed (Master IC)"]),
			"", // Empty value for Additional Column 1
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			toString(doc["Invoice/Number (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
		}

		// Stream row to CSV
		if err := csvWriter.Write(row); err != nil {
			log.Printf("Failed to write CSV row: %v", err)
			http.Error(w, "Failed to write CSV row", http.StatusInternalServerError)
			return
		}
		csvWriter.Flush()
	}

	// Check for errors in the cursor
	if err := cursor.Err(); err != nil {
		log.Printf("Cursor error: %v", err)
		http.Error(w, "Failed to process data", http.StatusInternalServerError)
		return
	}

	log.Println("CSV export completed successfully")
}

// Helper function to convert interface{} to string
func toString(value interface{}) string {
	if value == nil {
		return ""
	}
	return fmt.Sprintf("%v", value)
}

// Helper function to format numbers with commas
func formatNumber(value interface{}) string {
	if value == nil {
		return ""
	}
	switch v := value.(type) {
	// case int, int8, int16, int32, int64, float32, float64:
	// 	return fmt.Sprintf("%v", v)
	case decimal.Decimal:
		return v.String()
	default:
		return fmt.Sprintf("%v", value)
	}
}

func GetUploadLogs(w http.ResponseWriter, r *http.Request) {
	collection := db.GetCollection("update_logs")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Printf("Failed to fetch upload logs: %v", err)
		http.Error(w, "Failed to fetch upload logs", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var logs []models.UploadLog
	if err := cursor.All(ctx, &logs); err != nil {
		log.Printf("Failed to parse upload logs: %v", err)
		http.Error(w, "Failed to parse upload logs", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(logs); err != nil {
		log.Printf("Failed to encode upload logs: %v", err)
		http.Error(w, "Failed to encode upload logs", http.StatusInternalServerError)
	}
}

//Added Rate Forward.

// Add this new struct
type DateRangeRequest struct {
	Collection string `json:"collection"`
	StartDate  string `json:"startDate"`
	EndDate    string `json:"endDate"`
	Username   string `json:"username"`
}

// Add this new handler
func SaveDateRange(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req DateRangeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Parse dates
	startDate, err := time.Parse("2006-01-02", req.StartDate)
	if err != nil {
		http.Error(w, "Invalid start date format", http.StatusBadRequest)
		return
	}

	endDate, err := time.Parse("2006-01-02", req.EndDate)
	if err != nil {
		http.Error(w, "Invalid end date format", http.StatusBadRequest)
		return
	}

	// Save to date_ranges collection
	dateRangesCollection := db.GetCollection("date_ranges")
	_, err = dateRangesCollection.InsertOne(context.Background(), bson.M{
		"collection": req.Collection,
		"start_date": startDate.Format("02-Jan-06"), // Ensure correct format
		"end_date":   endDate.Format("02-Jan-06"),   // Ensure correct format
		"created_by": req.Username,
		"created_at": time.Now(),
	})

	if err != nil {
		http.Error(w, "Failed to save date range", http.StatusInternalServerError)
		return
	}

	// 	// Update masterrf_7 collection
	// 	masterrfCollection := db.GetCollection("masterrf_7")
	// 	filter := bson.M{"District Name": bson.M{"$exists": true}}
	// 	update := bson.M{
	// 		"$set": bson.M{
	// 			"start_date": startDate.Format("02-Jan-06"), // Ensure correct format
	// 			"end_date":   endDate.Format("02-Jan-06"),   // Ensure correct format
	// 		},
	// 	}
	// 	_, err = masterrfCollection.UpdateMany(context.Background(), filter, update)
	// 	if err != nil {
	// 		http.Error(w, "Failed to update masterrf_7 collection", http.StatusInternalServerError)
	// 		return
	// 	}

	// 	w.WriteHeader(http.StatusOK)
	// 	json.NewEncoder(w).Encode(map[string]string{
	// 		"message": "Date range saved and masterrf_7 updated successfully",
	// 		})
	// 	}
	// }
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Date range saved successfully",
	})
}
