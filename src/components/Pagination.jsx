export default function Pagination({ page, pageCount, setPage }) {
  function goToPage(newPage) {
    setPage(newPage);
    scrollTo(0, 0);
  }

  const startPage = page <= 2 ? 1 : page - 1;
  const endPage = Math.min(startPage + 2, pageCount);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div>
      <p>
        <b>
          Sida {page}/{pageCount}
        </b>
      </p>

      <p>
        <button disabled={page <= 1} onClick={() => goToPage(page - 1)}>
          Föregående
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={pageNumber === page}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button disabled={page >= pageCount} onClick={() => goToPage(page + 1)}>
          Nästa
        </button>
      </p>
    </div>
  );
}
