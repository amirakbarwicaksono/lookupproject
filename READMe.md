# LookupProject

This project consists of a backend service and a frontend application for managing and processing data related to user login, data lookup, and data processing for various collections.

## Table of Contents

- [Backend](#backend)
  - [Installation](#backend-installation)
  - [Configuration](#backend-configuration)
  - [Endpoints](#backend-endpoints)
  - [Data Models](#backend-data-models)
  - [Usage](#backend-usage)
- [Frontend](#frontend)
  - [Installation](#frontend-installation)
  - [Configuration](#frontend-configuration)
  - [Usage](#frontend-usage)
  - [Project Structure](#frontend-project-structure)
  - [Available Scripts](#frontend-available-scripts)
  - [Screenshots](#frontend-screenshots)
- [License](#license)

## Backend

### Backend Installation

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

### Backend Configuration

- **MONGODB_URI**: The URI for connecting to your MongoDB instance.
- **MONGODB_DATABASE**: The name of the MongoDB database to use.
- **JWT_SECRET**: The secret key for JWT token generation (if used).

### Backend Endpoints

#### User Authentication

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

#### Data Operations

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

### Backend Data Models

The project uses several data models to represent different collections. These models are defined in the `models` package.

#### Example Model

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

### Backend Usage

1. Start the server:
    ```sh
    go run main.go
    ```

2. Use the provided endpoints to interact with the backend service.

## Frontend

### Frontend Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Frontend Configuration

Create a `.env` file in the root directory with the following content:
```properties
NEXT_PUBLIC_API_URL=http://localhost:3000
```

- **NEXT_PUBLIC_API_URL**: The URL of the backend API.

### Frontend Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### Frontend Project Structure

The project structure is as follows:

```
frontend/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── SubpageGuard.tsx
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ...
│   ├── dashboard/ 
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── log-history/
│   │   └── page.tsx
│   ├── report/
│   │   └── page.tsx
│   ├── upload/
│   │   └── page.tsx
│   ├── globals.css
│   └── ...
├── public/
│   ├── logo.webp
│   └── ...
├── .env
├── package.json
└── README.md
```

### Frontend Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Frontend Screenshots

Here are some screenshots of the frontend application:

#### Login Page
![Login Page](path/to/login-screenshot.png)

#### Dashboard
![Dashboard](path/to/dashboard-screenshot.png)

#### Upload Page
![Upload Page](path/to/upload-screenshot.png)

#### Log History Page
![Log History Page](path/to/log-history-screenshot.png)

## License

This project is licensed under the MIT License.