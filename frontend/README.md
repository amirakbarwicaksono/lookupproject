# Frontend Project - Lookup Project

This is the frontend application for the Lookup Project, built using **Next.js** and **TypeScript**. It provides a user interface for managing data collections, uploading files, and viewing logs.

## Features

- **Authentication**: Login functionality with role-based access control.
- **Dashboard**: Displays available subpages based on user permissions.
- **File Upload**: Upload CSV files to specific collections with validation.
- **Log History**: View and export upload logs.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Context API

## Environment Variables

The following environment variables are required:

| Variable Name          | Description                          |
|------------------------|--------------------------------------|
| `NEXT_PUBLIC_API_URL`  | Base URL for the backend API.        |

Create a `.env.local` file in the `frontend` directory and add the required variables.

Example:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.

## Folder Structure

- **`pages`**: Contains Next.js pages.
- **`app`**: Contains application-specific components and logic.
- **`styles`**: Global CSS and Tailwind configuration.
- **`components`**: Reusable UI components.
- **`context`**: Context API for state management.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
