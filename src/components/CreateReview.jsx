import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useParams } from "react-router";
import useFetch from "../utils/useFetch";
import GetAllReviews from "./GetAllReviews";

// CreateReview.route = {
//   path: "create-review",
// };

const STRAPI_URL = "http://localhost:5001";

export default function CreateReview() {
  const { user } = useOutletContext().user;
  const { documentId } = useParams();
  const formInitialState = { content: "", rating: "" };

  const [formData, setFormData] = useState(formInitialState);
  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const [books, reviews, loading] = useFetch("/api/books", "/api/reviews");
  const [showReviews, setShowReviews] = useState(false);

  // if (loading) {
  //   return <p>Laddar formulär...</p>;
  // }

  function updateFormData(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  }

  async function sendForm(event) {
    event.preventDefault();
  console.log("localStorage.user:", localStorage.user);
  console.log("user från context:", user);
    try {
      // const currentBook = books.find((book) => book.documentId === documentId);

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.user).jwt}`,
        },
        body: JSON.stringify({
          data: {
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: formData.content
                  }
                ]
              }
            ],
            rating: Number(formData.rating),

            book: documentId,
            /* user: user.id, */
          },
        }),
      });

      const result = await response.json();

      console.log(result);

console.log("Strapi fel:", JSON.stringify(result.error, null, 2));

      if (!response.ok) {
        throw new Error(result.error?.message || "Något gick fel");
      }

      setFormSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  if (formSent) {
    return (
      <>
        <br />
        <h2>Recension skickad!</h2>
        <br />
        <div>
          <h3>Din recension:</h3>
          <p>Skriven av: {user.username}</p>

          <p>Recension: {formData.content}</p>

          <p>Betyg: {formData.rating}/5</p>
        </div>
      </>
    );
  }

  return (
    <>
      <br />
      <h2>Skriv din recension</h2>
      <form onSubmit={sendForm}>
        <br />
        <label>
          Recension:
          <textarea
            required
            name="content"
            type="text"
            placeholder="Skriv din recension här..."
            value={formData.content}
            onChange={updateFormData}
          ></textarea>
        </label>
        <br />
        <label>
          Betyg:
          <select
            required
            name="rating"
            value={formData.rating}
            onChange={updateFormData}
          >
            <option>Betygsätt din recension...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <br />
          <br />
        </label>
        <button type="submit">Skicka</button>
      </form>
    </>
  );
}
