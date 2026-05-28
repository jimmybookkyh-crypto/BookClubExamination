export default function buildBooksUrl(search, page, pageSize) {
  if (search?.trim()) {
    return `/api/books/search/${encodeURIComponent(search)}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  }

  return `/api/books?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
}
