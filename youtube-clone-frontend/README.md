# YouTube Clone Frontend

A React-based YouTube clone with authentication and channel management features.

## Features

### Authentication
- User sign up with avatar upload
- User sign in with email/password
- Persistent authentication using localStorage
- Automatic token management
- Sign out functionality

### Channel Management
- Create custom channels with name, description, and banner
- View channel information
- Automatic channel detection for signed-in users
- Channel creation modal

### UI Features
- Responsive header with authentication state
- Loading states during authentication
- User avatar display
- Channel dropdown menu
- Modern YouTube-like design

## Authentication Flow

1. **Sign Up**: Users can create accounts with username, email, password, and avatar
2. **Sign In**: Users authenticate with their credentials
3. **Persistent Session**: Authentication state is maintained across browser sessions
4. **Channel Detection**: System automatically checks if user has a channel
5. **Channel Creation**: Users without channels can create one through the UI

## Channel Features

- **Channel Creation**: Users can create channels with custom names, descriptions, and banners
- **Channel Viewing**: Users can view their channel information
- **Unique Channel Names**: System prevents duplicate channel names
- **Automatic Updates**: Channel data refreshes automatically after creation

## Technical Implementation

### AuthContext
- Manages global authentication state
- Handles localStorage persistence
- Provides authentication functions
- Manages channel data fetching

### Components
- **Header**: Displays authentication state and channel options
- **SignIn/SignUp**: Authentication forms
- **CreateChannel**: Channel creation modal
- **Loading States**: Proper loading indicators during async operations

### Backend Integration
- JWT-based authentication
- RESTful API endpoints
- Proper error handling
- CORS configuration

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Ensure the backend server is running on port 4000
4. Open http://localhost:5173 in your browser

## Testing the Authentication Flow

1. **Sign Up**: Create a new account with avatar
2. **Sign In**: Use your credentials to sign in
3. **Check Header**: Verify the user avatar appears instead of "Sign In"
4. **Channel Options**: Click the avatar to see channel options
5. **Create Channel**: If no channel exists, create one
6. **View Channel**: After creation, you should see "View Channel" option
7. **Sign Out**: Test the sign out functionality

## File Structure

```
src/
├── utils/
│   └── authContext.jsx          # Authentication context
├── component/
│   ├── header/
│   │   ├── Header.jsx           # Main header component
│   │   └── Header.css
│   └── createChannel/
│       ├── CreateChannel.jsx    # Channel creation modal
│       └── CreateChannel.css
└── pages/
    ├── signIn/
    │   ├── SignIn.jsx           # Sign in form
    │   └── SignIn.css
    └── signUp/
        ├── SignUp.jsx           # Sign up form
        └── SignUp.css
```
