export default function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  const maxVisible = 5; // show up to 5 pages around current

  // ✅ Build pagination buttons dynamically
  const renderPages = () => {
    const pages = [];
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // First page + ellipsis
    if (start > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => setPage(1)}
          className={`px-3 py-1 rounded ${
            page === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          1
        </button>
      );
      if (start > 2) pages.push(<span key="start-ellipsis">...</span>);
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page + ellipsis
    if (end < totalPages) {
      if (end < totalPages - 1)
        pages.push(<span key="end-ellipsis">...</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`px-3 py-1 rounded ${
            page === totalPages ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      {/* Prev button */}
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {renderPages()}

      {/* Next button */}
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
