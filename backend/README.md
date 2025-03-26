# Lookup Project Backend

This project is a backend service for managing and processing data using MongoDB. It includes features for uploading, processing, and exporting data in CSV format, as well as performing lookups and aggregations.

## Features

- MongoDB integration for data storage and retrieval.
- CSV upload and validation.
- Data processing with aggregation pipelines.
- Export processed data to CSV.
- User authentication and access control.
- Lookup and save operations for various collections.

## Project Structure

```
backend/
├── configs/         # Configuration files
│   └── config.go    # MongoDB connection setup
├── db/              # Database connection
│   └── mongo.go     # MongoDB client initialization
├── handlers/        # HTTP handlers for various endpoints
│   ├── exportCSV.go # Handlers for exporting data to CSV
│   ├── handler.go   # Core handlers for login, upload, and lookup
├── models/          # Data models for MongoDB collections
│   └── record.go    # Placeholder for data models
├── routes/          # API route definitions
│   └── api.go       # Placeholder for route setup
└── main.go          # Application entry point
```

## Setup

### Prerequisites

- Go 1.18 or later
- MongoDB instance
- `.env` file with the following variables:
  ```
  MONGODB_URI=<your-mongodb-uri>
  MONGODB_DATABASE=<your-database-name>
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lookupproject
   ```

2. Create a `.env` file in the `backend` directory:
   ```bash
   touch backend/.env
   ```

3. Add your MongoDB connection details to the `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DATABASE=your_database_name
   ```

4. Install dependencies:
   ```bash
   go mod tidy
   ```

### Running the Application

1. Start the application:
   ```bash
   go run backend/main.go
   ```

2. The server will start on the default port (e.g., `http://localhost:8080`).

### API Endpoints

- **Login**: `/login` (POST)
- **Upload Data**: `/upload` (POST)
- **Export CSV**: `/export` (GET)
- **Lookup and Save**: `/lookup` (POST)

Refer to the `handlers` directory for detailed implementation of each endpoint.

## Development

### Adding New Collections

1. Define the collection structure in `models/record.go`.
2. Update `collectionStructs` in `handlers/handler.go` to include the new collection.
3. Add any specific logic for the collection in the relevant handler.

### Running Tests

To be implemented.

## Deployment

1. Build the application:
   ```bash
   go build -o backend/main backend/main.go
   ```

2. Deploy the binary and `.env` file to your server.

## Notes

- Ensure the `.env` file is not pushed to version control. Add it to `.gitignore`:
  ```
  backend/.env
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.