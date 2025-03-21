# Frontend Project

This project is a frontend application for interacting with the backend service. It provides a user interface for login, data upload, and data processing operations.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Configuration

Create a `.env` file in the root directory with the following content:
```properties
NEXT_PUBLIC_API_URL=http://localhost:3000
```

- **NEXT_PUBLIC_API_URL**: The URL of the backend API.

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## License

This project is licensed under the MIT License.