import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Download,
  Terminal,
  BookOpen,
  Zap,
  ShieldCheck,
  Code2,
  ChevronRight,
  Play,
  Cpu,
  CheckCircle2,
  Sparkles,
  FileCode2,
  Layers,
  ExternalLink,
} from 'lucide-react';
import {
  HERO_SLIDES,
  DOWNLOAD_ASSETS,
  GITHUB_REPO_URL,
  GITHUB_LATEST_RELEASE_URL,
  RELEASES_HISTORY,
} from '../data/yaguareteData';
import { YaguareteCodeBlock } from '../utils/syntaxHighlighter';
import { InteractivePlayground } from '../components/InteractivePlayground';

export const HomePage: React.FC = () => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [detectedOS, setDetectedOS] = useState<'windows' | 'linux' | 'other'>('windows');
  const navigate = useNavigate();

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('linux') && !ua.includes('android')) {
      setDetectedOS('linux');
    } else if (ua.includes('win')) {
      setDetectedOS('windows');
    } else {
      setDetectedOS('windows');
    }
  }, []);

  const currentSlide = HERO_SLIDES[activeSlideIdx];

  const primaryDownload =
    detectedOS === 'linux' ? DOWNLOAD_ASSETS.linuxDeb : DOWNLOAD_ASSETS.windowsInstaller;

  return (
    <div>
      {/* PYTHON.ORG-STYLE HERO SECTION */}
      <section className="yaguarete-hero-gradient text-white border-b border-blue-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left / Top: Interactive 5-Slide Code Carousel (Python.org signature box) */}
            <div className="lg:col-span-7 bg-[#050811]/95 rounded-2xl border border-sky-500/30 shadow-2xl shadow-blue-950/60 overflow-hidden">
              {/* Carousel Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0a1122] border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Python.org 1..5 numbered pagination buttons */}
                <div className="flex items-center gap-1" role="tablist" aria-label="Ejemplos de código YAGUARETÉ">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={activeSlideIdx === idx}
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        activeSlideIdx === idx
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/40 scale-105'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                      }`}
                    >
                      {slide.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Display */}
              <div className="p-2 bg-[#070b14]">
                <YaguareteCodeBlock
                  code={currentSlide.code}
                  showLineNumbers={true}
                  className="border-0 max-h-[310px] text-xs sm:text-[13px]"
                />
              </div>

              {/* Expected Output & Run in Playground Footer */}
              <div className="px-4 py-3 bg-[#090f1d] border-t border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-mono text-emerald-300 truncate">
                  <span className="text-slate-400 mr-1.5">Salida:</span>
                  {currentSlide.expectedOutput[0]}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate('/playground', { state: { code: currentSlide.code } })
                  }
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/25 hover:bg-blue-600/40 text-cyan-300 border border-cyan-400/30 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-cyan-300" />
                  Ejecutar en Vivo
                </button>
              </div>
            </div>

            {/* Right: Headline, Slide Description & OS-Aware Download Callout */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-sky-400/30 text-xs font-semibold text-sky-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Identidad Oficial "Jaguar Gamer" • v0.1.2
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentSlide.description}
              </p>

              {/* OS-Aware Download Box (like python.org's Download for Windows/Linux box) */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-sky-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Descarga Oficial Recomendada ({detectedOS === 'linux' ? 'GNU/Linux' : 'Windows x64'})
                  </span>
                  <span className="text-xs font-mono text-emerald-400">{primaryDownload.size}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={primaryDownload.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Descargar YAGUARETÉ {primaryDownload.version}
                  </a>
                  <Link
                    to="/playground"
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-sm inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Probar REPL
                  </Link>
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span>
                    Archivo: <code className="text-sky-300 bg-transparent">{primaryDownload.name}</code>
                  </span>
                  <div className="flex items-center gap-3">
                    <Link to="/descargas" className="text-cyan-400 hover:underline font-medium">
                      Windows, Linux (.deb/.tar.gz) y VSIX →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PYTHON.ORG-STYLE 4-COLUMN CORE PILLARS WIDGETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Widget 1: Comenzar */}
          <div className="cyber-card rounded-2xl p-6 shadow-lg border-t-4 border-t-blue-600 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="font-display text-lg font-bold">Comenzar</h2>
              <p className="text-sm text-(--text-secondary)">
                ¿Nuevo en YAGUARETÉ? Escribe algoritmos estructurados con palabras clave naturales en español (<code className="inline-code">INICIO</code>, <code className="inline-code">FUNCION</code>, <code className="inline-code">PARA</code>) y seguridad de tipos estática.
              </p>
            </div>
            <Link
              to="/documentacion"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-cyan-400 transition-colors"
            >
              Guía de inicio rápido <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Widget 2: Descargas */}
          <div className="cyber-card rounded-2xl p-6 shadow-lg border-t-4 border-t-cyan-400 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Download className="w-5 h-5" />
              </div>
              <h2 className="font-display text-lg font-bold">Descargas</h2>
              <p className="text-sm text-(--text-secondary)">
                Instalador gráfico autónomo para Windows (<code className="inline-code">~5 MB</code>), paquetes nativos <code className="inline-code">.deb</code> y <code className="inline-code">.tar.gz</code> para Linux, y extensión oficial para VS Code.
              </p>
            </div>
            <Link
              to="/descargas"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-cyan-400 transition-colors"
            >
              Ver todos los instaladores <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Widget 3: Documentación */}
          <div className="cyber-card rounded-2xl p-6 shadow-lg border-t-4 border-t-sky-500 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-display text-lg font-bold">Documentación</h2>
              <p className="text-sm text-(--text-secondary)">
                Referencia completa del sistema de tipos (<code className="inline-code">FLOTANTE</code> vs <code className="inline-code">REAL</code>), estructuras autorreferenciales con <code className="inline-code">NULO</code> y manejo de archivos.
              </p>
            </div>
            <Link
              to="/documentacion"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-cyan-400 transition-colors"
            >
              Explorar especificación <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Widget 4: Motor Rust & IDE */}
          <div className="cyber-card rounded-2xl p-6 shadow-lg border-t-4 border-t-emerald-500 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="font-display text-lg font-bold">Motor Nativo Rust</h2>
              <p className="text-sm text-(--text-secondary)">
                Compilado nativo con arranque en <code className="inline-code">&lt;1 ms</code>, ejecución ~300x más rápida, diagnóstico LSP en <code className="inline-code">&lt;0.2 ms</code> y depurador interactivo DAP.
              </p>
            </div>
            <Link
              to="/vscode"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-cyan-400 transition-colors"
            >
              Conocer herramientas IDE <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLAYGROUND & REPL SECTION ON HOME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              Prueba YAGUARETÉ sin instalar nada
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
              Playground Interactivo y Consola REPL en Vivo
            </h2>
          </div>
          <p className="text-sm text-(--text-secondary) max-w-xl">
            Modifica el código <code className="inline-code">.yaguarete</code>, cambia entre plantillas de algoritmos o alterna a la consola interactiva <code className="inline-code">yaguarete repl</code> para evaluar expresiones y consultar <code className="inline-code">:variables</code>.
          </p>
        </div>

        <InteractivePlayground compact={true} />
      </section>

      {/* RUST ENGINE v0.1.2 BENCHMARK & FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Performance Metrics */}
          <div className="lg:col-span-5 rounded-2xl bg-[#070c18] text-white p-7 border border-blue-800/50 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-cyan-300 border border-cyan-400/30">
                Arquitectura Workspace Cargo (Rust)
              </span>
              <h2 className="font-display text-2xl font-extrabold">
                Rendimiento Nativo Revolucionario
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                El núcleo <code className="text-sky-300">yaguarete_core</code> implementa un analizador léxico determinista, parser recursivo descendente, verificador estático de tipos e intérprete nativo sin dependencias externas.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-display font-extrabold text-cyan-400">&lt; 1 ms</div>
                  <div className="text-xs text-slate-400 mt-1">Arranque en frío (~250x más rápido)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-display font-extrabold text-emerald-400">~300x</div>
                  <div className="text-xs text-slate-400 mt-1">Velocidad en Quicksort (1 ms vs 3.240 ms)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-display font-extrabold text-sky-400">&lt; 0.2 ms</div>
                  <div className="text-xs text-slate-400 mt-1">Diagnóstico en vivo <code className="text-sky-300">lsp-check</code></div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-display font-extrabold text-amber-300">~830 KB</div>
                  <div className="text-xs text-slate-400 mt-1">Binario autónomo sin runtime</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>82 pruebas automatizadas superadas</span>
              <Link to="/novedades" className="text-cyan-400 hover:underline font-semibold">
                Leer ADR-001 →
              </Link>
            </div>
          </div>

          {/* Right: Latest News / Releases & Ecosystem (Python.org two-column bottom style) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Latest Releases Column */}
            <div className="cyber-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-(--border-subtle)">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    Últimas Novedades
                  </h3>
                  <Link to="/novedades" className="text-xs font-bold text-blue-500 hover:underline">
                    Ver todo
                  </Link>
                </div>

                <ul className="space-y-4">
                  {RELEASES_HISTORY.slice(0, 4).map((rel) => (
                    <li key={rel.version} className="text-sm border-b border-(--border-subtle) pb-3 last:border-b-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-(--text-muted)">{rel.date}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-600/15 text-blue-500">
                          v{rel.version}
                        </span>
                      </div>
                      <Link
                        to="/novedades"
                        className="font-semibold hover:text-blue-500 transition-colors block mt-1"
                      >
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={GITHUB_LATEST_RELEASE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-cyan-400"
              >
                GitHub Releases Oficiales <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Use Cases & Education Column */}
            <div className="cyber-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-(--border-subtle)">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-500" />
                    ¿Para qué usar YAGUARETÉ?
                  </h3>
                </div>

                <ul className="space-y-3.5 text-sm">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block">Algoritmia y Estructuras de Datos</strong>
                      <span className="text-xs text-(--text-secondary)">
                        Listas enlazadas, pilas LIFO, colas FIFO, matrices y ordenamientos con punteros seguros.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block">Precisión Numérica IEEE 754</strong>
                      <span className="text-xs text-(--text-secondary)">
                        Diferenciación pedagógica y técnica entre <code className="inline-code">FLOTANTE</code> (32b) y <code className="inline-code">REAL</code> (64b).
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block">Depuración Visual con Breakpoints</strong>
                      <span className="text-xs text-(--text-secondary)">
                        Inspecciona cada paso, marco de pila y campo de estructura en VS Code y Antigravity IDE.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block">Software Libre (GPL-3.0-or-later)</strong>
                      <span className="text-xs text-(--text-secondary)">
                        Abierto para universidades, docentes, laboratorios y estudiantes.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <Link
                to="/ejemplos"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-cyan-400"
              >
                Explorar recetario de algoritmos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
