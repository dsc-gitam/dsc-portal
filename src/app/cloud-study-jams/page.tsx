import Link from "next/link";
import Header from "@/components/Header";

export default function CloudStudyJamsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <main>
        <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                Google Cloud Study Jams
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Unlock your potential with hands-on learning and
                community-driven growth
              </p>
              <Link
                href="/cloud-study-jams/register"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Register Now
              </Link>
              <p className="mt-4 text-sm opacity-80">
                Registration closes on 15th October 12 noon.
              </p>
            </div>
          </div>
        </div>

        {/* What is Cloud Study Jams */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-display text-center">
                What is Google Cloud Study Jams?
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center">
                Google Cloud Study Jams introduce students to Google Cloud
                technologies through structured learning, community engagement,
                and milestone-driven activities.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <p className="text-gray-800 leading-relaxed">
                  Correctly signed up participants will receive access to
                  specific pathways on Google Cloud Skills Boost Platform. To
                  participate in this campaign, you are required to be a part of
                  a campus which has a GDG on Campus Organizer who confirmed
                  interests via Campus Interest Form in the given deadline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 font-display text-center">
              Why Join Cloud Study Jams?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Learn the Latest Practices
                </h3>
                <p className="text-gray-700">
                  Whether you&apos;re a beginner or ready to master Google
                  Cloud, learn about the latest development tools and APIs to
                  build better cloud applications.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Connect with Developers
                </h3>
                <p className="text-gray-700">
                  Participants have an opportunity to meet other developers in
                  the community as they advance their skills, learn from each
                  other, and build their networks.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Apply Your Skills
                </h3>
                <p className="text-gray-700">
                  Tackle hands-on activities and learn development concepts that
                  you can apply directly in your own projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 font-display text-center">
                Important Information
              </h2>
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    ⚠️ New Account Required
                  </h3>
                  <p className="text-gray-800">
                    Ensure and emphasize that you provide a NEW Skills Boost
                    Account created after 20th September, 2025. Else we will not
                    accept them in the campaign.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    📧 Correct Email Required
                  </h3>
                  <p className="text-gray-800">
                    Ensure you provide the correct email address linked to the
                    NEW Google Cloud Skills Boost account in the form. Else we
                    will not accept them in the campaign.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    🏆 Recognition & Milestones
                  </h3>
                  <p className="text-gray-800">
                    All the recognition and milestones will be shared with your
                    campus GDG on Campus Organizer. The program team will not be
                    responsible for rewards for individual participants.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    ✅ System Validation
                  </h3>
                  <p className="text-gray-800">
                    All the submitted data will go through system validations
                    and anything that doesn&apos;t fall in the above criteria
                    will be automatically rejected by the system. No exceptions
                    can be made once the form is submitted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Ready to Start Your Cloud Journey?
            </h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of students learning Google Cloud technologies and
              building the future.
            </p>
            <Link
              href="/cloud-study-jams/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Register Now
            </Link>
            <p className="mt-6 text-white text-sm opacity-80">
              Thanks and looking forward to see you enrolled for the campaign 🙂
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-success rounded-full"></div>
              <span className="text-gray-600">GDGoC GITAM © 2025</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
