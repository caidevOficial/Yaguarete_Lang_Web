import React, { useEffect, useState } from 'react';
import {
  Download,
  Terminal,
  Copy,
  Check,
  Monitor,
  Server,
  Code2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  DOWNLOAD_ASSETS,
  GITHUB_RELEASES_URL,
  GITHUB_LATEST_RELEASE_URL,
  RELEASES_HISTORY,
  RELEASE_CHECKSUMS,
  YAGUARETE_VERSION,
} from '../data/yaguareteData';

export const DownloadsPage: React.FC = () => {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'linux'>('windows');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('linux') && !ua.includes('android')) {
      setDetectedOS('linux');
    } else {
      setDetectedOS('windows');
    }
  }, []);

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  const primaryAsset =
    detectedOS === 'linux' ? DOWNLOAD_ASSETS.linuxDeb : DOWNLOAD_ASSETS.windowsInstaller;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Top OS-Aware Banner (Python.org /downloads style) */}
      <div className="yaguarete-hero-gradient rounded-3xl p-8 sm:p-10 text-white border border-blue-800/60 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/25 border border-cyan-400/30 text-xs font-bold text-cyan-300">
              Detección Automática de Sistema: {detectedOS === 'linux' ? 'GNU/Linux (x86_64)' : 'Windows (x64)'}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
              Descargar la última versión para {detectedOS === 'linux' ? 'GNU/Linux' : 'Windows'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {primaryAsset.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={primaryAsset.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/35 transition-all"
              >
                <Download className="w-5 h-5" />
                Descargar YAGUARETÉ {primaryAsset.version} ({primaryAsset.name})
              </a>
              <a
                href={GITHUB_LATEST_RELEASE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-colors"
              >
                Ver Release en GitHub
                <ExternalLink className="w-4 h-4 text-sky-400" />
              </a>
            </div>
          </div>

          {/* Installer Preview Image (1024x1024 Ultra-HD Master) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden border border-sky-500/40 bg-slate-950/95 p-6 shadow-xl flex flex-col items-center">
              <img
                src="./assets/yaguarete_icon.png"
                alt="Isotipo Oficial YAGUARETÉ Ultra-HD (1024x1024)"
                width={256}
                height={256}
                className="w-52 h-52 sm:w-60 sm:h-60 rounded-xl object-contain mx-auto drop-shadow-[0_0_25px_rgba(0,180,255,0.35)]"
              />
              <div className="mt-4 text-center text-xs text-slate-400">
                Asistente Todo-en-Uno Dark Electric Blue (<code className="text-sky-300">{DOWNLOAD_ASSETS.windowsInstaller.size}</code>)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Windows Card */}
        <div className="cyber-card rounded-2xl p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">En Windows (10 / 11 x64)</h2>
                <p className="text-xs text-(--text-secondary)">Instalador Gráfico Autónomo y Binario CLI</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600/15 text-blue-500">
              Recomendado
            </span>
          </div>

          <p className="text-sm text-(--text-secondary)">
            El asistente gráfico <strong>Instalador_Yaguarete.exe</strong> configura todo el ecosistema de forma automatizada:
          </p>

          <ul className="space-y-2 text-sm text-(--text-secondary)">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Instala <code className="inline-code">yaguarete.exe</code> en <code className="inline-code">%LOCALAPPDATA%\Programs\Yaguarete\bin</code>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Añade <code className="inline-code">yaguarete</code> automáticamente a la variable <code className="inline-code">PATH</code>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Instala la extensión oficial en <strong>VS Code</strong>, <strong>Antigravity IDE</strong> y <strong>Cursor</strong>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Asocia los archivos <code className="inline-code">.yaguarete</code> con el icono oficial High-DPI
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={DOWNLOAD_ASSETS.windowsInstaller.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              Instalador_Yaguarete.exe ({DOWNLOAD_ASSETS.windowsInstaller.size})
            </a>
            <a
              href={DOWNLOAD_ASSETS.windowsBinary.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Solo Binario yaguarete.exe ({DOWNLOAD_ASSETS.windowsBinary.size})
            </a>
          </div>

          <div className="pt-2">
            <div className="text-xs font-semibold text-(--text-secondary) mb-1.5">
              Instalación silenciosa / desatendida (PowerShell):
            </div>
            <div className="code-surface p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-300">{DOWNLOAD_ASSETS.windowsInstaller.silentCommand}</span>
              <button
                type="button"
                onClick={() =>
                  copyCommand(DOWNLOAD_ASSETS.windowsInstaller.silentCommand, 'win-silent')
                }
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Copiar comando"
              >
                {copiedCmd === 'win-silent' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* GNU/Linux Card */}
        <div className="cyber-card rounded-2xl p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">En GNU/Linux (x86_64)</h2>
                <p className="text-xs text-(--text-secondary)">Paquete Nativo .deb y Tarball Universal .tar.gz</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400">
              Multi-Distro
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold mb-1">
                1. Paquete Debian / Ubuntu (<code className="inline-code">.deb</code>)
              </h3>
              <p className="text-xs text-(--text-secondary) mb-2">
                Recomendado para Ubuntu, Debian, Linux Mint, Pop!_OS y derivados. Instala <code className="inline-code">/usr/bin/yaguarete</code> y registra el tipo MIME <code className="inline-code">application/x-yaguarete</code>.
              </p>
              <div className="code-surface p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-300">{DOWNLOAD_ASSETS.linuxDeb.installCommand}</span>
                <button
                  type="button"
                  onClick={() => copyCommand(DOWNLOAD_ASSETS.linuxDeb.installCommand, 'linux-deb')}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {copiedCmd === 'linux-deb' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-1">
                2. Tarball Portable Universal (<code className="inline-code">.tar.gz</code>)
              </h3>
              <p className="text-xs text-(--text-secondary) mb-2">
                Compatible con Arch Linux, Fedora, openSUSE, Gentoo y Alpine. Incluye <code className="inline-code">install.sh</code> y <code className="inline-code">uninstall.sh</code>.
              </p>
              <div className="code-surface p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-sky-300 truncate mr-2">
                  {DOWNLOAD_ASSETS.linuxTar.installCommand}
                </span>
                <button
                  type="button"
                  onClick={() => copyCommand(DOWNLOAD_ASSETS.linuxTar.installCommand, 'linux-tar')}
                  className="text-slate-400 hover:text-white p-1 shrink-0 cursor-pointer"
                >
                  {copiedCmd === 'linux-tar' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={DOWNLOAD_ASSETS.linuxDeb.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              {DOWNLOAD_ASSETS.linuxDeb.name} ({DOWNLOAD_ASSETS.linuxDeb.size})
            </a>
            <a
              href={DOWNLOAD_ASSETS.linuxTar.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              {DOWNLOAD_ASSETS.linuxTar.name} ({DOWNLOAD_ASSETS.linuxTar.size})
            </a>
          </div>
        </div>
      </div>

      {/* VS Code Extension & Auto-Updater Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="cyber-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-sky-400" />
            <h3 className="font-display text-lg font-bold">
              Paquete VSIX Oficial para VS Code / Antigravity
            </h3>
          </div>
          <p className="text-sm text-(--text-secondary)">
            {DOWNLOAD_ASSETS.vscodeExtension.description}
          </p>
          <div className="code-surface p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 truncate mr-2">
              {DOWNLOAD_ASSETS.vscodeExtension.installCommand}
            </span>
            <button
              type="button"
              onClick={() =>
                copyCommand(DOWNLOAD_ASSETS.vscodeExtension.installCommand, 'vsix-cmd')
              }
              className="text-slate-400 hover:text-white p-1 shrink-0 cursor-pointer"
            >
              {copiedCmd === 'vsix-cmd' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <a
            href={DOWNLOAD_ASSETS.vscodeExtension.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-sky-500/30 text-sky-400 text-xs font-bold"
          >
            <Download className="w-4 h-4" />
            Descargar {DOWNLOAD_ASSETS.vscodeExtension.name}
          </a>
        </div>

        <div className="cyber-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-emerald-400" />
            <h3 className="font-display text-lg font-bold">
              Actualización Automática (estilo pip)
            </h3>
          </div>
          <p className="text-sm text-(--text-secondary)">
            Una vez instalado YAGUARETÉ, puedes comprobar e instalar nuevas versiones directamente desde la terminal consultando GitHub Releases:
          </p>
          <div className="code-surface p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="text-slate-400"># Descargar e instalar la versión más reciente</div>
            <div className="text-emerald-300">yaguarete update</div>
            <div className="text-slate-400 pt-1"># Solo comprobar disponibilidad</div>
            <div className="text-sky-300">yaguarete update --check</div>
          </div>
        </div>
      </div>

      {/* Responsive SHA-256 Checksums Table */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Sumas de Verificación SHA-256 (v{YAGUARETE_VERSION})
          </h2>
          <span className="text-xs text-(--text-secondary)">
            Verifica la autenticidad e integridad de cada binario descargado
          </span>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-labelledby="checksums-table-caption"
          className="table-wrapper"
        >
          <table
            style={
              {
                '--label-2': '"Plataforma"',
                '--label-3': '"Tamaño"',
                '--label-4': '"SHA-256"',
              } as React.CSSProperties
            }
          >
            <caption id="checksums-table-caption">
              Checksums SHA-256 oficiales publicados en YAGUARETÉ v{YAGUARETE_VERSION}
            </caption>
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Plataforma</th>
                <th>Tamaño</th>
                <th>SHA-256</th>
              </tr>
            </thead>
            <tbody>
              {RELEASE_CHECKSUMS.map((item) => {
                const copyId = `sha-${item.file}`;
                const isCopied = copiedCmd === copyId;
                return (
                  <tr key={item.file}>
                    <th>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs font-bold text-sky-400 hover:underline"
                      >
                        {item.file}
                      </a>
                    </th>
                    <td className="text-xs">{item.platform}</td>
                    <td className="font-mono text-xs">{item.size}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <code className="inline-code text-[11px] font-mono break-all">
                          {item.sha256}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyCommand(item.sha256, copyId)}
                          aria-label={`Copiar SHA-256 de ${item.file}`}
                          className="min-w-6 min-h-6 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shrink-0 cursor-pointer transition-colors"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                        <span role="status" className="text-[11px] text-emerald-400 font-semibold">
                          {isCopied ? 'Copiado' : ''}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive Releases Table */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold">Historial de Versiones Publicadas</h2>
        <div
          tabIndex={0}
          role="region"
          aria-labelledby="releases-table-caption"
          className="table-wrapper"
        >
          <table
            style={
              {
                '--label-2': '"Fecha"',
                '--label-3': '"Resumen de versión"',
                '--label-4': '"Descarga"',
              } as React.CSSProperties
            }
          >
            <caption id="releases-table-caption">
              Lanzamientos oficiales de YAGUARETÉ en GitHub Releases
            </caption>
            <thead>
              <tr>
                <th>Versión</th>
                <th>Fecha</th>
                <th>Descripción Principal</th>
                <th>Enlace</th>
              </tr>
            </thead>
            <tbody>
              {RELEASES_HISTORY.map((rel) => {
                const isLatest = rel.version === YAGUARETE_VERSION;
                const isPrerelease = rel.version.includes('-');
                return (
                  <tr key={rel.version}>
                    <th>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`font-mono font-bold ${
                            isLatest ? 'text-sky-400' : 'text-slate-400'
                          }`}
                        >
                          v{rel.version}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isLatest
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : isPrerelease
                              ? 'bg-slate-800 text-slate-400 border border-slate-700'
                              : 'bg-blue-500/15 text-sky-400 border border-blue-500/30'
                          }`}
                        >
                          {isLatest
                            ? 'Oficial Estable'
                            : isPrerelease
                            ? 'Pre-release'
                            : 'Estable anterior'}
                        </span>
                      </div>
                    </th>
                    <td className="font-mono text-xs">{rel.date}</td>
                    <td>{rel.title}</td>
                    <td>
                      <a
                        href={GITHUB_RELEASES_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:underline"
                      >
                        Notas y Activos <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
