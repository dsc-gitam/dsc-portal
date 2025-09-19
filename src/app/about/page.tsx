import Link from "next/link";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
            {/* Page Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 font-display leading-[1.1] tracking-tight">
                About <span className="bg-gradient-text-primary-secondary">GDGoC GITAM</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Learn about our team structure, roles, and the passionate individuals driving our community forward.
              </p>
            </div>

            {/* Team Structure Section */}
            <section className="mb-20">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display text-center">
                  Google Developer Groups on Campus: Core Team Structure
                </h2>
                <div className="w-24 h-1 bg-gradient-primary-secondary mx-auto mb-12"></div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">Proposed Team Structure</h3>
                  <p className="text-blue-800">
                    To make the team more efficient and to ensure clear lines of responsibility, here are the consolidated roles grouped into key pillars. 
                    The proposed structure is built on three main departments reporting to the leadership team.
                  </p>
                </div>

                {/* Leadership */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">1. Leadership</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Lead</h4>
                      <p className="text-gray-700">
                        The overall head of the GDG chapter. Responsible for vision, strategy, and official communication with Google and the university.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Vice President/Secretary</h4>
                      <p className="text-gray-700">
                        Supports the Lead and manages all administrative tasks, including meeting minutes, documentation, and internal communication.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Department */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">2. Technical Department</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Mobile Lead</h4>
                      <p className="text-gray-700">
                        Oversees all activities related to Android, Flutter, and other mobile technologies.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Cloud Lead</h4>
                      <p className="text-gray-700">
                        Manages workshops, projects, and learning paths focused on Google Cloud Platform.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">ML/AI Lead</h4>
                      <p className="text-gray-700">
                        Responsible for all events and content related to Machine Learning and Artificial Intelligence.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Web Lead</h4>
                      <p className="text-gray-700">
                        Drives community engagement, projects and is responsible for all events and content related to web technologies.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Competitive Programming Lead</h4>
                      <p className="text-gray-700">
                        Organizes coding challenges and prepares the community for competitions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Marketing & Creative Department */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">3. Marketing & Creative Department</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Designer</h4>
                      <p className="text-gray-700">
                        Manages all visual assets, including event posters, social media graphics, and merchandise designs.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Content & SM Manager</h4>
                      <p className="text-gray-700">
                        Responsible for all external communication, including social media content, email newsletters, and content creation.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Photography & Videography Lead</h4>
                      <p className="text-gray-700">
                        Captures and edits all photo and video content from events, providing visual documentation of activities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operations & Partnerships Department */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">4. Operations & Partnerships Department</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">PR & Outreach</h4>
                      <p className="text-gray-700">
                        Establishing partnerships with other clubs, securing funding and handling public relations with external companies/organizations.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Development Lead</h4>
                      <p className="text-gray-700">
                        Managing the development of community-driven projects from start to finish, building real-time business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Roles & Responsibilities Table */}
            <section className="mb-20">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display text-center">
                  Core Team Roles & Responsibilities
                </h2>
                <div className="w-24 h-1 bg-gradient-primary-secondary mx-auto mb-12"></div>
                
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Role</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Key Responsibilities</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Ideal Candidate Skills</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Lead</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Chapter vision, university liaison, Google communication.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Public speaking, leadership, strategic planning, networking.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Vice President/Secretary</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Administration, meeting coordination, record-keeping.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Organization, attention to detail, time management.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Technical Leads</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Organizing workshops, mentoring members, leading projects.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Expertise in their specific domain, teaching ability, project management.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Design Lead</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Creating event posters, social media graphics, branding.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Graphic design skills (Canva, Figma, Adobe), creativity, attention to aesthetics.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Content & SM Lead</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Managing social media, writing content, email marketing.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Excellent writing, social media strategy, communication.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Photography & Videography Lead</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Shooting and editing photos/videos of events and promotionals.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Photography/videography skills, editing software knowledge.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Business Development Lead</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Managing partnerships, project planning, managing community projects from start to finish, securing sponsorships, and building real-time business.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Negotiation, relationship-building, project management, business acumen.</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">PR & Outreach</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Securing funding, establishing partnerships with other clubs, and handling public relations.</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Negotiation, networking, professional communication.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className="bg-gradient-io2024-main rounded-3xl p-12 text-white shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Join Our Team</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Ready to take on one of these exciting roles and help build the future of technology at GITAM?
                </p>
                <Link 
                  href="/recruitment"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105"
                >
                  Apply Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-success rounded-full"></div>
              <span className="text-gray-600">GDGoC GITAM © 2025</span>
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