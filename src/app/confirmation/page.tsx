import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary via-secondary to-success rounded-full"></div>
              <h1 className="text-xl font-semibold text-gray-900">DSC GITAM Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/recruitment" className="text-gray-700 hover:text-primary transition-colors">
                Recruitment
              </Link>
              <Link href="/auth/signin" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Application <span className="text-success">Submitted</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for applying to join the DSC GITAM core team! We&apos;ve received your application 
            and sent a confirmation email to your GITAM email address.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-green-900 mb-4">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">1</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-green-900">Email Confirmation</h3>
                  <p className="text-green-700 text-sm">Check your GITAM email for a confirmation message with your application details.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">2</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-green-900">Application Review</h3>
                  <p className="text-green-700 text-sm">Our team will review your application within 3-5 business days.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">3</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-green-900">Interview Invitation</h3>
                  <p className="text-green-700 text-sm">If shortlisted, you&apos;ll receive an email with instructions to book your interview slot.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">4</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-green-900">Final Results</h3>
                  <p className="text-green-700 text-sm">Results will be communicated via email within a week of interviews.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Back to Home
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Reminders</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Keep checking your GITAM email regularly
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Don&apos;t forget to check your spam/junk folder
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Save this portal URL for future reference
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions?</h3>
            <p className="text-gray-700 text-sm mb-4">
              If you have any questions about your application or the recruitment process, feel free to reach out to us.
            </p>
            <a 
              href="mailto:dsc@gitam.in"
              className="text-primary hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Contact DSC GITAM →
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-success rounded-full"></div>
              <span className="text-gray-600">DSC GITAM © 2025</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}