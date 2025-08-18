# Whiteboard App

## Overview
The Whiteboard App is a real-time collaborative web-based whiteboard application that allows multiple users to draw and share their ideas seamlessly. Built using the Canvas API, Socket.io for real-time communication, and a Node.js/Express backend with MongoDB for data persistence, this application provides an interactive platform for creativity and collaboration.

## Features
- Real-time drawing capabilities for multiple users
- User-friendly interface with a responsive design
- Persistent storage of drawings using MongoDB
- Easy setup and deployment

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, Canvas API
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io
- **Database**: MongoDB

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running

### Steps
1. Clone the repository:
   ```
   git clone <repository-url>
   cd whiteboard-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB database and update the connection string in `src/server/app.js`.

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the whiteboard.

## Usage
- Once the application is running, multiple users can join the same whiteboard session.
- Users can draw on the canvas using their mouse or touch devices.
- All drawings are synchronized in real-time across all connected clients.

## Deployment
For deployment, consider using services like Heroku, DigitalOcean, or any cloud provider that supports Node.js applications. Ensure your MongoDB connection string is updated for the production environment.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.# Shared-whiteboard
