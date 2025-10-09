"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function CloudStudyJamsRegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    termsAccepted: "",
    fullName: "",
    gender: "",
    graduationYear: "",
    hasLaptop: "",
    newAccountVerified: "",
    skillsBoostEmail: "",
    profileUrl: "",
    dataAcknowledgement: "",
    completionAgreement: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);

  // Fetch existing registration data
  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await fetch('/api/cloud-study-jams');
        if (response.ok) {
          const data = await response.json();
          if (data.registration) {
            setFormData({
              email: data.registration.email || session?.user?.email || "",
              fullName: data.registration.fullName || "",
              gender: data.registration.gender || "",
              graduationYear: data.registration.graduationYear || "",
              hasLaptop: data.registration.hasLaptop || "",
              newAccountVerified: data.registration.newAccountVerified || "",
              skillsBoostEmail: data.registration.skillsBoostEmail || "",
              profileUrl: data.registration.profileUrl || "",
              termsAccepted: data.registration.termsAccepted || "",
              dataAcknowledgement: data.registration.dataAcknowledgement || "",
              completionAgreement: data.registration.completionAgreement || "",
            });
            setRegistrationStatus(data.registration.status);
            setLastSaved(data.registration.updatedAt ? new Date(data.registration.updatedAt) : null);
          }
        }
      } catch (error) {
        console.error('Error fetching registration:', error);
      }
    };

    if (session?.user?.email) {
      fetchRegistration();
    }
  }, [session]);

  const saveAsDraft = async () => {
    if (!session?.user?.email) return;
    
    try {
      setIsSaving(true);
      setError('');
      
      const response = await fetch('/api/cloud-study-jams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'draft' }),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      setLastSaved(new Date());
      setRegistrationStatus('draft');
    } catch (error) {
      console.error('Error saving draft:', error);
      setError('Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.termsAccepted !== "accept") {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    
    if (!session?.user?.email) {
      alert("You must be signed in to submit the registration.");
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/cloud-study-jams', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit registration');
      
      alert("Registration submitted successfully!");
      setRegistrationStatus('submitted');
      router.push('/cloud-study-jams');
    } catch (error) {
      console.error('Error submitting registration:', error);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Authentication Check */}
        {status === "loading" && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-lg text-gray-600">Loading...</p>
            </div>
          </div>
        )}

        {status === "unauthenticated" && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h3>
              <p className="text-gray-600 mb-4">You must be signed in to register for Cloud Study Jams.</p>
              <Link
                href="/auth/signin"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {status === "authenticated" && registrationStatus === "submitted" && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">✓ Registration Already Submitted</h3>
            <p className="text-sm text-green-800">
              You have already submitted your registration for Cloud Study Jams. Your registration is being processed.
            </p>
            <Link
              href="/cloud-study-jams"
              className="inline-block mt-4 text-green-700 font-semibold hover:text-green-900"
            >
              ← Back to Cloud Study Jams
            </Link>
          </div>
        )}

        {status === "authenticated" && registrationStatus !== "submitted" && (
          <>
            {/* Save Status */}
            {lastSaved && (
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Draft saved</strong> - Last saved: {lastSaved.toLocaleString()}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Google Cloud Study Jams
            </h1>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Campus Participant Enrolment Form
            </h2>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-gray-900 mb-2">[IMPORTANT] Disclaimer for GDG on Campus Organizer:</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              This form is provided only as a reference template. Organizers must create a copy of the form in their own 
              Google Drive to collect registrations from their participants. Please do not submit any responses in this form—any 
              submissions here will not be considered. All participant data should be collected through the organizer&apos;s own copied form.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">What is Google Cloud Study Jams?</h3>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">
              Google Cloud Study Jams introduce students to Google Cloud technologies through structured learning, 
              community engagement, and milestone-driven activities.
            </p>
            <ul className="text-gray-800 text-sm space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Correctly signed up participants will receive access to specific pathways on Google Cloud Skills Boost Platform.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>To participate in this campaign, you are required to be a part of a campus which has a GDG on Campus Organizer who confirmed interests via Campus Interest Form in the given deadline.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Important:</strong> All the recognition and milestones will be shared with your campus GDG on Campus Organizer. The program team will not be responsible for rewards for individual participants.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ensure and emphasize that you provide a NEW Skill Boosts Account link created after 20th September, 2025. Else we will not accept them in the campaign.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ensure you provide the correct email address linked to the NEW Google Cloud Skills Boosts account in the form. Else we will not accept them in the campaign.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>All the submitted data will go through system validations and anything that doesn&apos;t fall in the above criteria will be automatically rejected by the system. No exceptions can be made once the form is submitted.</span>
              </li>
            </ul>
            <p className="text-gray-800 text-sm mt-4">
              Thanks and looking forward to see you enrolled for the campaign 🙂
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Email */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">1. Email Address</h3>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address (extracted from signed in via Google) *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Section 2: Terms & Conditions */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">2. Terms & Conditions</h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
              <h4 className="font-bold text-gray-900 mb-4">TERMS AND CONDITIONS</h4>
              <div className="text-sm text-gray-800 space-y-4">
                <p>
                  Google reserves the right to determine Your eligibility for the Google Cloud Study Jams campaign.
                </p>
                <p>
                  By submitting this form, you, on behalf of yourself and the organization you represent, if applicable, (&quot;You&quot;) 
                  agree to these terms and conditions: The credit is valid for Google Cloud training and certification and is subject 
                  to Your acceptance of the applicable terms of service for the training and certification platforms. The credit is 
                  non-transferable and may not be sold or bartered. Unused credit expires on the date indicated on the media conveying 
                  the credit information. The credit may be issued in increments as You use the credit over the period of time during 
                  which the credit is valid. Offer void where prohibited by law. The credits do not have commercial value and may not 
                  be used for commercial purposes. Google reserves the right to determine an individual&apos;s eligibility for training and 
                  certification credits.
                </p>
                <p>
                  If You are a student, You represent that the credit can only be used in Your capacity as a student of Your educational 
                  institution for skill building and career development purposes and not for Your personal or hobby use.
                </p>
                <p>
                  In addition, Credits may not be used to engage in mining cryptocurrency unless you obtain Google&apos;s written consent 
                  in advance, which consent may be revoked by Google in its discretion at any time.
                </p>
                <p>
                  You represent that (i) the credit is consistent with all applicable laws and regulations, including relevant ethics 
                  rules and laws; (ii) the provision of credits will not negatively impact Google&apos;s current or future ability to do 
                  business with your educational institution, (iii) You are not a resident of a US embargoed country, (v) You are not 
                  ordinarily a resident in a US embargoed country, and (iv) You are not otherwise prohibited by applicable export 
                  controls and sanctions programs from participating in the credit redemption program.
                </p>
                <h4 className="font-bold text-gray-900 mt-4 mb-2">Communication & Tracking</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google may contact you via email to provision benefits and send surveys and other communication related to the Google Cloud Study Jams campaign.</li>
                  <li>By joining, you agree to Google Cloud Training & your &quot;GDG on Campus Organizer&quot; tracking your grades and other activity in the learning program.</li>
                  <li>By joining, you agree to share your contact information with your &quot;GDG on Campus Organizer&quot; so that they can reach out to you and help during the learning program.</li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I have read the above terms *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="terms"
                    value="accept"
                    checked={formData.termsAccepted === "accept"}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.value })}
                    className="mr-3"
                    required
                  />
                  <span className="text-sm text-gray-900">Yes, I accept the terms</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="terms"
                    value="decline"
                    checked={formData.termsAccepted === "decline"}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.value })}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-900">I decline (By declining, you will not receive Google Cloud Skills Boost Access Code for the program)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Personal Details */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">3. Your Details</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-800 font-medium mb-2">Gentle Reminder:</p>
              <ul className="text-sm text-gray-800 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure you know the GDG on Campus organiser and choose the right institution name before submitting because this campaign is primarily led by your campus Organiser only.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The Organiser will be the primary point of contact for you for any queries related to the campaign.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Graduation *
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  required
                  min="2024"
                  max="2030"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have access to a working internet connection and a laptop with latest chrome browser? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasLaptop"
                      value="yes"
                      checked={formData.hasLaptop === "yes"}
                      onChange={(e) => setFormData({ ...formData, hasLaptop: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span className="text-sm text-gray-900">Yes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Create Skills Boost Account */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">
              4. Create a NEW ACCOUNT on Google Cloud Skills Boost Platform
            </h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-800 mb-4">
                You may or may not have an account on Skills Boost Platform in the past. For everyone, we encourage you to 
                CREATE A NEW ACCOUNT on <a href="https://www.cloudskillsboost.google/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud Skills Boost</a> Platform 
                to be able to track your completions successfully.
              </p>
              <ol className="text-sm text-gray-800 space-y-2 list-decimal pl-6">
                <li>Navigate to https://www.cloudskillsboost.google/</li>
                <li>Click on &quot;Join&quot; & create a New Account with an email address not used with Skills Boost Platform in the past. (Creating an account is always free!)</li>
              </ol>
              <p className="text-sm text-gray-800 mt-4">
                <strong>Note:</strong> A New Account means creating the account on or after Sept 20, 2025 and before you submit the form.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Please verify that you have created a NEW account on Google Cloud Skills Boost on or after September 20th, 2025 *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="newAccountVerified"
                      value="verified"
                      checked={formData.newAccountVerified === "verified"}
                      onChange={(e) => setFormData({ ...formData, newAccountVerified: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span className="text-sm text-gray-900">I verify</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="skillsBoostEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm your email address linked to your Skills Boost Profile *
                </label>
                <input
                  type="email"
                  id="skillsBoostEmail"
                  required
                  value={formData.skillsBoostEmail}
                  onChange={(e) => setFormData({ ...formData, skillsBoostEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the email linked to your Skills Boost Profile"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Make sure to double check the email that you provide with no typos.
                  <br />
                  <strong>Important Note:</strong> Enter the email which you used for creating the Skill Boosts Profile above
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Profile URL */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">
              5. A few last steps... (MANDATORY)
            </h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-800 mb-4">
                Great! You have a Google Cloud Skills Boost account. Please do remember to share your profile below so that 
                we can track your progress in the program and send you your prizes when you win.
              </p>
              <ol className="text-sm text-gray-800 space-y-2 list-decimal pl-6">
                <li>Log-in to <a href="https://www.cloudskillsboost.google/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.cloudskillsboost.google/</a></li>
                <li>Then click on Profile icon &gt;&gt; Select Settings &gt;&gt; General account settings</li>
                <li>You can find the Public Profile section</li>
                <li>Now click on the check mark button &quot;Make profile public&quot; it make your profile public</li>
                <li>Click on update settings.</li>
              </ol>
              <p className="text-sm text-gray-800 mt-4">
                Here is a small video (just 1 minute) that will walk you through how to do this and get your profile URL - 
                <a href="https://www.youtube.com/watch?v=C7Zb3cqEkwA" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
                  https://www.youtube.com/watch?v=C7Zb3cqEkwA
                </a>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  [VERY IMPORTANT] Please share your Google Cloud Skills Boost Public Profile URL *
                </label>
                <input
                  type="url"
                  id="profileUrl"
                  required
                  value={formData.profileUrl}
                  onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://www.cloudskillsboost.google/public_profiles/PROFILE_ID"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Here&apos;s what it should look like - https://www.cloudskillsboost.google/public_profiles/PROFILE_ID
                  <br />
                  <strong className="text-red-600">DO NOT copy-paste this as your application will be REJECTED</strong>
                  <br />
                  Ensure you share your unique PROFILE_ID
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  By completing and submitting this form, you declare that the information provided is true and correct to the best of your knowledge. *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="dataAcknowledgement"
                      value="acknowledge"
                      checked={formData.dataAcknowledgement === "acknowledge"}
                      onChange={(e) => setFormData({ ...formData, dataAcknowledgement: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span className="text-sm text-gray-900">I Acknowledge</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  By signing up, you agree to complete the Learning Pathway on Google Cloud Skills Boost platform in the given deadline. *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="completionAgreement"
                      value="agree"
                      checked={formData.completionAgreement === "agree"}
                      onChange={(e) => setFormData({ ...formData, completionAgreement: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span className="text-sm text-gray-900">Yes, I Agree</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Important Points */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">
              Points to Note before you submit!
            </h3>
            <ul className="text-sm text-gray-800 space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>Please be patient and ensure you have submitted everything correctly.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>If you provided a WRONG Google Cloud Skills Boost profile URL above, then you application will be rejected!</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>If you already submitted an enrolment in the program before, note that any of your previous duplicate entries WILL BE DELETED and only your latest enrolment will be counted, thus you might lose out on important progress. So please DO NOT fill the form again.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>The submission of your form does not guarantee your participation to the campaign.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">•</span>
                <span>Also please note, this campaign is designed differently as compared to any of the previous Google Cloud campaigns run by Google Developer Groups Organisers in India. Please do not compare it to them.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span>In case of any queries, do remember to reach out to your GDG on Campus Organizers and they will help you!</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={saveAsDraft}
                  disabled={isSaving || isSubmitting}
                  className="bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isSaving ? "Saving..." : "Save as Draft"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isSaving || formData.termsAccepted !== "accept"}
                  className="bg-blue-600 text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                By clicking submit, you acknowledge that you have read and understood all the information provided.
              </p>
              <p className="text-xs text-gray-500">
                Save as Draft to save your progress without submitting. You can come back later to complete and submit your registration.
              </p>
            </div>
          </div>

          {/* Final Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2">Final Note:</h3>
            <p className="text-sm text-gray-800">
              This form is only a reference template to help you create your own registration form in your Drive.
            </p>
            <p className="text-sm text-gray-800 mt-2">
              <strong>Please remember:</strong> do not submit any responses in this form. Any responses collected here will 
              not be counted towards the campaign and will be disregarded.
            </p>
          </div>
        </form>
        </>
        )}
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
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
