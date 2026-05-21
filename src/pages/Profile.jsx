import { useState } from 'react';
import { useNavigate, useOutletContext, Navigate } from 'react-router';

Profile.route = {
  path: '/profile'
};

export default function Profile() {

  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();


  const formInitialState = {
    email: user?.user?.email || '',
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(formInitialState);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function logout() {
  delete localStorage.user;
  setUser(null);
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }

  function updateFormData(event) {
    const { name: key, value } = event.target;
    setFormData({ ...formData, [key]: value });
    setSaved(false);
  }

  async function sendForm(event) {
    event.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    const body = {
      email: formData.email,
      password: formData.password
    };
    if (!body.password) { delete body.password; }

    const response = await fetch('/api/users/' + user.user.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.jwt
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error?.message || 'Error saving changes');
      return;
    }

    const updated = { ...user, user: data };
    localStorage.user = JSON.stringify(updated);
    setUser(updated);
    setFormData({
      ...formData,
      password: '',
      confirmPassword: ''
    });
    setSaved(true);
  }

  return <>
    <h2>Konto för {user.user.username}</h2>
    <p>Redigera din profilinformation nedan.</p>
    <form onSubmit={sendForm}>
      <label>
        Byt Email:<br/>
        <input required name="email" type="email" value={formData.email} onChange={updateFormData} />
      </label><br/>
      <label>
        Byt lösenord: <small>(Minst 8 tecken)</small><br></br>
        <input minLength={8} name="password" type="password" value={formData.password} onChange={updateFormData} />
      </label><br />
      <label>
  Bekräfta nytt lösenord:<br />
  <input
    minLength={8}
    name="confirmPassword"
    type="password"
    value={formData.confirmPassword}
    onChange={updateFormData}
  />
</label><br />
      <button type="submit">Spara ändringar</button><br/>
      <button onClick={() => navigate('/')}>
        Avbryt</button><br/>
      <button onClick={logout}>Logga ut</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {saved && <p style={{ color: 'green' }}>Ändringar sparade.</p>}
    </form>
  </>;
}
