import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const EULAPage = () => {
  const [eulaContent, setEulaContent] = useState('');

  useEffect(() => {
    fetch('/EULA.md')
      .then((res) => res.text())
      .then((text) => setEulaContent(text))
      .catch((err) => console.error('Failed to fetch EULA:', err));
  }, []);

  return (
    <section style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', backgroundColor: 'var(--card-background)', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}>
      <h2>Contrato de Licença de Usuário Final (EULA)</h2>
      <ReactMarkdown>{eulaContent}</ReactMarkdown>
    </section>
  );
};

export default EULAPage;
