# Authentication System

This project implements a hybrid authentication system using Universitas Indonesia SSO (CAS) for identity verification and custom session management.

## Overview

- **Identity Provider**: UI SSO (CAS 2.0)
- **Session Management**: Custom Implementation (HttpOnly Cookies)
- **Frontend Framework**: Next.js with React Context API

## Setup

1. **Environment Variables**

   Copy `.env.local.example` to `.env.local` and configure:

   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

2. **Backend Requirements**

   Ensure your backend server is running and has the following endpoints configured:

   - `GET /auth/sso` - SSO login initiation
   - `GET /auth/session` - Get current user session
   - `POST /auth/logout` - Logout endpoint

## Architecture

### Components

1. **AuthContext** (`/src/contexts/AuthContext.tsx`)

   - Manages global authentication state
   - Provides login, logout, and session checking functions
   - Handles loading states and error management

2. **Authentication API** (`/src/lib/auth.ts`)

   - Contains API calls to backend authentication endpoints
   - Handles session management with HttpOnly cookies
   - Provides error handling and response parsing

3. **Auth Hooks** (`/src/hooks/useAuth.ts`)

   - `useRequireAuth`: Protects routes requiring authentication
   - `useRedirectIfAuth`: Redirects authenticated users from public pages

4. **Middleware** (`/middleware.ts`)
   - Server-side route protection
   - Automatic redirects based on authentication status
   - Handles cookie-based session validation

### Authentication Flow

1. User clicks "Login" button
2. Frontend redirects browser to backend `/auth/sso` endpoint
3. Backend redirects to UI SSO login page
4. User authenticates with UI credentials
5. UI SSO redirects back to backend with ticket
6. Backend validates ticket and creates session
7. Backend sets `session_token` HttpOnly cookie
8. Backend redirects user to frontend dashboard
9. Frontend receives user and maintains session state

### Route Protection

- **Protected Routes**: `/dashboard`, `/profile`, `/applications`
- **Public Routes**: `/`, `/login`
- **Middleware**: Automatically redirects based on authentication status

## Usage Examples

### Login Component

```tsx
import { useAuth } from "@/contexts/AuthContext";

const LoginComponent = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login("/dashboard"); // Redirect to dashboard after login
  };

  return <button onClick={handleLogin}>Login with UI SSO</button>;
};
```

### Protected Route

```tsx
import { useRequireAuth } from "@/hooks/useAuth";

const ProtectedPage = () => {
  const { user, isLoading } = useRequireAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null; // Will redirect to login

  return <div>Protected content for {user.name}</div>;
};
```

### Navbar with Auth State

```tsx
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, logout, isLoading } = useAuth();

  return (
    <nav>
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
};
```

## API Reference

### AuthContext Methods

- `login(redirectPath?: string)`: Initiates SSO login flow
- `logout()`: Destroys session and redirects to home
- `checkAuth()`: Validates current session
- `user`: Current user object or null
- `isLoading`: Authentication loading state

### User Object Structure

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  npm: string | null;
  organizationalCode: string | null;
  studyProgram: string | null;
  faculty: string | null;
  year: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Security Considerations

- Sessions are managed via HttpOnly cookies (cannot be accessed by JavaScript)
- Automatic session validation on protected routes
- CORS configuration required on backend
- SameSite cookie policy for development environment
- Token-based session management with automatic cleanup

## Development Notes

- Ensure backend CORS allows your frontend domain
- Use `credentials: 'include'` for all authenticated API calls
- Session cookies are automatically handled by the browser
- Middleware provides server-side protection before page loads
- Context API provides client-side state management after hydration
