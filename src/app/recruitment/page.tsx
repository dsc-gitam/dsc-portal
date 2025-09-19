"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Header from "@/components/Header";

interface FormData {
  // Personal Information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  
  // Academic Information
  studentId?: string;
  yearOfStudy?: string;
  branch?: string;
  cgpa?: string;
  
  // Role Selection
  selectedRole?: string;
  
  // Technical Skills
  programmingLanguages?: string;
  githubProfile?: string;
  linkedinProfile?: string;
  
  // Motivation
  whyJoin?: string;
  howContribute?: string;
  
  // Experience
  previousExperience?: string;
  leadershipExperience?: string;
  
  // Technical Tasks
  selectedTask?: string;
  taskSubmission?: string;
  
  // Availability
  availability?: string;
  hoursPerWeek?: string;
  
  // Additional Information
  passionProject?: string;
  challengeProposal?: string;
  additionalInfo?: string;
}

export default function RecruitmentPage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({});
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState("");

  // Define required fields for progress calculation
  const requiredFields = [
    'firstName', 'lastName', 'email', 'phone',
    'studentId', 'yearOfStudy', 'branch', 'cgpa',
    'selectedRole', 'programmingLanguages', 'whyJoin', 'howContribute',
    'availability', 'hoursPerWeek', 'passionProject', 'challengeProposal'
  ];

  // Calculate progress based on filled required fields
  useEffect(() => {
    const filledFields = requiredFields.filter(field => formData[field as keyof FormData]?.trim()).length;
    const newProgress = Math.round((filledFields / requiredFields.length) * 100);
    setProgress(newProgress);
  }, [formData]);

  // Load saved form data from database
  useEffect(() => {
    if (session?.user?.email) {
      loadApplicationData();
    }
  }, [session]);

  const loadApplicationData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/recruitment');
      if (response.ok) {
        const data = await response.json();
        if (data.application) {
          const { application } = data;
          setFormData({
            firstName: application.firstName || '',
            lastName: application.lastName || '',
            email: application.email || session?.user?.email || '',
            phone: application.phone || '',
            studentId: application.studentId || '',
            yearOfStudy: application.yearOfStudy || '',
            branch: application.branch || '',
            cgpa: application.cgpa || '',
            selectedRole: application.selectedRole || '',
            programmingLanguages: application.programmingLanguages || '',
            githubProfile: application.githubProfile || '',
            linkedinProfile: application.linkedinProfile || '',
            whyJoin: application.whyJoin || '',
            howContribute: application.howContribute || '',
            previousExperience: application.previousExperience || '',
            leadershipExperience: application.leadershipExperience || '',
            selectedTask: application.selectedTask || '',
            taskSubmission: application.taskSubmission || '',
            availability: application.availability || '',
            hoursPerWeek: application.hoursPerWeek || '',
            passionProject: application.passionProject || '',
            challengeProposal: application.challengeProposal || '',
            additionalInfo: application.additionalInfo || '',
          });
          setLastSaved(new Date(application.updatedAt));
        } else {
          // Pre-fill email from session
          setFormData(prev => ({ ...prev, email: session?.user?.email || '' }));
        }
      }
    } catch (error) {
      console.error('Error loading application data:', error);
      setError('Failed to load saved data');
    } finally {
      setIsLoading(false);
    }
  };

  const saveFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveToDatabase = async (showSuccessMessage = true) => {
    if (!session?.user?.email) return;
    
    try {
      setIsSaving(true);
      setError('');
      
      const response = await fetch('/api/recruitment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLastSaved(new Date());
        if (showSuccessMessage) {
          // You could show a toast notification here
        }
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  const submitApplication = async () => {
    if (!session?.user?.email) return;
    
    try {
      setIsSaving(true);
      setError('');
      
      const response = await fetch('/api/recruitment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to confirmation page
        window.location.href = '/confirmation';
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">⏳</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        {/* Authentication Required */}
        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">🔒</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h1>
            <p className="text-gray-600 mb-8">
              Please sign in with your GITAM email address to access the recruitment form.
            </p>
            <button
              onClick={() => signIn('google')}
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In to Continue
            </button>
            <div className="mt-6">
              <Link 
                href="/"
                className="text-primary hover:text-blue-600 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-primary-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">📝</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              GDGoC GITAM <span className="text-primary">Core Team Application</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the core team and help shape the future of technology at GITAM University.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Application Progress</span>
              <span className="text-sm font-medium text-primary">{progress}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-primary-secondary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {lastSaved && (
              <p className="text-xs text-gray-500 mt-2">
                Last saved: {lastSaved.toLocaleString()}
              </p>
            )}
            {isSaving && (
              <p className="text-xs text-blue-600 mt-2">Saving...</p>
            )}
          </div>

          {/* Save and Error Messages */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => saveToDatabase()}
              disabled={isSaving || isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Progress'}
            </button>
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
        {/* Application Form */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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
                    value={formData.firstName || ""}
                    onChange={(e) => saveFormData('firstName', e.target.value)}
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
                    value={formData.lastName || ""}
                    onChange={(e) => saveFormData('lastName', e.target.value)}
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
                    value={formData.email || ""}
                    onChange={(e) => saveFormData('email', e.target.value)}
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
                    value={formData.phone || ""}
                    onChange={(e) => saveFormData('phone', e.target.value)}
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
                    value={formData.studentId || ""}
                    onChange={(e) => saveFormData('studentId', e.target.value)}
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
                    value={formData.yearOfStudy || ""}
                    onChange={(e) => saveFormData('yearOfStudy', e.target.value)}
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
                    value={formData.branch || ""}
                    onChange={(e) => saveFormData('branch', e.target.value)}
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

            {/* Motivation & Goals */}
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

                {/* Commitment & Availability Subsection */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">Commitment & Availability</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-2">
                        What is your current class schedule like, and how many hours per week can you realistically dedicate to the GDG? *
                      </label>
                      <textarea
                        id="schedule"
                        name="schedule"
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Describe your class schedule and available hours for GDG activities..."
                      />
                    </div>
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                        Are you planning to stay in the city during the entire semester/academic year? *
                      </label>
                      <select
                        id="availability"
                        name="availability"
                        required
                        onChange={(e) => setShowAvailabilityQuestion(e.target.value === "no")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      >
                        <option value="">Select your availability</option>
                        <option value="yes">Yes, I will be available for the entire semester/academic year</option>
                        <option value="no">No, I will have limited availability</option>
                      </select>
                    </div>
                    {showAvailabilityQuestion && (
                      <div className="pl-4 border-l-4 border-secondary">
                        <label htmlFor="availabilityDuration" className="block text-sm font-medium text-gray-700 mb-2">
                          For how long will you be available? *
                        </label>
                        <textarea
                          id="availabilityDuration"
                          name="availabilityDuration"
                          required
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Please specify the duration of your availability..."
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* More About Your Passion Subsection */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">More About Your Passion</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="passionProject" className="block text-sm font-medium text-gray-700 mb-2">
                        Describe a time you worked on a project you were genuinely passionate about. What did you do, what were the challenges, and what was the outcome? *
                      </label>
                      <textarea
                        id="passionProject"
                        name="passionProject"
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Share details about a project that truly excited you..."
                      />
                    </div>
                    <div>
                      <label htmlFor="challengeProposal" className="block text-sm font-medium text-gray-700 mb-2">
                        Based on our club&apos;s goals, what is one major challenge you anticipate we will face, and how would you propose we overcome it? *
                      </label>
                      <textarea
                        id="challengeProposal"
                        name="challengeProposal"
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Identify a potential challenge and propose your solution..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Preference */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Role Preference</h2>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.selectedRole || ""}
                  onChange={(e) => {
                    saveFormData('selectedRole', e.target.value);
                    saveFormData('selectedTask', ""); // Reset selected task when role changes
                  }}
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

            {/* Department-Specific Tasks - Conditional Rendering */}
            {formData.selectedRole && (
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Department-Specific Tasks</h2>
                
                {/* Technical Role Tasks */}
                {formData.selectedRole === "technical" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Technical Challenge</h3>
                      <p className="text-blue-800 text-sm">
                        Choose one of the following tasks and share a link to a GitHub repository or a live demo of your work. 
                        The goal is to see your thought process, not a perfect project.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="tech-task-1"
                          name="technicalTask"
                          value="events-webpage"
                          checked={formData.selectedTask === "events-webpage"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="tech-task-1" className="text-sm text-gray-700">
                          Build a simple webpage that displays all upcoming GDG events. Events can be hardcoded.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="tech-task-2"
                          name="technicalTask"
                          value="hello-world-app"
                          checked={formData.selectedTask === "hello-world-app"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="tech-task-2" className="text-sm text-gray-700">
                          Create a basic &quot;Hello World&quot; app with a button that changes the text on the screen.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="tech-task-3"
                          name="technicalTask"
                          value="api-script"
                          checked={formData.selectedTask === "api-script"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="tech-task-3" className="text-sm text-gray-700">
                          Write a Python script that uses a public API to fetch data and performs a simple analysis.
                        </label>
                      </div>
                    </div>
                    {formData.selectedTask && (
                      <div>
                        <label htmlFor="taskSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                          GitHub Repository or Live Demo Link *
                        </label>
                        <input
                          type="url"
                          id="taskSubmission"
                          name="taskSubmission"
                          required
                          value={formData.taskSubmission || ""}
                          onChange={(e) => saveFormData('taskSubmission', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="https://github.com/username/project or https://your-demo.com"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Marketing & Creative Role Tasks */}
                {(formData.selectedRole === "marketing" || formData.selectedRole === "design") && (
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-medium text-red-900 mb-2">Marketing & Creative Challenge</h3>
                      <p className="text-red-800 text-sm">
                        Choose one of the following tasks and share a link to your work.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="marketing-task-1"
                          name="marketingTask"
                          value="social-media-graphic"
                          checked={formData.selectedTask === "social-media-graphic"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="marketing-task-1" className="text-sm text-gray-700">
                          Design a simple social media graphic to promote a &quot;GDG Meet and Greet&quot; event.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="marketing-task-2"
                          name="marketingTask"
                          value="newsletter-draft"
                          checked={formData.selectedTask === "newsletter-draft"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="marketing-task-2" className="text-sm text-gray-700">
                          Draft a sample email newsletter to the community announcing the new core team.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="marketing-task-3"
                          name="marketingTask"
                          value="video-reel"
                          checked={formData.selectedTask === "video-reel"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="marketing-task-3" className="text-sm text-gray-700">
                          Create a 15-second &quot;reel&quot; or short video using provided photos or public GDG footage.
                        </label>
                      </div>
                    </div>
                    {formData.selectedTask && (
                      <div>
                        <label htmlFor="taskSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                          Link to Your Work *
                        </label>
                        <input
                          type="url"
                          id="taskSubmission"
                          name="taskSubmission"
                          required
                          value={formData.taskSubmission || ""}
                          onChange={(e) => saveFormData('taskSubmission', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="https://drive.google.com/... or https://your-work-link.com"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Operations & Partnerships Role Tasks */}
                {(formData.selectedRole === "events" || formData.selectedRole === "content" || formData.selectedRole === "lead") && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-900 mb-2">Operations & Partnerships Challenge</h3>
                      <p className="text-green-800 text-sm">
                        Choose one of the following tasks and submit your response below.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="ops-task-1"
                          name="operationsTask"
                          value="partnership-email"
                          checked={formData.selectedTask === "partnership-email"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="ops-task-1" className="text-sm text-gray-700">
                          Draft a professional email to a local company proposing a partnership or sponsorship for a workshop.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="ops-task-2"
                          name="operationsTask"
                          value="project-outline"
                          checked={formData.selectedTask === "project-outline"}
                          onChange={(e) => saveFormData('selectedTask', e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <label htmlFor="ops-task-2" className="text-sm text-gray-700">
                          Outline a project idea for the community. Describe the project&apos;s goal, the steps to complete it, and how it would benefit the members.
                        </label>
                      </div>
                    </div>
                    {formData.selectedTask && (
                      <div>
                        <label htmlFor="taskSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Response *
                        </label>
                        <textarea
                          id="taskSubmission"
                          name="taskSubmission"
                          required
                          rows={6}
                          value={formData.taskSubmission || ""}
                          onChange={(e) => saveFormData('taskSubmission', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Enter your detailed response here..."
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={submitApplication}
                disabled={isSaving || progress < 80}
                className="bg-gradient-primary-secondary text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Submitting...' : 'Submit Application'}
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
              You&apos;ll receive a confirmation email immediately after submitting your application
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Our team will review your application within 3-5 business days
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              If shortlisted, you&apos;ll be able to book an interview slot through this portal
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
