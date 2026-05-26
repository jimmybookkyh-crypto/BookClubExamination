import { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router";

Register.route = {
  path: "/register",
  index: 11,
};

export default function Register() {
  const formInitialState = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formInitialState);
  const [error, setError] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  function updateFormData(event) {
    const { name: key, value } = event.target;
    setFormData({ ...formData, [key]: value });
  }
  async function sendForm(event) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/auth/local/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error?.message || "Registration failed");
      return;
    }
    localStorage.user = JSON.stringify(data);
    setUser(data);
    navigate("/");
  }
  return (
    <>
      <h2>Registrera konto</h2>
      <form onSubmit={sendForm}>
        <label>
          {" "}
          Användarnamn:
          <input
            required
            name="username"
            type="text"
            value={formData.username}
            onChange={updateFormData}
          />
        </label>
        <label>
          {" "}
          E-postaddress:
          <input
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={updateFormData}
          />
        </label>
        <label>
          {" "}
          Lösenord: <small>(minst 8 tecken)</small>
          <input
            required
            minlenght={8}
            name="password"
            type="password"
            value={formData.password}
            onChange={updateFormData}
          />
        </label>
        <button type="submit"> Skapa konto </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Har du redan konto? <Link to="/login">Logga in här</Link>
      </p>
    </>
  );
}
