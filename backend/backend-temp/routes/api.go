package routes

import (
	"backend/handlers"
	"net/http"
)

// CORS middleware function

func withCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Update as needed
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		// Allow credentials if required (e.g., cookies, auth tokens)
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		h.ServeHTTP(w, r)
	}
}

// SSE middleware function
func withSSE(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")
		h.ServeHTTP(w, r)
	}
}

// RegisterRoutes registers API routes
func RegisterRoutes() {
	http.HandleFunc("/api/login", withCORS(handlers.Login))                                 //API LOGIN
	http.HandleFunc("/api/subpages", withCORS(handlers.GetSubpages))                        //API SUBPAGE ACCESS
	http.HandleFunc("/api/countCollections", withCORS(handlers.CountCollections))           //API COUNT COLLECTION
	http.HandleFunc("/api/getUpdateLogs", withCORS(handlers.GetUpdateLogs))                 //API GET LAST UPDATE INFORMATION
	http.HandleFunc("/api/uploadData", withCORS(handlers.UploadData))                       // API FOR UPLOAD DATA
	http.HandleFunc("/api/fetchHeadersAndExport", withCORS(handlers.FetchHeadersAndExport)) //FETCH HEADER
	http.HandleFunc("/api/lookupAndSave", withCORS(withSSE(handlers.LookupAndSave)))
	http.HandleFunc("/api/lookupAndSavekif", withCORS(withSSE(handlers.LookupAndSavekif)))
	http.HandleFunc("/api/lookupAndSavesif", withCORS(withSSE(handlers.LookupAndSavesif)))
	http.HandleFunc("/api/lookupAndSavesof", withCORS(withSSE(handlers.LookupAndSavesof)))
	http.HandleFunc("/api/lookupAndSavepof", withCORS(withSSE(handlers.LookupAndSavepof)))
	http.HandleFunc("/api/lookupAndSavefro", withCORS(withSSE(handlers.LookupAndSavefro)))
	http.HandleFunc("/api/lookupAndSavefrd", withCORS(withSSE(handlers.LookupAndSavefrd)))
	http.HandleFunc("/api/lookupAndSavedef", withCORS(withSSE(handlers.LookupAndSavedef)))
	http.HandleFunc("/api/lookupAndSavekdf", withCORS(withSSE(handlers.LookupAndSavekdf)))
	http.HandleFunc("/api/lookupAndSavekpf", withCORS(withSSE(handlers.LookupAndSavekpf)))
	http.HandleFunc("/api/lookupAndSavetfs", withCORS(withSSE(handlers.LookupAndSavetfs)))
	http.HandleFunc("/api/lookupAndSavetft", withCORS(withSSE(handlers.LookupAndSavetft)))
	http.HandleFunc("/api/exportCSV", withCORS(handlers.ExportCSV))
	http.HandleFunc("/api/exportCSVkif", withCORS(handlers.ExportCSVkif))
	http.HandleFunc("/api/exportCSVsif", withCORS(handlers.ExportCSVsif))
	http.HandleFunc("/api/exportCSVsof", withCORS(handlers.ExportCSVsof))
	http.HandleFunc("/api/exportCSVpof", withCORS(handlers.ExportCSVpof))
	http.HandleFunc("/api/exportCSVfro", withCORS(handlers.ExportCSVfro))
	http.HandleFunc("/api/exportCSVfrd", withCORS(handlers.ExportCSVfrd))
	http.HandleFunc("/api/exportCSVdef", withCORS(handlers.ExportCSVdef))
	http.HandleFunc("/api/exportCSVkdf", withCORS(handlers.ExportCSVkdf))
	http.HandleFunc("/api/exportCSVkpf", withCORS(handlers.ExportCSVkpf))
	http.HandleFunc("/api/exportCSVtfs", withCORS(handlers.ExportCSVtfs))
	http.HandleFunc("/api/exportCSVtft", withCORS(handlers.ExportCSVtft))
	http.HandleFunc("/api/exportCSVlogs", withCORS(handlers.ExportCSVlogs))
	http.HandleFunc("/api/getUploadLogs", withCORS(handlers.GetUploadLogs))
	http.HandleFunc("/api/saveDateRange", withCORS(handlers.SaveDateRange)) // Add this line

	// http.HandleFunc("/api/saveDateRange", withCORS(handlers.SaveDateRange)) // Add this line
	// API handler routes Before
	// http.HandleFunc("/api/login", withCORS(handlers.Login))                                 //API LOGIN
	// http.HandleFunc("/api/subpages", withCORS(handlers.GetSubpages))                        //API SUBPAGE ACCESS
	// http.HandleFunc("/api/countCollections", withCORS(handlers.CountCollections))           //API COUNT COLLECTION
	// http.HandleFunc("/api/getUpdateLogs", withCORS(handlers.GetUpdateLogs))                 //API GET LAST UPDATE INFORMATION
	// http.HandleFunc("/api/uploadData", withCORS(handlers.UploadData))                       // API FOR UPLOAD DATA
	// http.HandleFunc("/api/fetchHeadersAndExport", withCORS(handlers.FetchHeadersAndExport)) //FETCH HEADER
	// http.HandleFunc("/api/lookupAndSave", withCORS(withSSE(handlers.LookupAndSave)))
	// http.HandleFunc("/api/lookupAndSavekif", withCORS(withSSE(handlers.LookupAndSavekif)))
	// http.HandleFunc("/api/lookupAndSavesif", withCORS(withSSE(handlers.LookupAndSavesif)))
	// http.HandleFunc("/api/lookupAndSavesof", withCORS(withSSE(handlers.LookupAndSavesof)))
	// http.HandleFunc("/api/lookupAndSavepof", withCORS(withSSE(handlers.LookupAndSavepof)))
	// http.HandleFunc("/api/exportCSV", withCORS(handlers.ExportCSV))
	// http.HandleFunc("/api/exportCSVkif", withCORS(handlers.ExportCSVkif))
	// http.HandleFunc("/api/exportCSVsif", withCORS(handlers.ExportCSVsif))
	// http.HandleFunc("/api/exportCSVsof", withCORS(handlers.ExportCSVsof))
	// http.HandleFunc("/api/exportCSVpof", withCORS(handlers.ExportCSVpof))
	// http.HandleFunc("/api/getUploadLogs", withCORS(handlers.GetUploadLogs))

	// // Admin handler routes
	// http.HandleFunc("/api/users", withCORS(handlers.GetUsers))          // Get all users
	// http.HandleFunc("/api/users/add", withCORS(handlers.AddUser))       // Add a new user
	// http.HandleFunc("/api/users/delete", withCORS(handlers.DeleteUser)) // Delete a user by ID
	// http.HandleFunc("/api/users/update", withCORS(handlers.UpdateUser)) // Update a user by ID
}
