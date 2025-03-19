package handlers

import (
	"backend/db"
	"context"
	"encoding/csv"
	"log"
	"net/http"
	"strconv"
	"time"

	// "time"

	"go.mongodb.org/mongo-driver/bson"
)

// // Helper function to format date fields
// func formatDate(value interface{}) string {
// 	if value == nil {
// 		return ""
// 	}

// 	// Attempt to parse the value as a time.Time or a date string
// 	switch v := value.(type) {
// 	case time.Time:
// 		// Format to YYYY-MM-DD HH:mm:ss
// 		return v.Format("2006-01-02 15:04:05")
// 	case string:
// 		// Assuming input is in RFC3339 format
// 		parsedTime, err := time.Parse(time.RFC3339, v)
// 		if err == nil {
// 			return parsedTime.Format("2006-01-02 15:04:05")
// 		}
// 		return v // Return the string as-is if parsing fails
// 	default:
// 		return ""
// 	}
// }

// datasof
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVsof(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processsof")

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
		"Outbound_fee_Subkonsol (IC)", // ADDED FORMAT
		"Selisih",                     // ADDED FORMAT
		"Keterangan Selisih",          // ADDED FORMAT
		"Type Fee",                    // ADDED FORMAT
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
		log.Printf("Failed to fetch data from lookup_processsof: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processsof", http.StatusInternalServerError)
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

// datasif
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVsif(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processsif")

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
		"Inbound_fee_Subkonsol (IC)", // ADDED FORMAT
		"Selisih",                    // ADDED FORMAT
		"Keterangan Selisih",         // ADDED FORMAT
		"Type Fee",                   // ADDED FORMAT
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
		log.Printf("Failed to fetch data from lookup_processsif: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processsif", http.StatusInternalServerError)
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

// datapof
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVpof(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processpof")

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
		"Pickup Fee",
		"Ket",
		"Pic",
		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F", // ADDED FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"Cek STT Double", // ADDED FORMAT
		"Cek Prefix",     // ADDED FORMAT
		"Last Status (Master Last Status) ",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"T/F", // ADDED FORMAT
		"Product (Master IC)",
		"Chargeable Weight (Master IC)",
		"T/F", // ADDED FORMAT
		"STTTypeFeeFixed (Master IC)",
		"PublishRateFeeFixed (Master IC)",
		"T/F", // ADDED FORMAT
		"Stt Chargeable Weight (Master BC)",
		"T/F", // ADDED FORMAT
		"Invoice/Number (Master BC)",
		"Pick Up_fee (IC)",   // ADDED FORMAT
		"Selisih",            // ADDED FORMAT
		"Keterangan Selisih", // ADDED FORMAT
		"Type Fee",           // ADDED FORMAT
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
		log.Printf("Failed to fetch data from lookup_processpof: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processpof", http.StatusInternalServerError)
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
			formatNumber(doc[" Publish Rate Cost "]),
			toString(doc["Mitra Code Genesis"]),
			formatNumber(doc["Pickup Fee"]),
			toString(doc["Ket"]),
			toString(doc["Pic"]),
			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			toString(doc["Last Status (Master Last Status) "]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Product (Master IC)"]),
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

// datafro
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVfro(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processfro")

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
		"Forward Rate Origin",
		"Ket",
		"Pic",
		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F", // ADDED FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"Cek STT Double", // ADDED FORMAT
		"Last Status (Master Last Status) ",
		"STT Updated Actor Name (Master Last Status)",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Forward Area Origin (Master IC)",
		"Destination (Master IC)",
		"Forward Area Destination (Master IC)",
		"T/F O/D", // ADDED FORMAT
		"Product (Master IC)",
		"Chargeable Weight (Master IC)",
		"T/F", // ADDED FORMAT
		"Forward Rate Origin (Master IC)",
		"Forward Rate Destination (Master IC)",
		"STTTypeFeeFixed (Master IC)",
		"Rate Odoo",                    //ADDED FORMAT
		"Rate Master (Master Forward)", //ADDED FORMAT
		"T/F",                          // ADDED FORMAT
		"Area (Master Forward)",        // ADDED FORMAT
		"Cek Intracity (1)",            // ADDED FORMAT
		"Cek Intracity (2)",            // ADDED FORMAT
		"Stt Chargeable Weight (Master BC)",
		"T/F", // ADDED FORMAT
		"Invoice/Number (Master BC)",
		"Forward Rate Origin_fee (IC)", // ADDED FORMAT
		"Selisih",                      // ADDED FORMAT
		"Keterangan Selisih",           // ADDED FORMAT
		"Type Fee",                     // ADDED FORMAT
		"STT Booked At (Master IC)",    //untuk testing nanti matikan
		"convertedDateFro",             //untuk testing nanti matikan
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
		log.Printf("Failed to fetch data from lookup_processfro: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processfro", http.StatusInternalServerError)
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
			formatNumber(doc["Forward Rate Origin"]),
			toString(doc["Ket"]),
			toString(doc["Pic"]),
			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			toString(doc["Cek STT Double"]), //Format Forward
			toString(doc["Last Status (Master Last Status) "]),
			toString(doc["STT Updated Actor Name (Master Last Status)"]),
			toString(doc["STT Booked At (Master IC )"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Forward Area Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			toString(doc["Forward Area Destination (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Product (Master IC)"]),
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Forward Rate Origin (Master IC)"]),
			toString(doc["Forward Rate Destination (Master IC)"]),
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Forward Area Rate (Master RF)"]), // tambahan akbar  Empty value for Additional Column 2
			"",                                      // Empty value for Additional Column 3
			toString(doc["Keterangan (Master RF)"]), // tambahan akbar Empty value for Additional Column 4
			"",                                      // Empty value for Additional Column 5
			"",                                      // Empty value for Additional Column 6
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			toString(doc["Invoice/Number (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
			toString(doc["STT Booked At (Master IC)"]), //untuk testing nanti matikan
			toString(doc["convertedDateFro"]),          //untuk testing nanti matikan
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

// datafrd
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVfrd(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processfrd")

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
		"Forward Rate Destination",
		"Ket",
		"Pic",
		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F", // ADDED FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"Cek STT Double", // ADDED FORMAT
		"Last Status (Master Last Status) ",
		"STT Updated Actor Name (Master Last Status)",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Forward Area Origin (Master IC)",
		"Destination (Master IC)",
		"Forward Area Destination (Master IC)",
		"T/F O/D", // ADDED FORMAT
		"Product (Master IC)",
		"Chargeable Weight (Master IC)",
		"T/F", // ADDED FORMAT
		"Forward Rate Origin (Master IC)",
		"Forward Rate Destination (Master IC)",
		"STTTypeFeeFixed (Master IC)",
		"Rate Odoo",                    //ADDED FORMAT
		"Rate Master (Master Forward)", //ADDED FORMAT
		"T/F",                          // ADDED FORMAT
		"Area (Master Forward)",        // ADDED FORMAT
		"Cek Intracity (1)",            // ADDED FORMAT
		"Cek Intracity (2)",            // ADDED FORMAT
		"Stt Chargeable Weight (Master BC)",
		"T/F", // ADDED FORMAT
		"Invoice/Number (Master BC)",
		"Forward Rate Destination_fee (IC)", // ADDED FORMAT
		"Selisih",                           // ADDED FORMAT
		"Keterangan Selisih",                // ADDED FORMAT
		"Type Fee",                          // ADDED FORMAT
		"STT Booked At (Master IC)",         //untuk testing nanti matikan
		"convertedDateFrd",                  //untuk testing nanti matikan
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
		log.Printf("Failed to fetch data from lookup_processfrd: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processfrd", http.StatusInternalServerError)
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
			formatNumber(doc[" Publish Rate Cost "]),
			toString(doc["Mitra Code Genesis"]),
			formatNumber(doc["Forward Rate Destination"]),
			toString(doc["Ket"]),
			toString(doc["Pic"]),
			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			toString(doc["Cek STT Double"]), //Format Forward
			toString(doc["Last Status (Master Last Status) "]),
			toString(doc["STT Updated Actor Name (Master Last Status)"]),
			toString(doc["STT Booked At (Master IC )"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Forward Area Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			toString(doc["Forward Area Destination (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Product (Master IC)"]),
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Forward Rate Origin (Master IC)"]),
			toString(doc["Forward Rate Destination (Master IC)"]),
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			"", // Empty value for Additional Column 1
			toString(doc["Forward Area Destination (Master RF)"]), // tambahan akbar  Empty value for Additional Column 2
			"",                                      // Empty value for Additional Column 3
			toString(doc["Keterangan (Master RF)"]), // tambahan akbar Empty value for Additional Column 4
			"",                                      // Empty value for Additional Column 5
			"",                                      // Empty value for Additional Column 6
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			toString(doc["Invoice/Number (Master BC)"]), // From masterbc_5
			"", // Empty value for Additional Column 1
			"", // Empty value for Additional Column 2
			"", // Empty value for Additional Column 3
			"", // Empty value for Additional Column 4
			toString(doc["STT Booked At (Master IC)"]), //untuk testing nanti matikan
			toString(doc["convertedDateFrd"]),          //untuk testing nanti matikan
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

// datadef
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVdef(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processdef")

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
		"Origin",
		"Destination",
		"Product",
		"Client Name",
		"Chargeable Weight",
		"Publish Rate Cost",
		"Mitra Code Genesis",
		"Delivery Fee",
		"Bonus",
		"Total Delivery Fee + Bonus Mitra",
		"Ket",
		"Pic",

		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"Kategori (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F",        // ADDED FORMAT
		"Cek Double", //ADDED FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Destination (Master IC)",
		"T/F", // ADDED FORMAT
		"Product (Master IC)",
		"T/F", // ADDED FORMAT
		"Chargeable Weight (Master IC)",
		"STTTypeFeeFixed (Master IC)",
		"PublishRateFeeFixed (Master IC)",
		"Starting Status (Master DTPOL)",
		"Updated By Partner (Master DTPOL)",
		"Delivery Fee Percentage (Master DTPOL)",
		"STT Type (Master DTPOL)",
		"Remarks (Master DTPOL)",
		"Publish Rate Cost (Master DTPOL)",
		"Chargeable Weight (Master DTPOL)",
		"Bonus/Pinalti (Master DTPOL)",
		"STT Ms/Mb",
		"Stt Chargeable Weight (Master BC)",
		"T/F", // ADDED FORMAT
		"Invoice/Number (Master BC)",
		"Rate Final",                //added format
		"T/F",                       // ADDED FORMAT
		"Ket. Rate Final",           //ADDED FORMAT
		"Delivery Fee Mitra (IC)",   // ADDED FORMAT
		"%Bonus",                    // ADDED FORMAT
		"Total Bonus (IC)",          // ADDED FORMAT
		"Delivery Fee + Bonus (IC)", // ADDED FORMAT
		"Selisih",                   // ADDED FORMAT
		"Keterangan Selisih",        // ADDED FORMAT
		"Lain-Lain",                 // ADDED FORMAT
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
		log.Printf("Failed to fetch data from lookup_processdef: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processdef", http.StatusInternalServerError)
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
			toString(doc["Origin"]),
			toString(doc["Destination"]),
			toString(doc["Product"]),
			toString(doc["Client Name"]),
			formatNumber(doc["Chargeable Weight"]),
			formatNumber(doc["Publish Rate Cost"]),
			toString(doc["Mitra Code Genesis"]),
			formatNumber(doc["Delivery Fee"]),
			formatNumber(doc["Bonus"]),
			formatNumber(doc["Total Delivery Fee + Bonus Mitra"]),
			toString(doc["Ket"]),
			toString(doc["Pic"]),

			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["Kategori (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // "T/F",        // ADDED FORMAT
			"", //"Cek Double", //ADDED FORMAT
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			"", //"T/F", // ADDED FORMAT
			toString(doc["Product (Master IC)"]),
			"", // "T/F", // ADDED FORMAT
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			formatNumber(doc["PublishRateFeeFixed (Master IC)"]),
			toString(doc["Starting Status (Master DTPOL)"]),
			toString(doc["Updated By Partner (Master DTPOL)"]),
			toString(doc["Delivery Fee Percentage (Master DTPOL)"]),
			toString(doc["STT Type (Master DTPOL)"]),
			toString(doc["Remarks (Master DTPOL)"]),
			formatNumber(doc["Publish Rate Cost (Master DTPOL)"]),
			formatNumber(doc["Chargeable Weight (Master DTPOL)"]),
			formatNumber(doc["Bonus/Pinalti (Master DTPOL)"]),
			"", // "STT Ms/Mb", //ADDED FORMAT
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]),
			"", // "T/F", // ADDED FORMAT
			toString(doc["Invoice/Number (Master BC)"]),
			"", //ADDED FORMAT
			"", //ADDED FORMAT
			"", // ADDED FORMAT
			"", //"Delivery Fee Mitra (IC)",   // ADDED FORMAT
			"", //"%Bonus",                    // ADDED FORMAT
			"", //"Total Bonus (IC)",          // ADDED FORMAT
			"", //"Delivery Fee + Bonus (IC)", // ADDED FORMAT
			"", //"Selisih",                   // ADDED FORMAT
			"", //"Keterangan Selisih",        // ADDED FORMAT
			"", //"Lain-Lain",                 // ADDED FORMAT
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

// datakdf
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVkdf(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processkdf")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{
		"balance_history_id",
		"courier_id",
		"balance_type",
		"balance_amount",
		"current_balance_amount",
		"transaction_type",
		"transaction_note",
		"bank_id",
		"bank_account_owner",
		"bank_account_number",
		"created_at",
		"T",
		"Type",

		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"Cek Double", // Added Format
		"Cek Double STT Dg Bulan Sebelumnya",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Destination (Master IC)",
		"Product (Master IC)",
		"Chargeable Weight (Master IC)",
		"COD Amount (Master IC)",
		"STTTypeFeeFixed (Master IC)",
		"Stt Chargeable Weight (Master BC)",
		"T/F", // Added Format
		"Invoice/Number (Master BC)",
		"KVP Delivery Fee",       // Added Format
		"KVP Cod Fee",            // Added Format
		"Total KVP Delivery Fee", // Added Format
		"Selisih",                // Added Format
		"Keterangan Selisih",     // Added Format
		"Lain-Lain",              // Added Format
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
		log.Printf("Failed to fetch data from lookup_processkdf: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processkdf", http.StatusInternalServerError)
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
			// Fee Format
			formatNumber(doc["balance_history_id"]),
			toString(doc["courier_id"]),
			toString(doc["balance_type"]),
			formatNumber(doc["balance_amount"]),
			formatNumber(doc["current_balance_amount"]),
			toString(doc["transaction_type"]),
			toString(doc["transaction_note"]),
			toString(doc["bank_id"]),
			toString(doc["bank_account_owner"]),
			toString(doc["bank_account_number"]),
			toString(doc["created_at"]),
			toString(doc["T"]),
			toString(doc["Type"]),

			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"",
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			toString(doc["Product (Master IC)"]),
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			formatNumber(doc["COD Amount (Master IC)"]),
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]),
			"",
			toString(doc["Invoice/Number (Master BC)"]),
			"",
			"",
			"",
			"",
			"",
			"",
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

// datakpf
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVkpf(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processkpf")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{
		"balance_history_id",
		"courier_id",
		"balance_type",
		"balance_amount",
		"current_balance_amount",
		"transaction_type",
		"transaction_note",
		"bank_id",
		"bank_account_owner",
		"bank_account_number",
		"created_at",
		"T",
		"Type",

		// Lookup fields
		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"Cek Double", // Added Format
		"Cek Double STT Dg Bulan Sebelumnya",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Destination (Master IC)",
		"Product (Master IC)",
		"Chargeable Weight (Master IC)",
		"COD Amount (Master IC)",
		"STTTypeFeeFixed (Master IC)",
		"Stt Chargeable Weight (Master BC)",
		"T/F", // Added Format
		"Invoice/Number (Master BC)",
		"KVP Pick Up Fee",       // Added Format
		"KVP Cod Fee",           // Added Format
		"Total KVP Pick Up Fee", // Added Format
		"Selisih",               // Added Format
		"Keterangan Selisih",    // Added Format
		"Lain-Lain",             // Added Format
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
		log.Printf("Failed to fetch data from lookup_processkpf: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processkpf", http.StatusInternalServerError)
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
			// Fee Format
			formatNumber(doc["balance_history_id"]),
			toString(doc["courier_id"]),
			toString(doc["balance_type"]),
			formatNumber(doc["balance_amount"]),
			formatNumber(doc["current_balance_amount"]),
			toString(doc["transaction_type"]),
			toString(doc["transaction_note"]),
			toString(doc["bank_id"]),
			toString(doc["bank_account_owner"]),
			toString(doc["bank_account_number"]),
			toString(doc["created_at"]),
			toString(doc["T"]),
			toString(doc["Type"]),

			// Lookup fields
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"",
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			toString(doc["Product (Master IC)"]),
			formatNumber(doc["Chargeable Weight (Master IC)"]),
			formatNumber(doc["COD Amount (Master IC)"]),
			formatNumber(doc["STTTypeFeeFixed (Master IC)"]),
			formatNumber(doc["Stt Chargeable Weight (Master BC)"]),
			"",
			toString(doc["Invoice/Number (Master BC)"]),
			"",
			"",
			"",
			"",
			"",
			"",
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

// datatft
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVtft(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processtft")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{

		"KodeSubConsol",
		"Mitra Code Genesis",
		"Bill",
		"STTNumbers",
		"Kode",
		"STTDate",
		"Origin",
		"Destination",
		"Berat",
		"RatePerKg",
		"Trucking(TUC)Fee",
		"Keterangan",
		"CreatedBy",
		"Type",

		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F", // ADD FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"Cek STT Double", // ADD FORMAT
		"Created At (Master MTUC)",
		"Rute (Master MTUC)",
		"T/F", // ADD FORMAT
		"Manifest Custom Gross Weight (Master MTUC)",
		"T/F", // ADD FORMAT
		"Truck Rate (Master RT)",
		"T/F", // ADD FORMAT
		"Trucking (TUC) Fee_IC",
		"Selisih",
		"Keterangan Selisih",
		"Lain-Lain",
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
		log.Printf("Failed to fetch data from lookup_processtft: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processtft", http.StatusInternalServerError)
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
			// Fee Format
			toString(doc["KodeSubConsol"]),
			toString(doc["Mitra Code Genesis"]),
			toString(doc["Bill"]),
			toString(doc["STTNumbers"]),
			toString(doc["Kode"]),
			toString(doc["STTDate"]),
			toString(doc["Origin"]),
			toString(doc["Destination"]),
			formatNumber(doc["Berat"]),
			formatNumber(doc["RatePerKg"]),
			formatNumber(doc["Trucking(TUC)Fee"]),
			toString(doc["Keterangan"]),
			toString(doc["CreatedBy"]),
			toString(doc["Type"]),

			// Master TFT Format
			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // ADD FORMAT
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			"", // ADD FORMAT
			toString(doc["Created At (Master MTUC)"]),
			toString(doc["Rute (Master MTUC)"]),
			"", // ADD FORMAT
			formatNumber(doc["Manifest Custom Gross Weight (Master MTUC)"]),
			"", // ADD FORMAT
			formatNumber(doc["Truck Rate (Master RT)"]),
			"", // ADD FORMAT
			"", // ADD FORMAT
			"", // ADD FORMAT
			"", // ADD FORMAT
			"", // ADD FORMAT
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

// ini lanjutan
// datatfs (Otw export Data TFS).
// ExportCSV streams the CSV data from the collection for efficient memory usage
func ExportCSVtfs(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=01 Konsolidator Outbound Fee (Bulan) 2024.csv")

	// Get the lookup_process collection
	collection := db.GetCollection("lookup_processtfs")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{
		// Fee Format
		"KodeSubConsol",
		"Mitra Code Genesis",
		"Bill",
		"STTNumbers",
		"Kode",
		"Rute",
		"STTDate",
		"Origin",
		"Destination",
		"Berat",
		"RatePerKg",
		"Trucking(STT)Fee",
		"Keterangan",
		"CreatedBy",
		"Type",

		"Nama Mitra (Master Mitra Name)",
		"3LC (Master Mitra Name)",
		"T/F", // ADD FORMAT
		"Cek Double STT Dg Bulan Sebelumnya",
		"Cek STT Double", // ADD FORMAT
		"Last Status (Master Last Status) ",
		"STT Booked At (Master IC)",
		"Client Name (Master IC)",
		"Origin (Master IC)",
		"Destination (Master IC)",
		"Gross Weight (Master IC)",
		"T/F", // ADD FORMAT
		"First AWB Number (Master IC)",
		"Last AWB Number (Master IC)",
		"Lag Route (Master IC)",
		"Lag Moda (Master IC)",
		"STTTypeFeeFixed (Master IC)",
		"Cek Trucking",
		"Rate Trucking (Master RT)",
		"T/F",                   // ADD FORMAT
		"Trucking (STT) Fee_IC", // ADD FORMAT
		"Selisih",               // ADD FORMAT
		"Keterangan Selisih",    // ADD FORMAT
		"Lain-Lain",             // ADD FORMAT
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
		log.Printf("Failed to fetch data from lookup_processtfs: %v", err)
		http.Error(w, "Failed to fetch data from lookup_processtfs", http.StatusInternalServerError)
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
			toString(doc["KodeSubConsol"]),
			toString(doc["Mitra Code Genesis"]),
			toString(doc["Bill"]),
			toString(doc["STTNumbers"]),
			toString(doc["Kode"]),
			toString(doc["Rute"]),
			toString(doc["STTDate"]),
			toString(doc["Origin"]),
			toString(doc["Destination"]),
			formatNumber(doc["Berat"]),
			formatNumber(doc["RatePerKg"]),
			formatNumber(doc["Trucking(STT)Fee"]),
			toString(doc["Keterangan"]),
			toString(doc["CreatedBy"]),
			toString(doc["Type"]),

			toString(doc["Nama Mitra (Master Mitra Name)"]),
			toString(doc["3LC (Master Mitra Name)"]),
			"", // ADD FORMAT
			toString(doc["Cek Double STT Dg Bulan Sebelumnya"]),
			"", // ADD FORMAT
			toString(doc["Last Status (Master LS)"]),
			toString(doc["STT Booked At (Master IC)"]),
			toString(doc["Client Name (Master IC)"]),
			toString(doc["Origin (Master IC)"]),
			toString(doc["Destination (Master IC)"]),
			toString(doc["Gross Weight (Master IC)"]),
			"", // ADD FORMAT
			toString(doc["First AWB Number (Master IC)"]),
			toString(doc["Last AWB Number (Master IC)"]),
			toString(doc["Lag Route (Master IC)"]),
			toString(doc["Lag Moda (Master IC)"]),
			toString(doc["STTTypeFeeFixed (Master IC)"]),
			"", // ADD FORMAT
			formatNumber(doc["Rate Trucking (Master RT)"]),
			"", // ADD FORMAT
			"", // ADD FORMAT
			"", // ADD FORMAT
			"", // ADD FORMAT
			"", // ADD FORMAT
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

// ExportCSVlogs streams the CSV data from the collection for efficient memory usage
func ExportCSVlogs(w http.ResponseWriter, r *http.Request) {
	// Set headers for CSV file download
	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment;filename=Last_Update_Logs.csv")

	// Define the mapping for collection names
	collectionNameMap := map[string]string{
		"datakof":      "Data Konsolidator Outbound Fee",
		"datakif":      "Data Konsolidator Inbound Fee",
		"datasof":      "Data Subkonsolidator Outbound Fee",
		"datasif":      "Data Subkonsolidator Inbound Fee",
		"datapof":      "Data Pick Up Posactive Fee (PUF)",
		"datafro":      "Data Forward Origin Fee",
		"datafrd":      "Data Forward Destination Fee",
		"datadef":      "Data Delivery Fee (DEF)",
		"datatfs":      "Data Trucking Fee (STT)",
		"datatft":      "Data Trucking Fee (TUC)",
		"datakpf":      "Data KVP Pick Up Fee (KPF)",
		"datakdf":      "Data KVP Delivery Fee (KDF)",
		"mastermn_1":   "Master Mitra Name",
		"masteric_2":   "Master IC",
		"masterls_3":   "Master Last Status",
		"mastertbs_4":  "TBS Konsolidator Outbound Fee",
		"mastertbs_41": "TBS Konsolidator Inbound Fee",
		"mastertbs_42": "TBS Subkonsolidator Outbound Fee",
		"mastertbs_43": "TBS Subkonsolidator Inbound Fee",
		"mastertbs_44": "TBS Pick Up Posactive Fee (PUF)",
		"mastertbs_45": "TBS Forward Origin Fee",
		"mastertbs_46": "TBS Forward Destination Fee",
		"mastertbs_47": "TBS Delivery Fee (DEF)",
		"mastertbs_48": "TBS Trucking Fee (STT)",
		"mastertbs_49": "TBS Trucking Fee (TUC)",
		"mastertbs_50": "TBS KVP Pick Up Fee (KPF)",
		"mastertbs_51": "TBS KVP Delivery Fee (KDF)",
		"masterbc_5":   "Master Berat Corp",
		"masterrg_6":   "Master Routing",
		"masterrf_7":   "Master Rate Forward",
		"masterrt_8":   "Master Rate Trucking",
		"masterdl_9":   "Master DTPL",
		"mastermt_10":  "Master MTUC",
	}

	// Get the update_logs collection
	collection := db.GetCollection("update_logs")

	// Initialize CSV writer
	csvWriter := csv.NewWriter(w)
	defer csvWriter.Flush()

	// Define headers
	headers := []string{
		"Tanggal dan Jam",
		"Nama Collection",
		"Action",
		"Jumlah Data Upload",
		"Data Yang Sudah Ada",
		"Data Duplicate",
		"Data Diinsert",
		"Hasil Akhir",
		"Upload By User",
		"Status",
		"Error Message",
		"Month",
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
		log.Printf("Failed to fetch data from update_logs: %v", err)
		http.Error(w, "Failed to fetch data from update_logs", http.StatusInternalServerError)
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

		// // Format uploaded_at and last_updated fields
		// uploadedAt := formatDate(doc["uploaded_at"])
		// lastUpdated := formatDate(doc["last_updated"])

		// Map the collection_name using the predefined mapping
		collectionNameKey := toString(doc["collection_name"])
		collectionName := collectionNameMap[collectionNameKey]
		if collectionName == "" {
			collectionName = collectionNameKey // Fallback to the original key if no mapping exists
		}

		// Map fields from the document to match headers
		row := []string{
			// Fee Format
			formatDateForCSV(toString(doc["uploaded_at"])),
			collectionName,
			"Upload CSV",
			toString(doc["csv_total_count"]),
			toString(doc["data_before"]),
			toString(doc["duplicate_count"]),
			toString(doc["record_count"]),
			toString(doc["data_after"]),
			toString(doc["uploaded_by"]),
			toString(doc["status"]),
			toString(doc["error_message"]),
			toString(doc["month"]), //aktifkan nanti ini
		}

		// Stream row to CSV
		if err := csvWriter.Write(row); err != nil {
			log.Printf("Failed to write CSV row: %v", err)
			http.Error(w, "Failed to write CSV row", http.StatusInternalServerError)
			return
		}
	}

	// Check for errors in the cursor
	if err := cursor.Err(); err != nil {
		log.Printf("Cursor error: %v", err)
		http.Error(w, "Failed to process data", http.StatusInternalServerError)
		return
	}

	log.Println("CSV export completed successfully")
}

// formatDateForCSV formats the date string or timestamp to the desired format for CSV output
func formatDateForCSV(dateString string) string {
	// Try parsing as a Unix timestamp
	if timestamp, err := strconv.ParseFloat(dateString, 64); err == nil {
		// Convert the Unix timestamp (in milliseconds) to time.Time
		t := time.UnixMilli(int64(timestamp))
		return t.Format("01/02/06, 03:04:05 PM")
	}

	// If it's not a Unix timestamp, try parsing as an ISO 8601 string
	const layout = "2006-01-02T15:04:05.000Z"
	parsedTime, err := time.Parse(layout, dateString)
	if err != nil {
		return "Invalid Date"
	}
	return parsedTime.Format("01/02/06, 03:04:05 PM")
}
