# Music-App

A full-stack web application built using the MERN stack for music streaming. Users can explore songs, artists, and albums, create favorite song lists, and access detailed information. Admins have the ability to manage the music library and user roles.

## Features

- **Music Streaming**: Stream music directly from the app.
- **Favorite Lists**: Users can create and manage their list of favorite songs.
- **Song/Artist/Album Information**: Detailed info on songs, artists, and albums.
- **Admin Functionality**: Admins can add or remove songs and change user roles.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **State Management**: Redux (if applicable)
- **Deployment**: [Render](https://render.com)

## Demo

Check out the live application here: [Music-App](https://musicapp-7k4i.onrender.com/)

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB (local or Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/aashiyatanwar/music-app.git
   cd music-app

2. Backend Setup:

    - Navigate to the backend folder: cd server
    - Create a .env file and add the following variables
        ```bash
        DB_STRING = your-mongodb-connection-string

    - Run : npm install && npm run dev

3. Frontend Setup:

   - Navigate to the frontend folder: cd client
   - Create a .env file and add Firebase configurations:
        ```bash
        REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
        REACT_APP_FIREBASE_PROJECT_ID=your-project-id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        REACT_APP_FIREBASE_APP_ID=your-app-id
    - Run : npm install && npm start







