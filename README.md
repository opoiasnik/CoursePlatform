# Course Platform

Modern online course platform built with React, TypeScript, and Redux Toolkit.

## Features

- **Course Catalog**: Browse available courses with detailed descriptions
- **Video Streaming**: HTML5 video player with modal interface
- **User Authentication**: Login/Register with form validation
- **Purchase System**: Mock purchase functionality with state management
- **Responsive Design**: Mobile-first responsive interface
- **State Management**: Redux Toolkit for global state

## Tech Stack

- React 18 + TypeScript
- Redux Toolkit for state management
- Vite for development and building
- CSS3 with modern features
- HTML5 video for streaming

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Auth/          # Authentication forms and modals
│   ├── Course/        # Course listing and cards
│   ├── Header/        # Main navigation
│   └── Video/         # Video player modal
├── store/
│   └── slices/        # Redux slices
├── types/             # TypeScript definitions
├── utils/             # Utility functions
├── api/               # Mock API
└── styles/            # CSS styles
```

## Key Features Implemented

### Authentication
- Email and password validation
- Secure form handling with TypeScript
- Persistent login state in localStorage
- Password requirements: min 6 chars, uppercase, lowercase, special character

### Course Management
- Dynamic course loading with mock API
- Purchase tracking and state persistence
- Video access control based on purchase status
- Error handling and loading states

### Video Player
- HTML5 video with custom controls
- Modal interface for immersive viewing
- Support for MP4 and HLS streams
- Responsive video container

### State Management
- Redux Toolkit for efficient state management
- Async thunks for API calls
- Persistent data in localStorage
- Error handling and loading states
