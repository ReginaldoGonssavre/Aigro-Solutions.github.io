import React, { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);

  // Efeito para buscar dados do usuário quando o token muda
  useEffect(() => {
    if (token) {
      getMe();
    } else {
      setUser(null);
    }
  }, [token]);

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

  async function getMe() {
    try {
      const res = await fetch('http://localhost:8000/auth/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setMsg(data.detail || 'Erro ao obter dados do usuário');
        setUser(null);
      }
    } catch (error) {
      setMsg('Erro de conexão ao obter dados do usuário.');
      setUser(null);
    }
  }

  async function quantum() {
    // Chamando o novo endpoint de número aleatório quântico
    try {
      const res = await fetch('http://localhost:8000/quantum/random-number', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluindo o token de autenticação
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(JSON.stringify(data, null, 2));
      } else {
        setMsg(data.detail || 'Erro ao acessar endpoint quântico');
      }
    } catch (error) {
      setMsg('Erro de conexão com o backend.');
    }
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
      {user && (
        <div>
          <h3>Bem-vindo, {user.username}!</h3>
          <p>Tipo de Licença: {user.license_type}</p>
        </div>
      )}
      <button onClick={getMe} disabled={!token}>Meus Dados</button>
      <button onClick={quantum} disabled={!token}>Quantum Job</button>
      <pre>{msg}</pre>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default App;
