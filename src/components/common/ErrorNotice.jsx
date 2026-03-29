const ErrorNotice = ({ message, onRetry }) => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="focus-ring mt-3 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
};

export default ErrorNotice;


