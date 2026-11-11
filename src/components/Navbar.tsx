import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Download,
  Terminal,
  Menu,
  X,
  Github,
  BookOpen,
  Code2,
  Cpu,
  History,
  Sparkles,
} from 'lucide-react';
import { GITHUB_REPO_URL, YAGUARETE_VERSION } from '../data/yaguareteData';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkRendered, setIsDarkRendered] = useState<boolean>(true);

  const resolveCurrentScheme = (): 'dark' | 'light' => {
    const meta = document.querySelector('meta[name="color-scheme"]');
    const content = meta?.getAttribute('content') || 'light dark';
    if (content === 'dark') return 'dark';
    if (content === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  useEffect(() => {
    // Default first-time visit on developer site to dark if no preference stored and system is light, or sync with resolved scheme
    try {
      const stored = localStorage.getItem('color-scheme');
      if (!stored) {
        const meta = document.querySelector('meta[name="color-scheme"]');
        // Keep "light dark" unless user explicitly toggles, or reflect current resolved state
        if (meta) {
          setIsDarkRendered(resolveCurrentScheme() === 'dark');
        }
      } else {
        setIsDarkRendered(stored === 'dark');
      }
    } catch {
      setIsDarkRendered(resolveCurrentScheme() === 'dark');
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'color-scheme') {
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
          meta.setAttribute('content', e.newValue ?? 'light dark');
          setIsDarkRendered(resolveCurrentScheme() === 'dark');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenSearch]);

  // Follow modern-web-guidance `dark-mode-toggle` two-state divergence rule
  const handleToggleColorScheme = () => {
    const currentlyRendered = resolveCurrentScheme();
    const targetScheme: 'dark' | 'light' = currentlyRendered === 'dark' ? 'light' : 'dark';
    const systemPreference: 'dark' | 'light' = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const meta = document.querySelector('meta[name="color-scheme"]');
    try {
      if (targetScheme === systemPreference) {
        localStorage.removeItem('color-scheme');
        meta?.setAttribute('content', 'light dark');
      } else {
        localStorage.setItem('color-scheme', targetScheme);
        meta?.setAttribute('content', targetScheme);
      }
    } catch {
      meta?.setAttribute('content', targetScheme);
    }
    setIsDarkRendered(targetScheme === 'dark');
  };

  const navLinks = [
    { to: '/', label: 'Acerca de', exact: true },
    { to: '/descargas', label: 'Descargas', icon: Download },
    { to: '/documentacion', label: 'Documentación', icon: BookOpen },
    { to: '/ejemplos', label: 'Ejemplos y Recetas', icon: Code2 },
    { to: '/playground', label: 'Playground REPL', icon: Terminal },
    { to: '/vscode', label: 'Extensión VS Code', icon: Cpu },
    { to: '/novedades', label: 'Novedades', icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 shadow-lg">
      {/* Top Python.org-inspired Ecosystem Bar */}
      <div className="bg-[#050811] text-slate-300 border-b border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <nav aria-label="Red de portales YAGUARETÉ" className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto">
            <Link
              to="/"
              className="px-2.5 py-1 font-bold text-sky-400 border-t-2 border-sky-400 bg-slate-900/90 whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              to="/documentacion"
              className="px-2 py-1 hover:text-white transition-colors whitespace-nowrap"
            >
              Docs v{YAGUARETE_VERSION}
            </Link>
            <Link
              to="/descargas"
              className="px-2 py-1 hover:text-white transition-colors whitespace-nowrap"
            >
              Instaladores & Paquetes
            </Link>
            <Link
              to="/playground"
              className="px-2 py-1 hover:text-cyan-300 transition-colors hidden sm:inline-block whitespace-nowrap"
            >
              Consola REPL Interactiva
            </Link>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1 hover:text-white transition-colors inline-flex items-center gap-1 whitespace-nowrap"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub Oficial
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Bytecode VM Rust v{YAGUARETE_VERSION} (&lt;1 ms)
            </span>
            <span>|</span>
            <span>Extensión: <code className="text-sky-300 bg-transparent">.yaguarete</code></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Python.org style header) */}
      <div className="bg-[#0b1325]/95 backdrop-blur-md border-b border-blue-900/40 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 opacity-50 blur group-hover:opacity-90 transition duration-300" />
                <img
                  src="./assets/yaguarete_icon.png"
                  alt="Isotipo Oficial YAGUARETÉ Jaguar Gamer"
                  className="relative w-12 h-12 rounded-xl object-contain bg-slate-950 p-1 border border-sky-400/40"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
                    YAGUARETÉ
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-600/30 text-cyan-300 border border-cyan-400/30">
                    v{YAGUARETE_VERSION}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 hidden sm:block">
                  Pseudocódigo en Español Fuertemente Tipado
                </p>
              </div>
            </Link>

            {/* Search Button + Theme Switch + CTA */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenSearch}
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-400/60 text-xs text-slate-300 transition-all cursor-pointer"
                aria-label="Buscar en la documentación (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline text-slate-300">Buscar en Docs...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 text-sky-300 rounded border border-slate-700">
                  Ctrl K
                </kbd>
              </button>

              <button
                type="button"
                onClick={handleToggleColorScheme}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-sky-300 hover:text-white transition-colors cursor-pointer"
                title={isDarkRendered ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro Electric Blue'}
                aria-label={isDarkRendered ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              >
                {isDarkRendered ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-400" />}
              </button>

              <Link
                to="/descargas"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-blue-600/25 transition-all"
              >
                <Download className="w-4 h-4" />
                Descargar v{YAGUARETE_VERSION}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Python.org-style Secondary Sub-Navigation Bar */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center space-x-1 py-2 border-t border-slate-800/80 text-sm"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 ${isActive
                    ? 'bg-blue-600/25 text-cyan-300 border border-cyan-400/30 shadow-inner'
                    : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                {item.icon && <item.icon className="w-4 h-4 text-sky-400" />}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-5 space-y-1.5">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${isActive
                    ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                  }`
                }
              >
                <span className="inline-flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4 text-sky-400" />}
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
