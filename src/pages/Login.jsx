import { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router";

Login.route = {
  path: "/login",
  index: 11,
};

export default function Login() {
  const formInitialState = {
    identifier: "",
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
    const response = await fetch("/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error?.message || "Login failed");
      return;
    }
    localStorage.user = JSON.stringify(data);
    setUser(data);
    navigate("/");
  }
  return (
    <>
      <h2>Logga in</h2>
      <form onSubmit={sendForm}>
        <label>
          {" "}
          Användarnamn eller email:
          <input
            required
            name="identifier"
            type="text"
            value={formData.identifier}
            onChange={updateFormData}
          />
        </label>
        <label>
          {" "}
          Lösenord:
          <input
            required
            name="password"
            type="password"
            value={formData.password}
            onChange={updateFormData}
          />
        </label>
        <button type="submit"> Logga in </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Har du inget konto? <Link to="/register">Registrera här</Link>
      </p>
    </>
  );
}
