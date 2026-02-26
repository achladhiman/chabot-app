# Chatbot Application

This repository contains a chatbot application with a backend built using Node.js and Express, and a frontend built using Angular.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_generative_ai_api_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`.

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

   The frontend will run on `http://localhost:4200`.

## Notes

- Ensure MongoDB is running locally or provide a valid connection string in the `.env` file.
- Replace `your_google_generative_ai_api_key` with your actual API key for Google Generative AI.
- Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

## License

This project is licensed under the MIT License.