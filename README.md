# URL Shortener API

A lightweight URL Shortener API built with **Node.js**, **Express**, and **MongoDB**. It allows users to shorten long URLs and resolve them back to the original URLs. The API is structured using the **MVC (Model-View-Controller)** design pattern for maintainability and scalability.

## Features

- **URL Shortening**: Shorten long URLs into short, manageable links.
- **URL Resolution**: Retrieve the original URL by providing a short URL.
- **Logging**: Monitors and logs API requests and errors.
- **MongoDB**: Stores URLs and their corresponding short IDs in a MongoDB database.

## Project Structure

The API follows the **MVC architecture**:

- **Model**: Defines data schema and manages database operations.
- **View**: Not applicable here, as it's a backend API; the response is considered the "view".
- **Controller**: Contains business logic and handles interactions with the model.

### File Breakdown:

- **`app.js`**: Main entry point; configures middleware and routes.
- **`controllers/url.controller.js`**: Handles URL shortening and resolution.
- **`models/url.model.js`**: Defines the schema for storing URLs and short IDs.
- **`routes/urls.route.js`**: Maps API routes to controller actions.
- **`support_functions/logger.js`**: Handles logging of API actions and errors.
- **`database_config.js`**: Configures the MongoDB connection.

## Setup Instructions

### Prerequisites

- **Node.js** and **npm** installed.
- A running **MongoDB** instance (local or cloud).

### Environment Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/daksh-deep/URL-Shortener
    cd url-shortener
    ```

2. Create a `.env` file in the root directory with the following values:
    ```env
    DATABASE_URL = "mongodb://127.0.0.1:27017/URL-Shortner"
    PORT = 5000
    LOG_FILE = "./logs/logs.log"
    ```

### Installation

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the server:
    ```bash
    npx nodemon
    ```

## API Endpoints

### 1. `POST /url`
Shorten a URL.

- **Request Body**:
    ```json
    { "url": "https://www.github.com" }
    ```

- **Response**:
    ```json
    {
      "message": "Short URL created successfully",
      "shortid": "ZtlFVJ5s9",
      "originalUrl": "https://www.github.com",
      "shortUrl": "http://localhost:5000/url/ZtlFVJ5s9"
    }
    ```

### 2. `GET /url/:shortid`
Resolve a short URL to its original URL.

- **URL Parameter**: `shortid` (The unique short ID).
- **Response**: Redirects (301) to the original URL.

## Dependencies

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling.
- **shortid**: Generates unique short IDs.
- **dotenv**: Loads environment variables.

## Logging

The API includes a logging system that tracks requests and errors:

- **INFO**: Tracks successful operations.
- **ERROR**: Logs when issues occur, stored in the `logs.log` file.

## License

This project is open-source and available under the **MIT License**.
