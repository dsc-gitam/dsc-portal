# Admin Panel Documentation

## Overview
The DSC GITAM Portal includes a comprehensive admin panel for managing recruitment applications, interview slots, and Cloud Study Jams registrations.

## Admin Access

### Admin Credentials
Admin access is controlled via email addresses configured in `/src/lib/admin.ts`:
- `admin1@gitam.in`
- `admin2@gitam.in`

To add more admins, update the `ADMIN_EMAILS` array in the admin.ts file, or set the user's `role` field to `"admin"` in the database.

### Accessing Admin Panel
1. Sign in with an admin email address
2. Navigate to `/admin` to access the main dashboard

## Features

### 1. Recruitment Management (`/admin`)

#### Applications Tab
- View all submitted recruitment applications
- Filter by:
  - Status (submitted, under_review, shortlisted, rejected)
  - Year of study (1st, 2nd, 3rd, 4th)
  - Branch (e.g., CSE, ECE)
  - Role (e.g., Technical, Marketing)
- View full application details in a modal dialog
- Shortlist candidates with one click

#### Statistics Tab
- Total applications count
- Technical vs Non-technical distribution
- Gender distribution (male/female/other/not specified)
- Year-wise distribution (1st-4th year)
- Branch-wise distribution
- Role-wise distribution

Statistics can be filtered by status to see data for different stages (submitted, shortlisted, etc.)

#### Interview Slots Tab
- Link to slot management page
- Quick overview of slot system

### 2. Interview Slot Management (`/admin/slots`)

#### Create Slots
- Set date, start time, end time, and venue
- Supports both physical venues and virtual (Google Meet)
- Multiple slots can be created for different dates/times

#### Manage Slots
- View all created slots
- See booking status (available/booked)
- View applicant details for booked slots
- Delete slots (only if not booked)

### 3. Cloud Study Jams Management (`/admin/cloud-study-jams`)

#### Registrations Tab
- View all submitted CSJ registrations
- Filter by:
  - Status (submitted, shortlisted, rejected)
  - Gender
  - Graduation year
- View full registration details
- Shortlist participants

#### Statistics Tab
- Total registrations count
- Participants with laptops
- Account verification status
- Gender distribution
- Graduation year distribution

## Recruitment Flow

### For Applicants:
1. User submits application → Receives confirmation email
2. If shortlisted → Receives email with interview booking link
3. Books interview slot → Receives confirmation with details
4. Cannot revisit application form after submission (redirected to confirmation page)

### For Admins:
1. Review applications with filters
2. View full application in detail dialog
3. Click "Shortlist" button
4. System updates status and sends email to candidate
5. Manage interview slots
6. View booked slots and applicant details

## API Endpoints

### Recruitment
- `GET /api/admin/applications` - Get filtered applications
- `GET /api/admin/stats` - Get recruitment statistics
- `POST /api/admin/shortlist` - Shortlist a candidate (sends email)
- `GET /api/admin/slots` - Get all interview slots
- `POST /api/admin/slots` - Create new slot
- `DELETE /api/admin/slots?id={slotId}` - Delete slot
- `POST /api/interview/book` - Book slot (candidate endpoint)

### Cloud Study Jams
- `GET /api/admin/cloud-study-jams` - Get filtered registrations
- `GET /api/admin/cloud-study-jams/stats` - Get CSJ statistics
- `POST /api/admin/cloud-study-jams/shortlist` - Shortlist a participant

## Email Notifications

### Application Confirmation
Sent immediately when candidate submits application.

### Shortlist Notification
Sent when admin shortlists a candidate. Includes:
- Congratulations message
- Link to book interview slot
- Next steps and important notes

### Interview Confirmation
Sent when candidate books interview slot. Includes:
- Date, time, and venue
- Duration and format
- Preparation tips
- Important reminders

## Database Schema

### Key Models
- `User` - Has `role` field for admin access
- `RecruitmentApplication` - Includes `status` and `shortlistedAt` fields
- `InterviewSlot` - Stores date, time, venue, availability
- `InterviewBooking` - Links user, application, and slot
- `CloudStudyJamsRegistration` - Includes `status` and `shortlistedAt` fields

### Status Values

#### Recruitment Application Status
- `draft` - Application in progress
- `submitted` - Application submitted, awaiting review
- `under_review` - Being reviewed by admins
- `shortlisted` - Candidate shortlisted for interview
- `rejected` - Application rejected

#### Cloud Study Jams Status
- `draft` - Registration in progress
- `submitted` - Registration submitted
- `shortlisted` - Participant shortlisted
- `rejected` - Registration rejected

## Setup Instructions

### 1. Database Migration
Run Prisma migrations to create the necessary tables:
```bash
npx prisma migrate dev
```

### 2. Environment Variables
Ensure these are set:
- `DATABASE_URL` - PostgreSQL connection string
- `SMTP_USER` - Email address for sending notifications
- `SMTP_PASS` - Email password/app password
- `NEXTAUTH_URL` - Portal URL (for email links)

### 3. Create Admin Users
Option 1: Update the email list in `/src/lib/admin.ts`

Option 2: Set role in database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@gitam.in';
```

## Security Considerations

1. Admin access is verified on every API request
2. Only users with admin role or whitelisted email can access admin endpoints
3. All admin routes return 403 Forbidden for non-admin users
4. Interview slot booking requires shortlisted status
5. Slots are locked via transaction to prevent double-booking

## Troubleshooting

### Admin Access Denied
- Verify your email is in the ADMIN_EMAILS list or your user role is "admin"
- Check that you're signed in with the correct email

### Emails Not Sending
- Verify SMTP credentials in environment variables
- Check spam folder
- Ensure SMTP_USER and SMTP_PASS are correct
- For Gmail, use App Password instead of regular password

### Slots Not Appearing
- Ensure you're viewing the interview booking page as a shortlisted candidate
- Check that slots exist and are marked as available
- Verify slot date is in the future

### Cannot Delete Slot
- Slots with bookings cannot be deleted
- Remove the booking first (via database) or keep the slot

## Future Enhancements

Potential improvements:
- Bulk shortlisting/rejection
- Email templates customization UI
- Interview feedback forms
- Calendar integration for slots
- Analytics dashboard with charts
- Export data to CSV/Excel
- Advanced search and filtering
- Notification system for admins
- Interview slot rescheduling
