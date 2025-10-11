import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="pt-24 pb-16 lg:pt-20 lg:pb-24">
            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-600 font-medium mb-8">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Applications open for 2025
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 font-display leading-[1.1] tracking-tight">
                Google Developer
                <br />
                <span className="bg-gradient-text-primary-secondary">
                  Groups on Campus
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Join the core team at GITAM and help shape the future of
                technology on campus. Connect, learn, and make an impact with
                like-minded developers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link
                  href="/recruitment"
                  className="btn-gradient-primary-secondary text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 inline-flex items-center transform hover:scale-105 min-w-[200px] justify-center"
                >
                  Apply now
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/about"
                  className="bg-white border-[1.5px] px-8 py-4 rounded-full text-lg font-medium hover:border-b-6 transition-all duration-300 min-w-[200px] text-center"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">
                  500+
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Active Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">
                  50+
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Events Hosted
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">
                  25+
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Projects Built
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">
                  15+
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Industry Partners
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Image Section */}
        <div className="bg-gray-200 py-16 border-y-[1.5px]">
          <div className="mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-6xl leading-[4.2rem] font-bold text-gray-900 mb-6 font-display">
                  Building the next generation of developers
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  At GDGoC GITAM, we&apos;re more than just a community.
                  We&apos;re a launchpad for innovation, learning, and
                  meaningful connections in the tech world.
                </p>
                <div className="space-y-4 flex-wrap flex gap-x-3">
                  <div className="flex items-center space-x-3 bg-white w-max py-3 px-4 rounded-full border-[1.5px] border-b-6">
                    <span className="text-gray-700">
                      Hands-on workshops and tech talks
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white w-max py-3 px-4 rounded-full border-[1.5px] border-b-6">
                    <span className="text-gray-700">
                      Mentorship from industry experts
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white w-max py-3 px-4 rounded-full border-[1.5px] border-b-6">
                    <span className="text-gray-700">
                      Real-world project collaboration
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <Image
                    src="/gdsc-gitam.jpg"
                    alt="GDSC GITAM Community"
                    width={600}
                    height={400}
                    className="w-full h-auto aspect-[1.3] object-cover rounded-3xl border-[2px] border-b-8 border-black"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20">
          <div className="px-6 lg:px-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Why Join <span className="text-primary">GDGoC GITAM?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Become part of a thriving community of developers and innovators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-primary-blue rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                Learn & Grow
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access to exclusive workshops, tech talks, and hands-on learning
                experiences with industry experts.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-secondary-red rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                Network
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow developers, industry professionals, and
                Google Developer Experts from around the world.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-success/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-success-green rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lead initiatives that make a real difference in the campus tech
                community and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Cloud Study Jams Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm text-blue-700 font-medium mb-6">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Now Open for Registration
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                  <span className="text-blue-600">Cloud Study Jams</span> 2025
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join us for an immersive learning experience in Google Cloud
                  technologies
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Learn Cloud Computing
                  </h3>
                  <p className="text-gray-700">
                    Master Google Cloud Platform through hands-on labs,
                    structured learning paths, and real-world projects guided by
                    experts.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Earn Badges & Certificates
                  </h3>
                  <p className="text-gray-700">
                    Complete challenges and earn Google Cloud skill badges and
                    certificates to showcase your expertise.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span className="font-medium">October 7-12, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🕒</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span className="font-medium">Online</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/cloud-study-jams"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Learn More & Register
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Leader Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                Meet Our <span className="text-primary">Leader</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Introducing the lead, Google Developer Groups on Campus,
                2025-2026
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-16 shadow-xl border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display">
                    Ms. Kavya Chandana
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    A creative soul with a passion for innovation, I aim to
                    empower women in breaking down barriers and solve problems
                    of my women friends and the world. With my love for painting
                    and technology, I desire to innovate and bring my unique
                    vision to the world by blending art and technology in
                    exciting new ways, inspire others and make a positive
                    impact.
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Ms. Kavya Chandana, an affluent technologist, enthusiastic
                      entrepreneur, creative artist, and team builder who
                      uplifts her co-female colleagues and helps them achieve
                      their goals. It&apos;s our utmost pleasure to welcome her
                      to lead us through the upcoming tenure, building solutions
                      for problems around our community, upskilling, and taking
                      GDGoC to new heights.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <Image
                      src="/kavya-chandana.png"
                      alt="Kavya Chandana - GDGoC Lead"
                      width={400}
                      height={500}
                      className="w-full h-auto rounded-2xl shadow-lg"
                      priority
                    />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-primary-secondary rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">🚀</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20">
          <div className="mx-6 lg:mx-8">
            <div className="bg-gradient-io2024-main rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
                Ready to Join Us?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Take the first step towards becoming a part of the most exciting
                tech community on campus.
              </p>
              <Link
                href="/recruitment"
                className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105"
              >
                Start Your Application
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/gdgoc_logo.png"
                  alt="GDGoC Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-gray-900 font-semibold font-display">
                  GDGoC GITAM
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Empowering the next generation of developers and innovators at
                GITAM University.
              </p>
              <div className="text-sm text-gray-500">
                © 2025 GDGoC GITAM. All rights reserved.
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4 font-display">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/recruitment"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  Recruitment
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/events"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4 font-display">
                Support
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="mailto:dsc.gitam@gmail.com"
                  className="block text-gray-600 hover:text-primary transition-colors"
                >
                  dsc.gitam@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
