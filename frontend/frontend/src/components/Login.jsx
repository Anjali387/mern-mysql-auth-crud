import { useState } from 'react';
import API from '../api/axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    alert("Login Success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button>Login</button>
    </form>
  );
}

export default Login;
