# Backend Project

This project is a backend service for managing and processing data related to user login, data lookup, and data processing for various collections. It uses MongoDB as the database and provides several endpoints for data operations.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Usage](#usage)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd backend
    ```

2. Install dependencies:
    ```sh
    go mod tidy
    ```

3. Create a `.env` file in the root directory with the following content:
    ```properties
    MONGODB_URI=mongodb://<your-mongodb-uri>
    MONGODB_DATABASE=<your-database-name>
    JWT_SECRET=your_secret_key
    ```

## Configuration

- **MONGODB_URI**: The URI for connecting to your MongoDB instance.
- **MONGODB_DATABASE**: The name of the MongoDB database to use.
- **JWT_SECRET**: The secret key for JWT token generation (if used).

## Endpoints

### User Authentication

- **POST /login**: Authenticate a user.
    - Request Body:
        ```json
        {
            "username": "user",
            "password": "password"
        }
        ```
    - Response:
        ```json
        {
            "success": true,
            "message": "Login successful",
            "access": ["access1", "access2"],
            "keyword": ["keyword1", "keyword2"]
        }
        ```

### Data Operations

- **POST /upload**: Upload data to a specified collection.
    - Query Parameters:
        - `collection`: The name of the collection.
        - `username`: The username of the uploader.
        - `month`: The month of the data.
    - Form Data:
        - `file`: The CSV file to upload.

- **GET /count-collections**: Get the document count for all specified collections.

- **GET /update-logs**: Get the latest update logs for all specified collections.

- **POST /lookup-and-save**: Perform a lookup and save operation for data processing.

- **GET /export-csv**: Export data from the `lookup_process` collection to a CSV file.

## Data Models

The project uses several data models to represent different collections. These models are defined in the `models` package.

### Example Model

```go
type Datafro struct {
    SttNo             string          `bson:"STT No"`
    Kode              string          `bson:"Kode"`
    Bill              string          `bson:"Bill"`
    BookedDate        string          `bson:"Stt Booked Date"`
    PodDate           string          `bson:"Stt Pod Date"`
    LagRoute          string          `bson:"Lag Route"`
    Origin            string          `bson:"Origin"`
    Destination       string          `bson:"Destination"`
    Product           string          `bson:"Product"`
    ClientName        string          `bson:"Client Name"`
    ChargeableWeight  decimal.Decimal `bson:"Chargeable Weight"`
    PublishRateCost   decimal.Decimal `bson:"Publish Rate Cost"`
    MitraCodeGenesis  string          `bson:"Mitra Code Genesis"`
    ForwardrateOrigin decimal.Decimal `bson:"Forward Rate Origin"`
    Ket               string          `bson:"Ket"`
    Pic               string          `bson:"Pic"`
}
```

## Usage

1. Start the server:
    ```sh
    go run main.go
    ```

2. Use the provided endpoints to interact with the backend service.

## License

This project is licensed under the MIT License.