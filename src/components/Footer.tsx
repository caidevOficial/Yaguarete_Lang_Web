import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, ShieldCheck, Terminal, ExternalLink, Heart } from 'lucide-react';
import { GITHUB_REPO_URL, GITHUB_RELEASES_URL, YAGUARETE_VERSION } from '../data/yaguareteData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#060911] text-slate-300 border-t border-slate-800/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./assets/yaguarete_icon.png"
                alt="YAGUARETÉ Logo"
                className="w-10 h-10 rounded-lg bg-slate-900 p-1 border border-sky-500/30"
              />
              <div>
                <span className="font-display text-xl font-extrabold text-white tracking-tight">
                  YAGUARETÉ
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-600/30 text-cyan-300 border border-cyan-500/30">
                  v{YAGUARETE_VERSION}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              El lenguaje de programación de pseudocódigo en español fuertemente tipado, impulsado por una Máquina Virtual Bytecode en Rust (<code className="text-sky-300 bg-transparent">&lt;1 ms</code>) para el aprendizaje moderno de algoritmos, estructuras de datos y desarrollo de software.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-sky-400" />
                caidevOficial/Yaguarete_Lang
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href="mailto:a.facundo.falcone@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                Contacto Autor
              </a>
            </div>
          </div>

          {/* Col 2: Descargas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
              Descargas
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/descargas" className="hover:text-white transition-colors">
                  Instalador Windows (.exe)
                </Link>
              </li>
              <li>
                <Link to="/descargas" className="hover:text-white transition-colors">
                  Paquete Debian / Ubuntu (.deb)
                </Link>
              </li>
              <li>
                <Link to="/descargas" className="hover:text-white transition-colors">
                  Tarball Universal Linux (.tar.gz)
                </Link>
              </li>
              <li>
                <Link to="/vscode" className="hover:text-white transition-colors">
                  Extensión VS Code (.vsix)
                </Link>
              </li>
              <li>
                <a
                  href={GITHUB_RELEASES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  Todos los Releases
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Documentación */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
              Documentación
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/documentacion#tipos-primitivos" className="hover:text-white transition-colors">
                  Sistema de Tipos Estático
                </Link>
              </li>
              <li>
                <Link to="/documentacion#estructuras-datos" className="hover:text-white transition-colors">
                  Estructuras y Punteros NULO
                </Link>
              </li>
              <li>
                <Link to="/documentacion#operadores" className="hover:text-white transition-colors">
                  Operadores (^, // y %)
                </Link>
              </li>
              <li>
                <Link to="/documentacion#funciones-incorporadas" className="hover:text-white transition-colors">
                  Manejo de Archivos y Built-ins
                </Link>
              </li>
              <li>
                <Link to="/documentacion#cli-comandos" className="hover:text-white transition-colors">
                  Referencia CLI y LSP
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosistema */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
              Herramientas
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/playground" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Playground & REPL Web
                </Link>
              </li>
              <li>
                <Link to="/ejemplos" className="hover:text-white transition-colors">
                  Recetario de Algoritmos
                </Link>
              </li>
              <li>
                <Link to="/vscode" className="hover:text-white transition-colors">
                  Depurador Interactivo DAP
                </Link>
              </li>
              <li>
                <Link to="/novedades" className="hover:text-white transition-colors">
                  Changelog e Historial
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & License */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026</span>
            <a
              href="mailto:a.facundo.falcone@gmail.com"
              className="text-white font-semibold hover:text-sky-400 transition-colors"
            >
              Facu Falcone
            </a>
            <span>• Todos los derechos reservados.</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Licencia GNU GPL-3.0-or-later
            </span>
          </div>
          <p className="inline-flex items-center gap-1.5 text-slate-400">
            Diseñado con <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400" /> para impulsar la enseñanza y práctica rigurosa de la algoritmia.
          </p>
        </div>
      </div>
    </footer>
  );
};
