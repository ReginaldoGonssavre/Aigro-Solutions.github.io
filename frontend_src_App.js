import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);

  async function register(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const res = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.access_token);
        setMsg('Registro e Login bem-sucedidos!');
      } else {
        setMsg(data.detail || 'Erro no registro');
      }
    } catch (error) {
      setMsg('Erro de conexão com o backend.');
    }
  }

  async function login(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const form_data = new URLSearchParams();
      form_data.append('username', username);
      form_data.append('password', password);

      const res = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form_data.toString()
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.access_token);
        setMsg('Login bem-sucedido!');
      } else {
        setMsg(data.detail || 'Erro no login');
      }
    } catch (error) {
      setMsg('Erro de conexão com o backend.');
    }
  }

  // Removendo getMe por enquanto, será implementado um endpoint protegido no backend
  // async function getMe() {
  //   const res = await fetch('http://localhost:8000/users/me', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   setUser(await res.json());
  // }

  async function quantum() {
    // Chamando o novo endpoint de número aleatório quântico
    const res = await fetch('http://localhost:8000/quantum/random-number', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
  }

  return (
    <div>
      <h1>AigroQuantumSaaS Frontend</h1>
      <form onSubmit={register}>
        <h2>Registrar</h2>
        <input name="username" placeholder="Usuário" />
        <input name="password" type="password" placeholder="Senha" />
        <button type="submit">Registrar</button>
      </form>
      <form onSubmit={login}>
        <h2>Login</h2>
        <input name="username" placeholder="Usuário" />
        <input name="password" type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={getMe} disabled={!token}>Meus Dados</button>
      <button onClick={quantum} disabled={!token}>Quantum Job</button>
      <pre>{msg}</pre>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default App;