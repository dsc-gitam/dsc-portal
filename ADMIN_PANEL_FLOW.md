# Admin Panel User Flow

## 🎯 Recruitment Workflow

### User Journey
```
┌─────────────────────────────────────────────────────────────────┐
│ 1. STUDENT APPLIES                                              │
└─────────────────────────────────────────────────────────────────┘
    │
    ├── Fills recruitment form
    ├── Submits application
    └── Receives confirmation email
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. ADMIN REVIEWS                                                │
└─────────────────────────────────────────────────────────────────┘
    │
    ├── Views all applications at /admin
    ├── Filters by year/branch/role/status
    ├── Clicks on applicant → sees full details
    └── Clicks "Shortlist" button
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. SHORTLIST NOTIFICATION                                       │
└─────────────────────────────────────────────────────────────────┘
    │
    ├── Status changed to "shortlisted"
    ├── Email sent to candidate
    └── Email contains link to /interview
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CANDIDATE BOOKS SLOT                                         │
└─────────────────────────────────────────────────────────────────┘
    │
    ├── Visits /interview page
    ├── Sees available slots
    ├── Selects preferred slot
    ├── Clicks "Book Interview Slot"
    └── Receives booking confirmation email
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. ADMIN VIEWS BOOKINGS                                         │
└─────────────────────────────────────────────────────────────────┘
    │
    ├── Goes to /admin/slots
    ├── Sees booked slots
    └── Views candidate details
```

---

## 📊 Admin Dashboard Structure

```
/admin (Main Dashboard)
├── Tab: Applications
│   ├── Filters: Status, Year, Branch, Role
│   ├── Table with applicants
│   ├── Click row → Detail Dialog
│   └── Shortlist Button
│
├── Tab: Statistics
│   ├── Total Applications
│   ├── Technical vs Non-technical
│   ├── Gender Distribution
│   ├── Year Distribution
│   ├── Branch Distribution
│   └── Role Distribution
│
└── Tab: Interview Slots
    └── Link to /admin/slots

/admin/slots (Slot Management)
├── Create Slot Button
├── Create Slot Form
│   ├── Date picker
│   ├── Start Time
│   ├── End Time
│   └── Venue
├── Slots Table
│   ├── Date & Time
│   ├── Venue
│   ├── Status (Available/Booked)
│   ├── Booked by (if booked)
│   └── Delete Button (if not booked)

/admin/cloud-study-jams (CSJ Management)
├── Tab: Registrations
│   ├── Filters: Status, Gender, Year
│   ├── Table with registrations
│   ├── Click row → Detail Dialog
│   └── Shortlist Button
│
└── Tab: Statistics
    ├── Total Registrations
    ├── With Laptop
    ├── Account Verified
    ├── Gender Distribution
    └── Graduation Year Distribution
```

---

## 🔐 Authentication Flow

```
User Signs In
    │
    ├─── Is email in ADMIN_EMAILS list?
    │    ├─── YES → Grant admin access
    │    └─── NO → Check database
    │              │
    │              └─── Is user.role === "admin"?
    │                   ├─── YES → Grant admin access
    │                   └─── NO → Normal user access
    │
    └─── Admin tries to access /admin
         │
         ├─── If admin → Show dashboard
         └─── If not admin → Show "Access Denied" error
```

---

## 📧 Email Templates

### 1. Application Confirmation (Existing)
**Sent when:** Student submits application
**Contains:**
- Confirmation message
- Application details
- Next steps
- Contact information

### 2. Shortlist Notification (NEW)
**Sent when:** Admin shortlists candidate
**Contains:**
- Congratulations message
- Link to book interview slot
- Important notes about slot availability
- Next steps

### 3. Interview Confirmation (NEW)
**Sent when:** Candidate books slot
**Contains:**
- Interview date, time, venue
- Duration and format
- Preparation tips
- Important reminders

---

## 🗄️ Database Relationships

```
User
├─── has many RecruitmentApplications
├─── has many CloudStudyJamsRegistrations
└─── has many InterviewBookings

RecruitmentApplication
├─── belongs to User
└─── has one InterviewBooking

InterviewSlot
└─── has many InterviewBookings

InterviewBooking
├─── belongs to User
├─── belongs to RecruitmentApplication
└─── belongs to InterviewSlot

CloudStudyJamsRegistration
└─── belongs to User
```

