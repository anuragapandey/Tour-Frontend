import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black text-teal-800 tracking-tight">
              SEVEN HILLS HOLIDAYS
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Last Updated: June 27, 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us when using our mobile application or website. This includes:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Personal Details:</strong> Name, email address, phone number, and physical address when you create an account, register a tour, or send inquiries.
                </li>
                <li>
                  <strong>Booking Information:</strong> Travel dates, destination choices, package customizations, and companion details.
                </li>
                <li>
                  <strong>Payment Data:</strong> All payments are processed securely via our gateway provider (Razorpay). We do not store your credit card, net banking, or UPI credentials on our servers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                We use the collected information for various purposes, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To customize, confirm, and manage your travel bookings and tour itineraries.</li>
                <li>To communicate with you regarding booking status, invoices, updates, and customer support.</li>
                <li>To send OTPs (One Time Passwords) for verifying your account creation and login credentials.</li>
                <li>To comply with legal obligations and prevent fraudulent transactions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                3. Information Sharing and Disclosure
              </h2>
              <p>
                We value your privacy and do not sell or lease your personal data. We share your information only with:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Travel Suppliers:</strong> Local tour operators, hotels, and transport coordinators only as required to deliver your booked services.
                </li>
                <li>
                  <strong>Service Providers:</strong> Payment processors (Razorpay), email dispatch networks (Resend/SMTP), and hosting partners.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> If required by law, regulation, or government mandate.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                4. Data Safety & Retention
              </h2>
              <p>
                We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data. We retain your travel records and account profiles only as long as necessary to fulfill booking contracts, satisfy tax requirements, or until you request account deletion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                5. Your Rights & Account Deletion
              </h2>
              <p>
                You have the right to access, update, or request the deletion of your personal data. You can delete your account and all associated data at any time:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>In-App Option:</strong> Navigate to the Settings tab inside the Seven Hills Holidays mobile application, and click on the "Delete account" option.
                </li>
                <li>
                  <strong>Web Request:</strong> Go to{" "}
                  <Link to="/delete-account" className="text-teal-600 hover:underline font-medium">
                    sevenhillsholidays.com/delete-account
                  </Link>{" "}
                  and submit a deletion request form. We will process your deletion request and erase your credentials from our database within 3 to 5 business days.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                6. Contact Us
              </h2>
              <p>
                For any questions or concerns regarding this Privacy Policy or your data, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Seven Hills Holidays</strong><br />
                Email:{" "}
                <a href="mailto:sevenhillsholiday@gmail.com" className="text-teal-600 hover:underline">
                  sevenhillsholiday@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-sm border-t border-slate-800">
        <p>© 2026 Seven Hills Holidays. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
