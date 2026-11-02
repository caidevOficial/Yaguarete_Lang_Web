import React, { useState } from 'react';
import {
  Download,
  Cpu,
  Bug,
  Sparkles,
  Terminal,
  Compass,
  Zap,
  Copy,
  Check,
  Palette,
} from 'lucide-react';
import { DOWNLOAD_ASSETS } from '../data/yaguareteData';
import { YaguareteCodeBlock } from '../utils/syntaxHighlighter';

export const VSCodePage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DOWNLOAD_ASSETS.vscodeExtension.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const features = [
    {
      icon: Palette,
      title: 'Tema de Iconos "Jaguar Gamer" & Gramática TextMate',
      description:
        'Iconos dedicados azul eléctrico para módulos .yaguarete en el explorador de archivos y coloreado distintivo verde menta/turquesa (entity.name.type.struct.yaguarete) para tipos ESTRUCTURA en parámetros, retornos y vectores.',
    },
    {
      icon: Sparkles,
      title: 'IntelliSense Prioritario Multi-Módulo y SignatureHelp',
      description:
        'Autocompletado instantáneo de funciones, procedimientos y variables locales con ordenamiento prioritario (sortText = 0_) e indexación en todos los archivos .yaguarete del workspace. Ayuda de firma en tiempo real al escribir ( o ,.',
    },
    {
      icon: Zap,
      title: 'Diagnósticos LSP Sub-milisegundo (<0.2 ms)',
      description:
        'Conecta directamente con el motor nativo en Rust (yaguarete lsp-check --json --stdin) para validar sintaxis y tipos estáticos al escribir sin tocar el disco.',
    },
    {
      icon: Bug,
      title: 'Depurador Nativo Interactivo DAP con Breakpoints',
      description:
        'Servidor Debug Adapter Protocol (yaguarete dap) integrado: fija puntos de interrupción en el margen, ejecuta paso a paso (Step Over, Step Into, Step Out), inspecciona el Call Stack y explora estructuras recursivas.',
    },
    {
      icon: Compass,
      title: 'Navegación de Código y Vista de Esquema (Outline)',
      description:
        'Soporte completo de Ir a Definición (F12 / Ctrl+Clic), Buscar Referencias (Shift+F12), Breadcrumbs y árbol de símbolos para funciones, procedimientos y estructuras.',
    },
    {
      icon: Terminal,
      title: 'Consola REPL Integrada y Snippets Rápidos',
      description:
        'Botones en la barra superior del editor para ejecutar, depurar o abrir yaguarete repl con un clic. Incluye plantillas rápidas escribiendo func, proc, para, mientras, si o archivo + Tab.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Hero Banner */}
      <div className="yaguarete-hero-gradient rounded-3xl p-8 sm:p-10 text-white border border-blue-800/60 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/25 border border-cyan-400/30 text-xs font-bold text-cyan-300">
              Visual Studio Code • Antigravity IDE • Cursor
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
              Extensión Oficial YAGUARETÉ Language Support
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transforma tu editor en un entorno profesional de ingeniería algorítmica con diagnósticos en <code className="text-sky-300">&lt;0.2 ms</code>, autocompletado inteligente por punto (<code className="text-sky-300">.</code>), depurador nativo DAP con breakpoints y consola REPL integrada.
            </p>

            <div className="pt-2 space-y-3">
              <div className="code-surface p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs font-mono max-w-xl">
                <span className="text-cyan-300 truncate mr-2">
                  {DOWNLOAD_ASSETS.vscodeExtension.installCommand}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-slate-300 hover:text-white p-1 shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={DOWNLOAD_ASSETS.vscodeExtension.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold shadow-lg shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  Descargar Paquete VSIX v0.1.1 ({DOWNLOAD_ASSETS.vscodeExtension.size})
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-sky-500/40 shadow-2xl text-center space-y-3">
              <img
                src="./assets/yaguarete_icon.png"
                alt="Icono Extensión VS Code YAGUARETÉ"
                className="w-28 h-28 mx-auto rounded-2xl object-contain"
              />
              <div className="font-display font-bold text-lg">yaguarete-language-support</div>
              <div className="text-xs text-sky-400 font-mono">Versión 0.1.1 • Publisher: yaguarete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="cyber-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
              <f.icon className="w-5 h-5" />
            </div>
            <h2 className="font-display text-lg font-bold">{f.title}</h2>
            <p className="text-sm text-(--text-secondary) leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>

      {/* LSP JSON & DAP Configuration Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="cyber-card rounded-2xl p-6 space-y-4">
          <h3 className="font-display text-xl font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Diagnóstico en Tiempo Real (lsp-check JSON)
          </h3>
          <p className="text-sm text-(--text-secondary)">
            Cada vez que editas un archivo <code className="inline-code">.yaguarete</code>, la extensión alimenta el analizador de Rust por <code className="inline-code">stdin</code> y subraya al instante cualquier incompatibilidad de tipos con precisión de línea y columna:
          </p>
          <YaguareteCodeBlock
            showLineNumbers={false}
            code={`// Comando: cat algoritmo.yaguarete | yaguarete lsp-check --stdin --json
{
  "valid": false,
  "diagnostics": [
    {
      "line": 4,
      "column": 12,
      "message": "Tipo incompatible: no se puede asignar CADENA a ENTERO",
      "severity": "error"
    }
  ]
}`}
          />
        </div>

        <div className="cyber-card rounded-2xl p-6 space-y-4">
          <h3 className="font-display text-xl font-bold flex items-center gap-2">
            <Bug className="w-5 h-5 text-emerald-400" />
            Configuración de Depuración DAP (launch.json)
          </h3>
          <p className="text-sm text-(--text-secondary)">
            El depurador interactivo <code className="inline-code">yaguarete dap</code> permite detener la ejecución en cualquier sentencia, inspeccionar arreglos y estructuras anidadas y evaluar expresiones en la consola de depuración:
          </p>
          <YaguareteCodeBlock
            showLineNumbers={false}
            code={`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "yaguarete",
      "request": "launch",
      "name": "YAGUARETÉ: Depurar archivo actual",
      "program": "\${file}",
      "stopOnEntry": false,
      "lenient": false
    }
  ]
}`}
          />
        </div>
      </div>
    </div>
  );
};
