import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LegalPage from './LegalPage';

function App() {
  const [lang, setLang] = useState('en'); // Global language state

  return (
    <Routes>
      <Route path="/" element={<LandingPage lang={lang} setLang={setLang} />} />
      <Route path="/legal/:type" element={<LegalPage lang={lang} />} />
      {/* Compatibility routes if needed */}
      <Route path="/privacy" element={<LegalPage lang={lang} type="privacy" />} />
      <Route path="/terms" element={<LegalPage lang={lang} type="terms" />} />
      <Route path="/refund" element={<LegalPage lang={lang} type="refund" />} />
    </Routes>
  );
}

export default App;
