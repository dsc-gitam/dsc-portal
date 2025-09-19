import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
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
              <Link href="/recruitment" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Recruitment
              </Link>
              <Link href="/auth/signin" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md font-medium">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-success rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-white text-2xl font-bold font-display">DSC</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-display leading-tight">
              Google Developer Groups
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                on Campus 2025
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join the core team of DSC GITAM and help build the future of technology on campus. 
              Connect with like-minded developers, learn new skills, and make an impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link 
                href="/recruitment"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105 w-full sm:w-auto justify-center"
              >
                Apply for Core Team
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                href="/about"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12 shadow-2xl">
              {/* GDSC GITAM Community Image */}
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                <Image
                  src="/gdsc-gitam.jpg"
                  alt="GDSC GITAM Community"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-primary font-display">500+</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-secondary font-display">50+</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-success font-display">25+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-accent font-display">15+</div>
                  <div className="text-sm text-gray-600">Partners</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-400 rounded-full opacity-60"></div>
              <div className="absolute top-1/3 -left-3 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Why Join <span className="text-primary">DSC GITAM?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Become part of a thriving community of developers and innovators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Learn & Grow</h3>
              <p className="text-gray-600 leading-relaxed">Access to exclusive workshops, tech talks, and hands-on learning experiences with industry experts.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Network</h3>
              <p className="text-gray-600 leading-relaxed">Connect with fellow developers, industry professionals, and Google Developer Experts from around the world.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-success/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Impact</h3>
              <p className="text-gray-600 leading-relaxed">Lead initiatives that make a real difference in the campus tech community and beyond.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-primary via-secondary to-success rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Ready to Join Us?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Take the first step towards becoming a part of the most exciting tech community on campus.
            </p>
            <Link 
              href="/recruitment"
              className="bg-white text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105"
            >
              Start Your Application
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-full"></div>
                <span className="text-gray-900 font-semibold font-display">DSC GITAM</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Empowering the next generation of developers and innovators at GITAM University.
              </p>
              <div className="text-sm text-gray-500">
                © 2025 DSC GITAM. All rights reserved.
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-900 font-semibold mb-4 font-display">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block text-gray-600 hover:text-primary transition-colors">Home</a>
                <a href="/recruitment" className="block text-gray-600 hover:text-primary transition-colors">Recruitment</a>
                <a href="/about" className="block text-gray-600 hover:text-primary transition-colors">About Us</a>
                <a href="/events" className="block text-gray-600 hover:text-primary transition-colors">Events</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-900 font-semibold mb-4 font-display">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="block text-gray-600 hover:text-primary transition-colors">Contact Us</a>
                <a href="mailto:dsc@gitam.in" className="block text-gray-600 hover:text-primary transition-colors">dsc@gitam.in</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}