import { useEffect, useState } from "react";
import { createUserEntry, uploadImage, updateUserEntry, deleteUserEntry } from "../api/galleryApi";
import ErrorNotice from "../components/common/ErrorNotice.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import GalleryCard from "../components/gallery/GalleryCard.jsx";
import LocationMap from "../components/map/LocationMap.jsx";
import { useUsers } from "../hooks/useUsers";
import { getErrorMessage } from "../utils/getErrorMessage";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { formatDate } from "../utils/formatDate";
import { FiX, FiCalendar, FiMapPin, FiPhone, FiMail, FiTrash2 } from "react-icons/fi";

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

  // Fullscreen, Edit, and Delete States
  const [selectedCard, setSelectedCard] = useState(null);

  const [editCard, setEditCard] = useState(null);
  const [editFormData, setEditFormData] = useState(initialForm);
  const [editFile, setEditFile] = useState(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState("");
  const [editSubmitLoading, setEditSubmitLoading] = useState(false);
  const [editSubmitError, setEditSubmitError] = useState("");

  const [deleteCard, setDeleteCard] = useState(null);
  const [deleteSubmitLoading, setDeleteSubmitLoading] = useState(false);
  const [deleteSubmitError, setDeleteSubmitError] = useState("");

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

  useEffect(() => {
    return () => {
      if (editPreviewUrl && !editPreviewUrl.startsWith("http")) {
        URL.revokeObjectURL(editPreviewUrl);
      }
    };
  }, [editPreviewUrl]);

  const openEditModal = (card) => {
    setEditCard(card);
    setEditFormData({
      name: card.name || "",
      email: card.email || "",
      phone: card.phone || "",
      location: card.location || "",
      description: card.description || "",
      travel_date: card.travel_date ? card.travel_date.split("T")[0] : "",
    });
    setEditFile(null);
    setEditPreviewUrl(card.image_url ? resolveImageUrl(card.image_url) : "");
    setEditSubmitError("");
  };

  const openDeleteConfirmation = (card) => {
    setDeleteCard(card);
    setDeleteSubmitError("");
  };

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

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    setEditSubmitError("");
    setEditSubmitLoading(true);

    try {
      let imageUrl = editCard.image_url;

      if (editFile) {
        const uploadResponse = await uploadImage(editFile);
        imageUrl = uploadResponse.image_url;
      }

      await updateUserEntry(editCard.id, {
        ...editFormData,
        image_url: imageUrl,
      });

      setEditCard(null);
      await refreshUsers();
    } catch (err) {
      setEditSubmitError(getErrorMessage(err));
    } finally {
      setEditSubmitLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteSubmitError("");
    setDeleteSubmitLoading(true);

    try {
      await deleteUserEntry(deleteCard.id);
      setDeleteCard(null);
      await refreshUsers();
    } catch (err) {
      setDeleteSubmitError(getErrorMessage(err));
    } finally {
      setDeleteSubmitLoading(false);
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
                onCardClick={setSelectedCard}
                onEditClick={openEditModal}
                onDeleteClick={openDeleteConfirmation}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Fullscreen Overlay Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all md:grid md:grid-cols-2">
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/50 text-white backdrop-blur-sm transition hover:bg-slate-900/80"
              aria-label="Close details"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="h-64 w-full md:h-full bg-slate-100">
              {selectedCard.image_url ? (
                <img
                  src={resolveImageUrl(selectedCard.image_url)}
                  alt={selectedCard.location}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Image unavailable
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    Traveler Story
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{selectedCard.name}</h2>
                  <div className="mt-2 flex flex-col gap-1 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <FiMail className="h-4 w-4 text-slate-400" /> {selectedCard.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiPhone className="h-4 w-4 text-slate-400" /> {selectedCard.phone}
                    </span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <p className="flex items-center gap-2 text-base font-semibold text-teal-700">
                    <FiMapPin className="h-4 w-4" />
                    {selectedCard.location}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {selectedCard.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <FiCalendar className="h-4 w-4" />
                  {formatDate(selectedCard.travel_date)}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLocation(selectedCard.location);
                    setSelectedCard(null);
                  }}
                  className="rounded-xl border border-teal-600 px-4 py-2 text-xs font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
                >
                  Show on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setEditCard(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
            >
              <FiX className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Travel Memory</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className={inputClassName}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className={inputClassName}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className={inputClassName}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Travel Date</label>
                  <input
                    type="date"
                    name="travel_date"
                    value={editFormData.travel_date}
                    onChange={(e) => setEditFormData({ ...editFormData, travel_date: e.target.value })}
                    className={inputClassName}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Describe Experience</label>
                <textarea
                  name="description"
                  rows="3"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className={inputClassName}
                  required
                />
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 p-3">
                <label className="mb-1 block text-xs font-semibold text-slate-700">Update Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setEditFile(file);
                    if (file) {
                      setEditPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                  className="focus-ring block w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs"
                />
                {editPreviewUrl && (
                  <img
                    src={editPreviewUrl}
                    alt="Preview"
                    className="mt-2 h-32 w-full rounded-xl object-cover"
                  />
                )}
              </div>

              {editSubmitError && <ErrorNotice message={editSubmitError} />}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditCard(null)}
                  className="focus-ring flex-1 rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitLoading}
                  className="focus-ring flex-1 rounded-xl bg-teal-600 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-70"
                >
                  {editSubmitLoading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FiTrash2 className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Journey?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete this memory by <span className="font-semibold">{deleteCard.name}</span>? This action is soft-deleting and cannot be undone.
            </p>

            {deleteSubmitError && (
              <div className="mb-4">
                <ErrorNotice message={deleteSubmitError} />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteCard(null)}
                disabled={deleteSubmitLoading}
                className="focus-ring flex-1 rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleteSubmitLoading}
                className="focus-ring flex-1 rounded-xl bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-70"
              >
                {deleteSubmitLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryPage;


