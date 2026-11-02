import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { DownloadsPage } from './pages/DownloadsPage';
import { DocsPage } from './pages/DocsPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { VSCodePage } from './pages/VSCodePage';
import { ChangelogPage } from './pages/ChangelogPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
};

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar onOpenSearch={() => setSearchOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/descargas" element={<DownloadsPage />} />
            <Route path="/documentacion" element={<DocsPage />} />
            <Route path="/ejemplos" element={<ExamplesPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/vscode" element={<VSCodePage />} />
            <Route path="/novedades" element={<ChangelogPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </HashRouter>
  );
};

export default App;
