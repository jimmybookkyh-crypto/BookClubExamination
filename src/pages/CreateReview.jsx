import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useParams } from "react-router";
import useFetch from "../utils/useFetch";
import GetOneBook from "../components/GetOneBook";

CreateReview.route = {
  path: "/create-review/:documentId",
  index: 8,
};

export default function CreateReview() {
  const { user } = useOutletContext();
  const { documentId } = useParams();
  const formInitialState = { content: "", rating: "" };

  const [formData, setFormData] = useState(formInitialState);
  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [books, reviews, loading] = useFetch("/api/books", "/api/reviews");
  const [showReviews, setShowReviews] = useState(false);

  if (loading) {
    return;
  }

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

    try {
      const currentBook = books.find((book) => book.documentId === documentId);

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            content: formData.content,
            rating: formData.rating,

            book: documentId,

            user: user.id,
          },
        }),
      });

      const result = await response.json();

      console.log(result);

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
        <GetOneBook />
        <br />
        <h2>Recension skickad!</h2>
        <br />
        <div>
          <h3>Din recension:</h3>

          <p>{formData.content}</p>

          <p>Betyg: {formData.rating}/5</p>
        </div>
      </>
    );
  }

  return (
    <>
      <GetOneBook />
      <br />
      <h2>Skriv din recension</h2>
      <form onSubmit={sendForm}>
        <br />
        <label>
          Recension:
          <textarea
            required
            name="content"
            // type="text"
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
