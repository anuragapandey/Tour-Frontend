import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createContactInquiry } from "../api/contactApi";

const DeleteAccountPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please fill in all required fields.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const description = `ACCOUNT DELETION REQUEST.\nReason: ${
        formData.reason || "No reason provided."
      }\n(Please delete this user's account and associated mobile application data.)`;

      await createContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        description: description,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", reason: "" });
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to submit request. Please try again or email us directly."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <main className="flex-1 max-w-lg w-full mx-auto px-6 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
              Request Account Deletion
            </h1>
            <p className="text-sm text-slate-500">
              Submit a request to permanently delete your Seven Hills Holidays account. We will process it within 3-5 business days.
            </p>
          </div>

          {submitStatus === "success" && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm mb-6">
              <p className="font-semibold mb-1">Request Submitted Successfully!</p>
              <p>We have logged your deletion request. All your profile information and saved trips will be permanently erased soon.</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm mb-6">
              <p className="font-semibold mb-1">Error Submitting Request</p>
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                placeholder="Enter your registered name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                placeholder="Enter your registered email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Reason for deletion (Optional)
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                placeholder="Why do you want to delete your account?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Request..." : "Request Account Deletion"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-sm border-t border-slate-800">
        <p>© 2026 Seven Hills Holidays. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeleteAccountPage;
