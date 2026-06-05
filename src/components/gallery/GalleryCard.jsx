import { useState } from "react";
import { FiCalendar, FiMapPin, FiEdit3, FiTrash2 } from "react-icons/fi";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { formatDate } from "../../utils/formatDate";

const GalleryCard = ({ user, onSelectLocation, onCardClick, onEditClick, onDeleteClick }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = resolveImageUrl(user.image_url);
  const shouldShowImage = imageUrl && !hasImageError;

  return (
    <article 
      onClick={() => {
        onSelectLocation();
        onCardClick(user);
      }}
      className="soft-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="relative">
        {shouldShowImage ? (
          <img
            src={imageUrl}
            alt={`${user.location} uploaded by ${user.name}`}
            className="h-44 w-full object-cover object-center sm:h-48"
            loading="lazy"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="flex h-44 items-center justify-center bg-slate-100 text-sm text-slate-500 sm:h-48">
            Image unavailable
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(user);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-teal-600 hover:text-white hover:scale-110"
            title="Edit Journey"
          >
            <FiEdit3 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(user);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-md backdrop-blur-sm transition hover:bg-red-600 hover:text-white hover:scale-110"
            title="Delete Journey"
          >
            <FiTrash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700">
            {user.phone}
          </p>
        </div>

        <p className="flex items-center gap-2 text-sm font-semibold text-teal-700">
          <FiMapPin />
          {user.location}
        </p>

        <p className="text-sm leading-relaxed text-slate-600">{user.description}</p>

        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <FiCalendar />
          {formatDate(user.travel_date)}
        </p>
      </div>
    </article>
  );
};

export default GalleryCard;
