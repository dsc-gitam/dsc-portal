# Cloud Study Jams Registration - Deployment Guide

This document provides instructions for deploying the Cloud Study Jams registration feature with database support.

## Database Setup

This project uses Prisma ORM which is compatible with Supabase PostgreSQL. Follow these steps to set up your database:

### 1. Set up Supabase (or any PostgreSQL database)

1. Create a project at [supabase.com](https://supabase.com)
2. Get your database connection string from Project Settings > Database
3. The connection string format is: `postgresql://[user]:[password]@[host]:[port]/[database]?pgbouncer=true`

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="your-supabase-connection-string"

# NextAuth Configuration (if not already set)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth Credentials (if not already set)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Run Database Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npx prisma migrate deploy

# Or for development
npx prisma migrate dev
```

## Features

The Cloud Study Jams registration includes:

- **Authentication Required**: Users must sign in with Google to access the form
- **Auto-save**: Form data is automatically saved every 3 seconds as a draft
- **Manual Save**: Users can manually save their progress with the "Save as Draft" button
- **Submit Registration**: Final submission changes status from "draft" to "submitted"
- **Data Persistence**: All form data is stored in the database and retrieved on page load
- **Status Tracking**: Track whether registration is in draft or submitted state

## API Endpoints

### GET `/api/cloud-study-jams`
Fetches the current user's registration data.

**Response:**
```json
{
  "registration": {
    "id": "...",
    "email": "user@example.com",
    "fullName": "John Doe",
    "status": "draft",
    ...
  }
}
```

### POST `/api/cloud-study-jams`
Saves or updates registration as a draft.

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "gender": "male",
  ...
}
```

### PUT `/api/cloud-study-jams`
Submits the registration (sets status to "submitted").

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  ...
}
```

## Database Schema

The `cloud_study_jams_registrations` table includes:

- `id`: Unique identifier
- `userId`: Reference to the user
- `email`: User's email address
- `fullName`: User's full name
- `gender`: User's gender
- `graduationYear`: Year of graduation
- `hasLaptop`: Whether user has laptop access
- `newAccountVerified`: Verification of new Skills Boost account
- `skillsBoostEmail`: Email linked to Skills Boost profile
- `profileUrl`: Public profile URL
- `termsAccepted`: Terms acceptance status
- `dataAcknowledgement`: Data acknowledgement status
- `completionAgreement`: Completion agreement status
- `status`: Registration status (draft/submitted)
- `submittedAt`: Timestamp of submission
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Testing

To test the registration flow:

1. Start the development server: `npm run dev`
2. Navigate to `/cloud-study-jams/register`
3. Sign in with a Google account (must include "gitam" in email)
4. Fill out the form - it will auto-save every 3 seconds
5. Click "Save as Draft" to manually save progress
6. Click "Submit Registration" to finalize submission

## Troubleshooting

### Database Connection Issues

If you see "Database not available" errors:
- Verify your `DATABASE_URL` is correctly set
- Ensure your database is accessible from your deployment environment
- Check that migrations have been run

### Authentication Issues

If users can't sign in:
- Verify Google OAuth credentials are correct
- Ensure `NEXTAUTH_URL` matches your deployment URL
- Check that user's email contains "gitam"

## Production Deployment

For production deployment (e.g., Vercel):

1. Add all environment variables in your deployment platform
2. Ensure database is accessible from your production environment
3. Migrations will run automatically on build via `npm run build`

## Support

For issues or questions, please contact the GDGoC GITAM team.
