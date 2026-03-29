import { FiCalendar, FiMapPin } from "react-icons/fi";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { formatDate } from "../../utils/formatDate";

const GalleryCard = ({ user, onSelectLocation }) => {
  const imageUrl = resolveImageUrl(user.image_url);

  return (
    <article className="soft-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={onSelectLocation}
        className="block w-full text-left"
        aria-label={`Show ${user.location} on map`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${user.location} uploaded by ${user.name}`}
            className="h-44 w-full object-cover object-center sm:h-48"
            loading="lazy"
          />
        ) : (
          <div className="flex h-44 items-center justify-center bg-slate-100 text-sm text-slate-500 sm:h-48">Image unavailable</div>
        )}
      </button>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700">{user.phone}</p>
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


