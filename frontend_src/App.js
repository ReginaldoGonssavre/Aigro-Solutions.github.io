import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './i18n'; // Import the i18n configuration
import EULAPage from './EULAPage';

// Componentes para organizar o layout
const Header = ({ changeLanguage, t }) => (
  <header>
    <h1><Link to="/">{t('welcome_title')}</Link></h1>
    <div className="language-selector">
      <button onClick={() => changeLanguage('pt')}>Português</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  </header>
);

const HeroSection = ({ handleLearnMoreClick, t }) => (
  <section className="hero">
    <p>{t('welcome_subtitle')}</p>
    <button onClick={handleLearnMoreClick}>{t('learn_more')}</button>
  </section>
);

const FeaturesSection = ({ t }) => (
  <section className="features">
    <h2>{t('our_features')}</h2>
    <div className="feature-grid">
      <div className="feature-item">
        <h3>{t('quantum_optimization_title')}</h3>
        <p>{t('quantum_optimization_description')}</p>
      </div>
      <div className="feature-item">
        <h3>{t('hybrid_data_analysis_title')}</h3>
        <p>{t('hybrid_data_analysis_description')}</p>
      </div>
    </div>
  </section>
);

const ProductsSection = ({ t }) => (
  <section className="products">
    <h2>{t('our_products_title')}</h2>
    <div className="product-grid">
      <div className="product-item">
        <h3>{t('product_1_name')}</h3>
        <h4>{t('product_1_tagline')}</h4>
        <p>{t('product_1_description')}</p>
      </div>
      <div className="product-item">
        <h3>{t('product_2_name')}</h3>
        <h4>{t('product_2_tagline')}</h4>
        <p>{t('product_2_description')}</p>
      </div>
      <div className="product-item">
        <h3>{t('product_3_name')}</h3>
        <h4>{t('product_3_tagline')}</h4>
        <p>{t('product_3_description')}</p>
      </div>
      <div className="product-item">
        <h3>{t('product_4_name')}</h3>
        <h4>{t('product_4_tagline')}</h4>
        <p>{t('product_4_description')}</p>
      </div>
    </div>
  </section>
);

const ImageUploadSection = ({ handleFileChange, handleUpload, selectedFile, uploadStatus, t }) => (
  <section className="upload-section">
    <h2>{t('image_upload_title')}</h2>
    <input type="file" onChange={handleFileChange} accept="image/*" />
    <button onClick={handleUpload}>{t('upload_button')}</button>
    <p>{uploadStatus}</p>
    <p><em>{t('upload_note')}</em></p>
  </section>
);

const AboutSection = ({ t }) => (
  <section id="about-section">
    <h2>{t('about_title')}</h2>
    <p>{t('about_description')}</p>
  </section>
);

