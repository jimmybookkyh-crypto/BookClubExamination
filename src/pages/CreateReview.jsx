import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import useFetch from "../utils/useFetch";

CreateReview.route = {
  path: '/create-review'
};


export default function CreateReview() {
  const { user } = useOutletContext();
  const formInitialState = { content: '', rating: '' };

  const [formData, setFormData] = useState(formInitialState);
  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [books, reviews, loading] = useFetch('/api/books', '/api/reviews');
  const [showReviews, setShowReviews] = useState(false);

  if (loading) {
    return;
  }
  
  function updateFormData(event) {
    const { content: name, value } = event.target;
    setFormData({ ...formData, [name]: value }); 
  }

  async function sendForm(event) {
    event.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formData })
    });
    setFormSent(true);
  }

  if (formSent) {
        return <p>Recension skickad!</p>;
  }

    return <>
      <form onSubmit={sendForm}>
        <label>
          Recension:
          <textarea required name="content" type="text" placeholder="Skriv din recension här..." value={formData.content} onChange={updateFormData}></textarea>
        </label>
        <label>
          Betyg:
          <select required name="rating" value={formData.rating} onChange={updateFormData}>
            <option>Betygsätt din recension...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </label>
        <button type="submit">Skicka</button>
      </form>
    </>;
  }
