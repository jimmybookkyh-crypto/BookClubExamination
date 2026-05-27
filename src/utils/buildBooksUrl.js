export default function buildBooksUrl(search, page, pageSize) {
  if (search?.trim()) {
    return `/api/books/search/${search}`;
  }

  return `/api/books?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
}
