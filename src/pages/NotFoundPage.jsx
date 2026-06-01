import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="section-shell py-16">
      <div className="soft-card mx-auto max-w-xl space-y-5 p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-600">404</p>
        <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="text-sm text-slate-600">The page you are looking for does not exist. Explore the homepage instead.</p>
        <Link
          to="/"
          className="focus-ring inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;