---

## 🎨 UI Components

### Admin Dashboard (`/admin/page.tsx`)
- Navigation tabs
- Filters section
- Applications table
- Statistics cards
- Detail modal

### Slot Management (`/admin/slots/page.tsx`)
- Create slot form
- Slots table
- Delete confirmation

### CSJ Admin (`/admin/cloud-study-jams/page.tsx`)
- Navigation tabs
- Filters section
- Registrations table
- Statistics cards
- Detail modal

### Interview Booking (`/interview/page.tsx`)
- Slot selection grid
- Selected slot preview
- Book button
- Success confirmation

---

## 📱 Responsive Design

All admin pages are fully responsive:
- Desktop: Full tables with all columns
- Tablet: Scrollable tables
- Mobile: Optimized for touch, scrollable tables

---

## 🔄 State Management

### Frontend State (React useState)
- Applications/Registrations list
- Statistics data
- Selected filters
- Selected application/registration
- Loading states
- Error states

### Backend State (Database)
- Application status
- Shortlisted timestamp
- Interview bookings
- Slot availability

---

## 🚦 Status Flow

### Recruitment Application
```
draft → submitted → under_review → shortlisted → (interview booked)
                 ↓
              rejected
```

### Cloud Study Jams Registration
```
draft → submitted → shortlisted
              ↓
          rejected
```

### Interview Slot
```
Available → Booked (locked, cannot be unbooked via UI)
```

---

## 🛡️ Security Measures

1. **Admin Access Control**
   - Email whitelist check
   - Database role check
   - Middleware on all admin routes
   - 403 error for unauthorized access

2. **Interview Booking**
   - Requires shortlisted status
   - One booking per user
   - Transaction-based locking
   - Prevents double-booking

3. **Data Validation**
   - Server-side validation on all API endpoints
   - Type checking with TypeScript
   - Database constraints (unique, required fields)

4. **Email Security**
   - Uses environment variables for SMTP
   - No credentials in code
   - Supports app passwords

---

## 📈 Analytics & Reporting

### Available Statistics

**Recruitment:**
- Total applications count
- Applications by status
- Gender distribution
- Year distribution (1st-4th)
- Branch distribution
- Role distribution
- Technical vs non-technical split

**Cloud Study Jams:**
- Total registrations count
- Registrations by status
- Gender distribution
- Graduation year distribution
- Laptop ownership
- Account verification status

All statistics can be filtered by status (submitted, shortlisted, etc.)

---

## 🎯 Key Features

### For Admins
✅ Single dashboard for all management tasks
✅ Advanced filtering and search
✅ One-click shortlisting
✅ Automatic email notifications
✅ Real-time status updates
✅ Slot management with conflict prevention
✅ Comprehensive statistics

### For Candidates
✅ Clear application process
✅ Email confirmations at each step
✅ Easy interview slot booking
✅ Prevention of double-booking
✅ Clear status visibility
✅ Cannot modify after submission

---

## 💡 Tips for Admins

1. **Filtering Applications**
   - Use multiple filters together for precise searches
   - Change status filter to see different stages
   - Statistics update based on selected status filter

2. **Shortlisting**
   - Review full application before shortlisting
   - Shortlisting is one-way (no un-shortlist)
   - Email is sent immediately upon shortlisting

3. **Managing Slots**
   - Create slots in advance
   - Consider time zones and candidate availability
   - Cannot delete booked slots
   - Venue can be physical or virtual (Google Meet)

4. **Monitoring Bookings**
   - Check booked slots regularly
   - Prepare interview schedules based on bookings
   - Export data if needed (via database)

---

## 🔧 Maintenance

### Regular Tasks
- Monitor email delivery
- Check database storage
- Review statistics weekly
- Clean up old draft applications
- Backup database regularly

### Before Each Recruitment Cycle
- Clear old interview slots
- Archive previous applications
- Update admin list if needed
- Test email delivery
- Verify all forms working

---

## 📞 Support

For issues or questions:
1. Check `ADMIN_PANEL.md` documentation
2. Review error messages in browser console
3. Check server logs for API errors
4. Verify environment variables
5. Test email settings
6. Contact: dsc@gitam.in
