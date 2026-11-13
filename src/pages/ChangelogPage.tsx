import React from 'react';
import { History, Sparkles, CheckCircle2, Cpu, ExternalLink } from 'lucide-react';
import { RELEASES_HISTORY, GITHUB_RELEASES_URL } from '../data/yaguareteData';

export const ChangelogPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-500 text-xs font-bold">
          <History className="w-3.5 h-3.5" />
          Keep a Changelog • Semantic Versioning
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
          Registro de Cambios (Changelog) y Evolución Arquitectónica
        </h1>
        <p className="text-sm text-(--text-secondary) max-w-3xl">
          Historial oficial de versiones del lenguaje de programación, compilador e intérprete nativo <strong>YAGUARETÉ</strong> (<code className="inline-code">.yaguarete</code>).
        </p>
      </div>

      {/* ADR-001 Architectural Highlight Card */}
      <div className="rounded-2xl bg-[#070c18] text-white p-7 border border-sky-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
            <Cpu className="w-3.5 h-3.5" />
            ADR-001: Migración Arquitectónica al Motor Nativo en Rust
          </span>
          <span className="text-xs font-mono text-emerald-400">Estado: Implementado y Certificado</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          La reimplementación del núcleo en Rust (<code className="text-sky-300">crates/yaguarete_core</code>, <code className="text-sky-300">crates/yaguarete_cli</code> y <code className="text-sky-300">crates/yaguarete_installer</code>) redujo el tiempo de arranque en frío de ~250 ms a <strong>&lt;1 ms</strong> y redujo la huella de memoria a <strong>&lt;5 MB de RAM</strong>. En <strong>v0.2.0</strong> esta arquitectura incorporó la <strong>Máquina Virtual Bytecode</strong> (<code className="text-sky-300">crates/yaguarete_core/src/vm/</code>), logrando hasta <strong>5,72x más velocidad</strong>, y en <strong>v0.2.1</strong> se consolida la paridad de ejecución AST/VM con inicialización en <code className="text-sky-300">NULO</code> por defecto en estructuras.
        </p>
      </div>

      {/* Releases Timeline */}
      <div className="space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-4 sm:before:left-6 before:w-0.5 before:bg-blue-600/30">
        {RELEASES_HISTORY.map((rel) => (
          <div key={rel.version} className="relative pl-12 sm:pl-16">
            <div className="absolute left-2 sm:left-4 top-2 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 shadow-md shadow-blue-500/50" />

            <div className="cyber-card rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--border-subtle) pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-mono font-extrabold text-sm">
                    [{rel.version}]
                  </span>
                  <span className="text-xs font-mono text-(--text-muted)">{rel.date}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400">
                    {rel.tag}
                  </span>
                </div>
                <a
                  href={GITHUB_RELEASES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  Release en GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h2 className="font-display text-xl font-bold">{rel.title}</h2>

              <div className="space-y-4">
                {rel.highlights.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-sm font-bold text-blue-500">{sec.section}</h3>
                    <ul className="space-y-2 text-sm text-(--text-secondary)">
                      {sec.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
