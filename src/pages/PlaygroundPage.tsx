import React from 'react';
import { useLocation } from 'react-router-dom';
import { Terminal, Sparkles } from 'lucide-react';
import { InteractivePlayground } from '../components/InteractivePlayground';

export const PlaygroundPage: React.FC = () => {
  const location = useLocation();
  const stateCode = (location.state as { code?: string } | null)?.code;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-500 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Entorno de Ejecución en el Navegador • YAGUARETÉ v0.1.2
          </div>
          <h1 className="font-display text-3xl font-extrabold mt-2 flex items-center gap-2.5">
            <Terminal className="w-7 h-7 text-cyan-400" />
            Playground Interactivo y Consola REPL
          </h1>
        </div>
        <p className="text-sm text-(--text-secondary) max-w-xl">
          Escribe y ejecuta programas completos <code className="inline-code">.yaguarete</code> con soporte de estructuras, punteros <code className="inline-code">NULO</code>, matrices, división entera <code className="inline-code">//</code> y archivos virtuales, o cambia a <code className="inline-code">yaguarete repl</code> para evaluar expresiones al vuelo.
        </p>
      </div>

      <InteractivePlayground initialCode={stateCode} compact={false} />
    </div>
  );
};
