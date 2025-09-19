import Link from "next/link";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary via-secondary to-success rounded-full"></div>
              <h1 className="text-xl font-semibold text-gray-900 font-display">DSC GITAM Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/recruitment" className="text-primary font-bold">
                Recruitment
              </Link>
              <Link href="/auth/signin" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md font-medium">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-success rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white text-lg font-bold font-display">DSC</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Join the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Core Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Apply to become a core team member of DSC GITAM and help shape the future of technology on campus.
            Please fill out the form below with accurate information.
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <form className="space-y-8">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    GITAM Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    pattern=".*@gitam\.in$"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your.name@gitam.in"
                  />
                  <p className="mt-1 text-sm text-gray-500">Must be your official GITAM email address</p>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Academic Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your student ID"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Study *
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select your year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                    Branch/Department *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select your branch</option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="it">Information Technology</option>
                    <option value="ece">Electronics & Communication</option>
                    <option value="eee">Electrical & Electronics</option>
                    <option value="mech">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700 mb-2">
                    Current CGPA *
                  </label>
                  <input
                    type="number"
                    id="cgpa"
                    name="cgpa"
                    required
                    min="0"
                    max="10"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="8.5"
                  />
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Technical Skills & Experience</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                    Programming Languages & Technologies *
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="e.g., Python, Java, JavaScript, React, Node.js, MongoDB, etc."
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Projects & Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Describe your previous projects, internships, or relevant experience..."
                  />
                </div>
                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Motivation & Goals</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join DSC GITAM? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Share your motivation for joining the DSC core team..."
                  />
                </div>
                <div>
                  <label htmlFor="contribution" className="block text-sm font-medium text-gray-700 mb-2">
                    How can you contribute to DSC GITAM? *
                  </label>
                  <textarea
                    id="contribution"
                    name="contribution"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Describe how you plan to contribute to the community..."
                  />
                </div>
              </div>
            </div>

            {/* Role Preference */}
            <div className="pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Role Preference</h2>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select your preferred role</option>
                  <option value="technical">Technical Team (Development & Engineering)</option>
                  <option value="design">Design Team (UI/UX & Graphics)</option>
                  <option value="content">Content Team (Writing & Documentation)</option>
                  <option value="events">Events Team (Organization & Management)</option>
                  <option value="marketing">Marketing Team (Social Media & Outreach)</option>
                  <option value="lead">Team Lead (Leadership & Coordination)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105"
              >
                Submit Application
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              You'll receive a confirmation email immediately after submitting your application
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Our team will review your application within 3-5 business days
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              If shortlisted, you'll be able to book an interview slot through this portal
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Final results will be communicated via email within a week of interviews
            </li>
          </ul>
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