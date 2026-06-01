import { useEffect, useState } from "react";
import { createUserEntry, uploadImage } from "../api/galleryApi";
import ErrorNotice from "../components/common/ErrorNotice.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import GalleryCard from "../components/gallery/GalleryCard.jsx";
import LocationMap from "../components/map/LocationMap.jsx";
import { useUsers } from "../hooks/useUsers";
import { getErrorMessage } from "../utils/getErrorMessage";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  description: "",
  travel_date: "",
};

const inputClassName =
  "focus-ring w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400";

const GalleryPage = () => {
  const { users, loading, error, refreshUsers } = useUsers();

  const [formData, setFormData] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (!selectedLocation && users.length > 0) {
      setSelectedLocation(users[0].location);
    }
  }, [users, selectedLocation]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "location" && value.trim()) {
      setSelectedLocation(value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const resetForm = () => {
    setFormData(initialForm);
    setSelectedFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitMessage("");

    if (!selectedFile) {
      setSubmitError("Please upload an image before submitting the form.");
      return;
    }

    setSubmitLoading(true);

    try {
      const uploadResponse = await uploadImage(selectedFile);

      await createUserEntry({
        ...formData,
        image_url: uploadResponse.image_url,
      });

      setSubmitMessage("Trip details saved successfully. Gallery updated.");
      resetForm();
      await refreshUsers();
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="section-shell py-4 md:py-5">
      <SectionHeading
        eyebrow="Gallery + Upload"
        title="Share Your Travel Story"
        description="Upload an image first, then save the trip details. Photos are auto-corrected and shown in the gallery."
      />

      <div className="mt-5 grid items-start gap-4 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} className="soft-card space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Manali, Himachal Pradesh)"
            value={formData.location}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />

          <textarea
            name="description"
            placeholder="Describe your travel experience"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />

          <div className="rounded-2xl border border-dashed border-slate-300 p-3.5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="focus-ring block w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              required
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 h-40 w-full rounded-xl object-cover object-center"
              />
            ) : null}
          </div>

          {submitError ? <ErrorNotice message={submitError} /> : null}
          {submitMessage ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {submitMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitLoading}
            className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitLoading ? "Uploading and Saving..." : "Submit Travel Story"}
          </button>
        </form>

        <LocationMap location={selectedLocation || formData.location} />
      </div>

      <div className="mt-8">
        <SectionHeading
          eyebrow="Traveler Gallery"
          title="Latest Shared Journeys"
          description="Click any card to instantly update the map location."
        />

        {loading ? (
          <div className="mt-6">
            <LoadingSpinner label="Fetching travel gallery..." />
          </div>
        ) : null}

        {!loading && error ? (
          <div className="mt-6">
            <ErrorNotice message={error} onRetry={refreshUsers} />
          </div>
        ) : null}

        {!loading && !error && users.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No gallery entries yet. Be the first traveler to share a memory.
          </div>
        ) : null}

        {!loading && !error && users.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <GalleryCard
                key={user.id}
                user={user}
                onSelectLocation={() => setSelectedLocation(user.location)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GalleryPage;


