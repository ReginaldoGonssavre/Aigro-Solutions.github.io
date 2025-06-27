import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import the i18n configuration

function App() {
  const { t, i18n } = useTranslation();
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploadStatus(t('file_selected', { fileName: selectedFile.name, fileSize: (selectedFile.size / 1024).toFixed(2) }));
      // In a real application, you would send the file to a backend here.
      // For example, using FormData and fetch API:
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // fetch('/upload-endpoint', {
      //     method: 'POST',
      //     body: formData
      // })
      // .then(response => response.json())
      // .then(data => {
      //     setUploadStatus('Upload completed!');
      //     console.log(data);
      // })
      // .catch(error => {
      //     setUploadStatus('Upload failed.');
      //     console.error('Error:', error);
      // });
    } else {
      setUploadStatus(t('no_file_selected'));
    }
  };

  async function register(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    setMsg((await res.json()).msg || 'Erro');
  }

  async function login(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.access_token) {
      setToken(data.access_token);
      setMsg('Login ok');
    } else {
      setMsg('Erro login');
    }
  }

  async function getMe() {
    const res = await fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(await res.json());
  }

  async function quantum() {
    const prompt = window.prompt("Prompt para quantum (ex: superposição)?", "superposição");
    const res = await fetch('/api/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ module: 'quantum', prompt })
    });
    setMsg(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <div>
      <header>
        <h1>{t('welcome_title')}</h1>
        <div>
          <button onClick={() => changeLanguage('pt')}>Português</button>
          <button onClick={() => changeLanguage('en')}>English</button>
        </div>
      </header>
      <main>
        <section className="hero">
          <p>{t('welcome_subtitle')}</p>
          <button onClick={handleLearnMoreClick}>{t('learn_more')}</button>
        </section>

        <section className="features">
          <h2>{t('our_features')}</h2>
          <div className="feature-item">
            <h3>{t('quantum_optimization_title')}</h3>
            <p>{t('quantum_optimization_description')}</p>
          </div>
          <div className="feature-item">
            <h3>{t('hybrid_data_analysis_title')}</h3>
            <p>{t('hybrid_data_analysis_description')}</p>
          </div>
        </section>

        <section className="upload-section">
          <h2>{t('image_upload_title')}</h2>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button onClick={handleUpload}>{t('upload_button')}</button>
          <p>{uploadStatus}</p>
          <p><em>{t('upload_note')}</em></p>
        </section>

        <section id="about-section" style={{ padding: '20px', marginTop: '50px', borderTop: '1px solid #eee' }}>
          <h2>{t('about_title')}</h2>
          <p>{t('about_description')}</p>
        </section>

        {/* Existing authentication and quantum job sections */}
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
      </main>
      <footer>
        <p>&copy; 2024 Aigro Quantum SaaS. {t('all_rights_reserved')}</p>
      </footer>
    </div>
  );
}

export default App;
