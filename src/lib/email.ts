import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use app password for Gmail
  },
});

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  year: string;
  branch: string;
  role: string;
}

export async function sendApplicationConfirmation(applicationData: ApplicationData) {
  const { firstName, lastName, email, studentId, year, branch, role } = applicationData;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'DSC GITAM - Application Confirmation',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>DSC GITAM Application Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4285F4, #34A853); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #4285F4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .details { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .details h3 { margin-top: 0; color: #4285F4; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Application Received!</h1>
              <p>Thank you for applying to DSC GITAM Core Team</p>
            </div>
            
            <div class="content">
              <h2>Hi ${firstName} ${lastName},</h2>
              
              <p>We're excited to confirm that we've received your application to join the DSC GITAM core team for 2025!</p>
              
              <div class="details">
                <h3>Application Details</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Student ID:</strong> ${studentId}</p>
                <p><strong>Year:</strong> ${year}</p>
                <p><strong>Branch:</strong> ${branch}</p>
                <p><strong>Preferred Role:</strong> ${role}</p>
                <p><strong>Email:</strong> ${email}</p>
              </div>
              
              <h3>What happens next?</h3>
              <ol>
                <li><strong>Application Review:</strong> Our team will review your application within 3-5 business days.</li>
                <li><strong>Interview Invitation:</strong> If shortlisted, you'll receive an email to book your interview slot.</li>
                <li><strong>Final Results:</strong> Results will be communicated within a week of interviews.</li>
              </ol>
              
              <p>Keep an eye on your email (including spam folder) for updates on your application status.</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}" class="button">Visit DSC Portal</a>
              </div>
              
              <p>If you have any questions, feel free to reach out to us at <a href="mailto:dsc@gitam.in">dsc@gitam.in</a>.</p>
              
              <p>Best regards,<br>DSC GITAM Recruitment Team</p>
            </div>
            
            <div class="footer">
              <p>Google Developer Groups on Campus - GITAM University</p>
              <p>This is an automated email. Please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Application confirmation email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendInterviewConfirmation(
  email: string, 
  name: string, 
  date: string, 
  time: string,
  meetLink: string = "Will be provided 1 hour before the interview"
) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'DSC GITAM - Interview Confirmation',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>DSC GITAM Interview Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4285F4, #34A853); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #34A853; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .interview-details { background: #e3f2fd; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #4285F4; }
            .interview-details h3 { margin-top: 0; color: #4285F4; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Interview Scheduled!</h1>
              <p>Your DSC GITAM core team interview is confirmed</p>
            </div>
            
            <div class="content">
              <h2>Hi ${name},</h2>
              
              <p>Great news! Your interview slot has been successfully booked.</p>
              
              <div class="interview-details">
                <h3>Interview Details</h3>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Duration:</strong> 45 minutes</p>
                <p><strong>Format:</strong> Virtual (Google Meet)</p>
                <p><strong>Meet Link:</strong> ${meetLink}</p>
              </div>
              
              <h3>Preparation Tips</h3>
              <ul>
                <li>Review your application and be ready to discuss your projects</li>
                <li>Prepare questions about DSC GITAM and your preferred role</li>
                <li>Test your camera and microphone beforehand</li>
                <li>Ensure a stable internet connection</li>
                <li>Find a quiet, well-lit space for the interview</li>
              </ul>
              
              <h3>Important Notes</h3>
              <ul>
                <li>Join the meeting 5 minutes before your scheduled time</li>
                <li>The Google Meet link will be sent 1 hour before the interview</li>
                <li>If you need to reschedule, contact us at least 24 hours in advance</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}" class="button">Visit DSC Portal</a>
              </div>
              
              <p>We're looking forward to speaking with you!</p>
              
              <p>Best regards,<br>DSC GITAM Recruitment Team</p>
            </div>
            
            <div class="footer">
              <p>Google Developer Groups on Campus - GITAM University</p>
              <p>For any questions, contact us at <a href="mailto:dsc@gitam.in">dsc@gitam.in</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Interview confirmation email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending interview confirmation email:', error);
    return { success: false, error };
  }
}