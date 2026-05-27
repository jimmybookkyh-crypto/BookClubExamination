import { useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../utils/useFetch";
import checkBookTitle from "../utils/checkBookTitle";
import uploadImage from "../utils/uploadImage";

CreateBook.route = {
  path: '/create-book'
}

const formInitialState = {
  title: "",
  author: "0",
  newAuthorFirstName: "",
  newAuthorLastName: "",
  genre: "0",
  year: "",
  description: ""
};

export default function CreateBook() {
  const [formData, setFormData] = useState(formInitialState);
  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [authorsData, bookGenres, loading] = useFetch(
    "/api/authors?pagination[pageSize]=1000&sort=firstName,lastName",
    "/api/genres?pagination[pageSize]=1000&sort=name"
  );  
  const [bookAuthors, setBookAuthors] = useState([]);

  const [showAuthorInput, setShowAuthorInput] = useState(false);
  
  if (loading) { return <p>Laddar...</p>; }

  if (bookAuthors.length === 0 && authorsData.length > 0) {
    setBookAuthors(authorsData);
  }
  
  function updateFormData(event) {
    const { name: key, value } = event.target;
    setFormData({ ...formData, [key]: value });
  }

async function sendForm(event) {

  event.preventDefault();
  setError('');

  if (!localStorage.user) {
    setError('Du måste vara inloggad för att kunna lägga till en bok.');
    return;
  }
  
  let imageId = null;
    if (imageFile) {
      try {
        const uploaded = await uploadImage(imageFile);
        imageId = uploaded.id;
      } catch (err) {
        setError(err.message);
        return;
      }
    }
  // måste välja author
  if (!showAuthorInput && formData.author === "0") {
    setError("Du måste välja eller skapa en författare.");
    return;
  }
  // kontroll för ny author
  if ( showAuthorInput &&
    (
      !formData.newAuthorFirstName.trim() ||
      !formData.newAuthorLastName.trim()
    )
  ) {
    setError("Fyll i både förnamn och efternamn.");
    return;
  }
  // måste välja en genre
    if (
    formData.genre === "0" ||
    formData.genre === ""
  )
  {
    setError("Du måste välja en genre.");
    return;
  }
  const titleExists = await checkBookTitle(formData.title);
  if (titleExists) {
    setError('En bok med den titeln finns redan.');
    return;
  }

  let authorId = formData.author;
  // skapa ny author
if (showAuthorInput) {
  const authorResponse = await fetch('/api/authors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.user).jwt}`
    },
    body: JSON.stringify({
      data: {
        firstName: formData.newAuthorFirstName,
        lastName: formData.newAuthorLastName
      }
    })
  });

  const authorData = await authorResponse.json();

  authorId = authorData.data.documentId;

  setBookAuthors(prev => [
    ...prev,
    authorData.data
  ]);
}
  // skapa ny book
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.user).jwt}`},
    body: JSON.stringify({
      data: {
        title: formData.title,
        year: formData.year,
        description: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: formData.description
              }
            ]
          }
        ],
        genre: formData.genre === "0" ? [] : [formData.genre],
        author: authorId === '0' ? null : authorId,
        image: imageId ? imageId : null
      }
    })
  });
if (!response.ok) {
  setError('Kunde inte lägga till boken.');
  return;
}

setFormSent(true);
}

function setAuthor(event) {
  const isNew = event.target.value === "__new__";
  setShowAuthorInput(isNew);
  setFormData({ ...formData, author: isNew ? "" : event.target.value });
}
  if (formSent) {
    return <>
      <p> Boken {formData.title} har blivit tillagd.</p>
      <button onClick={() => {
        setFormSent(false);
        setFormData({ ...formInitialState });
        setShowAuthorInput(false);
      }}> Lägg till en till bok</button>
      <button onClick={() => navigate('/')}>
        Gå till startsida</button>
    </>;
    
  } else {

    return <>
      <h2>Lägg till en ny bok</h2>
      <form onSubmit={sendForm}>
        <label>
          Titel:<br/>
          <input required name="title" type="text" placeholder="Titel" value={formData.title} onChange={updateFormData} />
        </label><br/>
        <label>
          Författare:<br/>
          <select name="author" value={formData.author} onChange={setAuthor}>
          <option value="0">Välj författare</option>
            {
              bookAuthors.map(({ documentId, firstName, lastName }) => (
                <option key={documentId} value={documentId}>
                  {firstName} {lastName}
                </option>
              ))
            }
            <option value="__new__">Lägg till ny författare...</option>
          </select>
          { showAuthorInput && (
              <>
                <label>
                  Förnamn:
                  <input required name="newAuthorFirstName" type="text" value={formData.newAuthorFirstName} onChange={updateFormData} />                  
                </label>
                <label>
                  Efternamn:
                  <input required name="newAuthorLastName" type="text" value={formData.newAuthorLastName} onChange={updateFormData} />
                </label>
              </>)
          }
        </label><br/>
        <label>
          Genre:<br/>
          <select name="genre" value={formData.genre} onChange={updateFormData}>
          <option value="0">Välj genre</option>
            {bookGenres.map(({ documentId, name }) =>
              <option key={documentId} value={documentId}>
                {name}
              </option>
            )}
          </select>
        </label><br/>
        <label>
          Utgivningsår:<br/>
          <input required name="year" type="number" placeholder="" value={formData.year} onChange={updateFormData} />
        </label>
        <label><br/>
          Beskrivning:<br/>
          <textarea
            required
            name="description"
            type="text"
            placeholder="Kort beskrivning"
            value={formData.description}
            onChange={updateFormData}
          />
        </label>
        <label><br/>
              Omslagsbild (valfri):<br/>
              <input 
                type="file"
                accept="image/*"
                onChange={event => setImageFile(event.target.files[0] || null)}
              />
        </label><br/>
        <button type="submit">Lägg till bok</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>;
    
  }
}