export default async function uploadImage(file) {

  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error?.message || 'Det gick inte att ladda upp bilden');
  }

  const [uploaded] = await response.json();
  return uploaded;
}