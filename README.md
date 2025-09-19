# DSC GITAM Portal

A comprehensive web portal for Google Developer Groups on Campus 2025 core team management at GITAM University. This modern, responsive application provides a complete recruitment and management solution with advanced form handling, authentication, and email notifications.

![DSC GITAM Portal](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

## 🌟 Features

### 🎨 **Modern UI/UX**
- **Minimalistic Design**: Clean white (#FFF) background with Google's official color scheme
- **Google Sans Typography**: Professional typography using Google Sans font family
- **Fully Responsive**: Mobile-first design that works seamlessly across all devices
- **Interactive Animations**: Smooth hover effects and transitions for enhanced user experience
- **Accessibility**: WCAG-compliant design with proper ARIA labels and semantic HTML

### 🔐 **Authentication System**
- **Google OAuth Integration**: Secure authentication using NextAuth.js
- **Domain Restriction**: Access limited to @gitam.in email addresses only
- **Session Management**: Secure JWT-based session handling
- **Custom Sign-in Pages**: Branded authentication flows with Google styling
- **Error Handling**: Comprehensive error handling for authentication failures

### 📝 **Comprehensive Recruitment Form**

#### **Core Sections:**
1. **Personal Information**
   - First Name, Last Name
   - GITAM Email Address (validated)
   - Phone Number

2. **Academic Information**
   - Student ID
   - Year of Study (1st-4th year)
   - Branch/Department selection
   - Current CGPA

3. **Technical Skills & Experience**
   - Programming Languages & Technologies
   - Previous Projects & Experience
   - GitHub Profile URL

4. **Motivation & Goals**
   - Why join DSC GITAM?
   - How to contribute to DSC GITAM?

#### **Advanced Sections:**

5. **Commitment & Availability**
   - Class schedule and weekly time commitment
   - Semester/academic year availability
   - Conditional follow-up for limited availability

6. **More About Your Passion**
   - Passionate project experience and outcomes
   - Anticipated challenges and proposed solutions

7. **Role Preference**
   - Technical Team (Development & Engineering)
   - Design Team (UI/UX & Graphics)
   - Content Team (Writing & Documentation)
   - Events Team (Organization & Management)
   - Marketing Team (Social Media & Outreach)
   - Team Lead (Leadership & Coordination)

8. **Department-Specific Tasks** (Conditional)

#### **Technical Role Tasks:**
- Build a webpage displaying GDG events
- Create a "Hello World" app with interactive features
- Write a Python script for API data analysis
- Submit GitHub repository or live demo link

#### **Marketing & Creative Role Tasks:**
- Design social media graphics for events
- Draft community email newsletters
- Create short promotional videos/reels
- Submit work portfolio links

#### **Operations & Partnerships Role Tasks:**
- Draft professional partnership emails
- Outline community project ideas
- Submit detailed written responses

### 📧 **Email System**
- **NodeMailer Integration**: Professional email notifications
- **HTML Email Templates**: Responsive email designs with Google branding
- **Application Confirmations**: Immediate confirmation emails with application details
- **Interview Notifications**: Automated interview booking confirmations
- **Professional Styling**: Consistent branding across all email communications

### 📅 **Interview Booking System**
- **Interactive Slot Selection**: Visual calendar interface for interview scheduling
- **Conflict Prevention**: Real-time availability checking
- **Booking Confirmations**: Detailed interview information with Google Meet links
- **Email Notifications**: Automatic confirmation emails with preparation tips

## 🛠 Technical Architecture

### **Frontend Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom Google color palette
- **Components**: React functional components with hooks
- **State Management**: React useState for form state and conditional rendering

### **Backend Integration**
- **Authentication**: NextAuth.js with Google OAuth provider
- **API Routes**: Next.js API routes for server-side logic
- **Email Service**: NodeMailer for SMTP email delivery
- **Session Storage**: JWT tokens with httpOnly cookies

### **Design System**
```css
/* Google Color Palette */
--primary: #4285F4;    /* Google Blue */
--secondary: #EA4335;  /* Google Red */
--accent: #FBBC05;     /* Google Yellow */
--success: #34A853;    /* Google Green */
--background: #FFFFFF; /* Pure White */
```

### **Project Structure**
```
src/
├── app/
│   ├── auth/                 # Authentication pages
│   │   ├── signin/           # Custom sign-in page
│   │   └── error/            # Authentication error handling
│   ├── recruitment/          # Main application form
│   │   └── page.tsx          # Comprehensive recruitment form
│   ├── confirmation/         # Success page after application
│   ├── interview/            # Interview booking system
│   ├── api/
│   │   └── auth/             # NextAuth.js API routes
│   ├── globals.css           # Global styles and Google Sans fonts
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Homepage with community features
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   └── email.ts              # Email service functions
└── public/
    ├── fonts/                # Google Sans font files
    │   ├── GoogleSans-Regular.woff2
    │   ├── GoogleSans-Medium.woff2
    │   ├── GoogleSans-Bold.woff2
    │   └── GoogleSansDisplay-Regular.woff2
    └── gdsc-gitam.jpg        # Community image
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- Google OAuth credentials
- SMTP email service credentials

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/dsc-gitam/dsc-portal.git
   cd dsc-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-here
   
   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Email Service Configuration
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ```

4. **Google OAuth Setup**
   
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 User Flow & Screenshots

### **1. Homepage - Welcome & Community**
- Modern landing page with Google branding
- Community statistics and feature highlights
- Clear call-to-action buttons for application

### **2. Recruitment Application**
- Multi-step comprehensive form
- Real-time validation and error handling
- Progressive disclosure based on role selection

### **3. Conditional Task Sections**
- Dynamic content based on selected role
- Interactive task selection with radio buttons
- Appropriate submission fields for each task type

### **4. Application Confirmation**
- Professional success page with next steps
- Clear timeline and expectations
- Contact information and support links

### **5. Interview Booking** (For shortlisted candidates)
- Calendar-based slot selection
- Real-time availability checking
- Detailed booking confirmations

## 🎯 Form Features & Validation

### **Advanced Form Logic**
- **Conditional Rendering**: Sections appear based on user selections
- **Progressive Disclosure**: Complex forms broken into manageable sections
- **Smart Validation**: Real-time validation with helpful error messages
- **Data Persistence**: Form state maintained during navigation

### **Validation Rules**
- **Email Validation**: Strict @gitam.in domain checking
- **Required Fields**: Clear marking with asterisks (*)
- **Format Validation**: Phone numbers, URLs, and CGPA ranges
- **Character Limits**: Appropriate limits for text areas

### **Accessibility Features**
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## 🔧 Configuration & Customization

### **Tailwind Configuration**
The project uses a custom Tailwind configuration with Google's design system:

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4285F4',
        secondary: '#EA4335',
        accent: '#FBBC05',
        success: '#34A853',
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Google Sans Display', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

### **Google Fonts Integration**
```css
/* globals.css */
@font-face {
  font-family: 'Google Sans';
  src: url('/fonts/GoogleSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Google Sans';
  src: url('/fonts/GoogleSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
```

## 📚 API Documentation

### **Authentication Endpoints**
- `GET /api/auth/signin` - Custom sign-in page
- `POST /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/session` - Current session information
- `POST /api/auth/signout` - Sign out functionality

### **Form Submission**
The recruitment form can be extended with API endpoints for:
- `POST /api/applications` - Submit new applications
- `GET /api/applications/[id]` - Retrieve application status
- `POST /api/interviews/book` - Book interview slots
- `GET /api/interviews/availability` - Check available slots

## 🚀 Deployment

### **Vercel Deployment** (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### **Manual Deployment**
```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Environment Variables for Production**
```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SMTP_USER=your-production-email
SMTP_PASS=your-production-password
```

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Homepage loads correctly with all visual elements
- [ ] Google authentication flow works with @gitam.in restriction
- [ ] All form sections render properly
- [ ] Conditional logic works for role-specific tasks
- [ ] Form validation provides helpful error messages
- [ ] Email notifications are sent successfully
- [ ] Interview booking system functions correctly
- [ ] Mobile responsiveness works across devices

### **Form Testing Scenarios**
1. **Technical Role**: Select technical role and verify programming tasks appear
2. **Marketing Role**: Select marketing role and verify creative tasks appear
3. **Operations Role**: Select operations role and verify partnership tasks appear
4. **Availability Logic**: Test "No" selection shows follow-up question
5. **Task Selection**: Verify appropriate submission fields appear for each task

## 🤝 Contributing

### **Development Guidelines**
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain Google design system consistency
4. Write descriptive commit messages
5. Test across multiple devices and browsers

### **Code Style**
- Use functional components with hooks
- Implement proper TypeScript types
- Follow React best practices
- Maintain consistent indentation and formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**DSC GITAM Core Team**
- Email: dsc@gitam.in
- Website: [DSC GITAM Portal](https://dsc-portal.manasmalla.dev)
- GitHub: [@dsc-gitam](https://github.com/dsc-gitam)

## 🙏 Acknowledgments

- **Google Developer Groups** for the amazing community platform
- **GITAM University** for supporting the developer community
- **Next.js Team** for the excellent React framework
- **Tailwind CSS** for the utility-first CSS framework
- **NextAuth.js** for seamless authentication

---

**Built with ❤️ by DSC GITAM for the developer community**