const AuthSection = ({ register, login, getMe, quantum, token, msg, user, t, 
  predictAerospaceTrajectory, predictAutomotiveMaintenance, 
  assessMaritimeSupplyChainRisk, assessSpaceCybersecurity, 
  optimizeAutomotiveCharging, designAeroMaterial, 
  analyzeMaritimeStructuralIntegrity, enhanceSpaceNavigationPrecision
}) => (
  <section className="auth-section">
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

    {/* New Product Demo Buttons */}
    <h2>Product Demos (Requires Login)</h2>
    <button onClick={predictAerospaceTrajectory} disabled={!token}>Predict Aerospace Trajectory</button>
    <button onClick={predictAutomotiveMaintenance} disabled={!token}>Predict Auto Maintenance</button>
    <button onClick={assessMaritimeSupplyChainRisk} disabled={!token}>Assess Maritime Risk</button>
    <button onClick={assessSpaceCybersecurity} disabled={!token}>Assess Space Security</button>
    <button onClick={optimizeAutomotiveCharging} disabled={!token}>Optimize Auto Charging</button>
    <button onClick={designAeroMaterial} disabled={!token}>Design Aero Material</button>
    <button onClick={analyzeMaritimeStructuralIntegrity} disabled={!token}>Analyze Maritime Integrity</button>
    <button onClick={enhanceSpaceNavigationPrecision} disabled={!token}>Enhance Space Nav Precision</button>

    <pre>{msg}</pre>
    {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
  </section>
);

const Footer = ({ t }) => (
  <footer>
    <p>&copy; 2024 Aigro Quantum SaaS. {t('all_rights_reserved')}</p>
    <p><Link to="/eula">{t('eula_link')}</Link></p>
  </footer>
);

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

  const handleUpload = async () => {
    if (selectedFile) {
      setUploadStatus(t('file_selected', { fileName: selectedFile.name, fileSize: (selectedFile.size / 1024).toFixed(2) }));
      const formData = new FormData();
      formData.append('data', selectedFile);

      try {
        const res = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setUploadStatus(data.message || 'Upload failed.');
      } catch (error) {
        console.error('Upload error:', error);
        setUploadStatus('Error during upload.');
      }
    } else {
      setUploadStatus(t('no_file_selected'));
    }
  };

  // New functions for product-specific API calls
  const callProductApi = async (endpoint, payload = {}) => {
    if (!token) {
      setMsg('Please login first to use product demos.');
      return;
    }
    try {
      setMsg(`Calling ${endpoint}...`);
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setMsg(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      setMsg(`Error calling ${endpoint}.`);
    }
  };

  const predictAerospaceTrajectory = () => callProductApi('/api/predict/aerospace-trajectory', { data: 'sample_trajectory_data' });
  const predictAutomotiveMaintenance = () => callProductApi('/api/predict/automotive-maintenance', { sensorData: 'sample_sensor_data' });
  const assessMaritimeSupplyChainRisk = () => callProductApi('/api/risk/maritime-supply-chain', { manifest: 'sample_manifest', route: 'sample_route' });
  const assessSpaceCybersecurity = () => callProductApi('/api/risk/space-cybersecurity', { systemId: 'sample_system_id' });
  const optimizeAutomotiveCharging = () => callProductApi('/api/eco/automotive-charging-optimization', { vehicleId: 'sample_vehicle_id', location: 'sample_location', time: 'sample_time' });
  const designAeroMaterial = () => callProductApi('/api/eco/aero-material-design', { materialSpecs: 'sample_material_specs' });
  const analyzeMaritimeStructuralIntegrity = () => callProductApi('/api/sense/maritime-structural-integrity', { sensorReadings: 'sample_sensor_readings' });
  const enhanceSpaceNavigationPrecision = () => callProductApi('/api/sense/space-navigation-precision', { navData: 'sample_nav_data' });

  async function register(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await fetch('http://localhost:3000/api/register', {
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
    const res = await fetch('http://localhost:3000/api/login', {
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
    const res = await fetch('http://localhost:3000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(await res.json());
  }

  async function quantum() {
    const prompt = window.prompt("Prompt para quantum (ex: superposição)?", "superposição");
    const res = await fetch('http://localhost:3000/api/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ module: 'quantum', prompt })
    });
    setMsg(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <Router>
      <div>
        <Header changeLanguage={changeLanguage} t={t} />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection handleLearnMoreClick={handleLearnMoreClick} t={t} />
                <FeaturesSection t={t} />
                <ProductsSection t={t} />
                <ImageUploadSection 
                  handleFileChange={handleFileChange}
                  handleUpload={handleUpload}
                  selectedFile={selectedFile}
                  uploadStatus={uploadStatus}
                  t={t}
                />
                <AboutSection t={t} />
                <AuthSection 
                  register={register}
                  login={login}
                  getMe={getMe}
                  quantum={quantum}
                  token={token}
                  msg={msg}
                  user={user}
                  t={t}
                  predictAerospaceTrajectory={predictAerospaceTrajectory}
                  predictAutomotiveMaintenance={predictAutomotiveMaintenance}
                  assessMaritimeSupplyChainRisk={assessMaritimeSupplyChainRisk}
                  assessSpaceCybersecurity={assessSpaceCybersecurity}
                  optimizeAutomotiveCharging={optimizeAutomotiveCharging}
                  designAeroMaterial={designAeroMaterial}
                  analyzeMaritimeStructuralIntegrity={analyzeMaritimeStructuralIntegrity}
                  enhanceSpaceNavigationPrecision={enhanceSpaceNavigationPrecision}
                />
              </>
            } />
            <Route path="/eula" element={<EULAPage />} />
          </Routes>
        </main>
        <Footer t={t} />
      </div>
    </Router>
  );
}

export default App;
