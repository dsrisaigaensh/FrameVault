# FrameVault

A simple album-sharing web application built with React JS and JSON Server.

## Features

- User authentication (demo login)
- Create and manage photo albums
- Upload photos to albums
- Generate shareable links for albums
- View shared albums via tokenized links

## Tech Stack

- React JS (JavaScript only)
- React Router DOM
- Axios
- JSON Server (mock backend)
- Vite

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

You need to run **two terminals** simultaneously:

### Terminal 1 - Start JSON Server (Backend)
```bash
npm run server
```
This will start the JSON Server on `http://localhost:4000`

### Terminal 2 - Start Vite Dev Server (Frontend)
```bash
npm run dev
```
This will start the React app on `http://localhost:5173`

## Demo Credentials

- **Email:** demo@framevault.test
- **Password:** demo

## Project Structure

```
framevault/
├── db.json                 # JSON Server database
├── src/
│   ├── api/
│   │   └── api.js         # API helper functions
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── AlbumCard.jsx
│   │   ├── AlbumGallery.jsx
│   │   └── PhotoUploader.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AlbumView.jsx
│   │   ├── ShareView.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /users` - Get all users
- `GET /albums` - Get all albums
- `GET /albums/:id` - Get specific album
- `POST /albums` - Create new album
- `DELETE /albums/:id` - Delete album
- `GET /photos` - Get all photos
- `POST /photos` - Upload photo
- `GET /shares` - Get all shares
- `POST /shares` - Create share link

## Usage

1. Login with demo credentials
2. Create a new album from the dashboard
3. Click on an album to view it
4. Upload photos to the album
5. Generate a share link to share the album with others
6. Share the link (e.g., `http://localhost:5173/s/abc123xyz`)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.
