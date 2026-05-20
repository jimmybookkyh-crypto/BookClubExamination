export default async function checkBookTitle(title) {

  const trimmedTitle = title.trim();
  const respone = await fetch(
    `/api/books?filters[title][$eq]=${encodeURIComponent(trimmedTitle)}`
  );

  const data = await respone.json();

  return data.data.length > 0;
}