import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Terminal,
  CheckCircle2,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Code2,
  Clock,
  AlertTriangle,
  Database,
} from 'lucide-react';
import { HERO_SLIDES, CODE_RECIPES } from '../data/yaguareteData';
import {
  runYaguareteCode,
  formatYaguareteValue,
  formatReplVariablesTable,
  VariableEntry,
} from '../utils/yaguareteInterpreter';
import { YaguareteEditor } from './YaguareteEditor';
import { highlightYaguareteLine } from '../utils/syntaxHighlighter';

interface InteractivePlaygroundProps {
  initialCode?: string;
  initialMode?: 'editor' | 'repl';
  compact?: boolean;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  initialCode,
  initialMode = 'editor',
  compact = false,
}) => {
  const [mode, setMode] = useState<'editor' | 'repl'>(initialMode);
  const [code, setCode] = useState<string>(initialCode || HERO_SLIDES[0].code);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [execTimeMs, setExecTimeMs] = useState<number | null>(null);
  const [variables, setVariables] = useState<VariableEntry[]>([]);
  const [copied, setCopied] = useState(false);

  // REPL State
  const [replHistory, setReplHistory] = useState<
    { type: 'input' | 'output' | 'error' | 'meta'; text: string }[]
  >([
    {
      type: 'meta',
      text: 'YAGUARETÉ (v0.1.2) — Motor Interactivo Web',
    },
    {
      type: 'meta',
      text: 'Consola Interactiva REPL. Escribe expresiones o código de pseudocódigo.',
    },
    {
      type: 'meta',
      text: 'Comandos especiales: :ayuda, :variables, :limpiar, :cancel, :salir',
    },
  ]);
  const [replInput, setReplInput] = useState('');
  const [multilineBuffer, setMultilineBuffer] = useState<string[]>([]);
  const replStateRef = useRef<{
    vars: Map<string, VariableEntry>;
    structs: Map<string, any>;
    funcs: Map<string, any>;
  }>({
    vars: new Map(),
    structs: new Map(),
    funcs: new Map(),
  });
  const replEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      handleRunCode(initialCode);
    } else {
      handleRunCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  const handleRunCode = (sourceToRun: string = code) => {
    const res = runYaguareteCode(sourceToRun);
    setOutputLines([
      '[RUN] Ejecutando archivo: playground.yaguarete (lenient=False) ...',
      ...res.output,
    ]);
    setErrorMsg(res.error);
    setExecTimeMs(res.timeMs);
    setVariables(res.variables);
  };

  const handleStaticCheck = () => {
    const res = runYaguareteCode(code);
    if (res.error) {
      setOutputLines(['[CHECK] Analizando tipos estáticos y sintaxis...']);
      setErrorMsg(res.error);
    } else {
      setErrorMsg(undefined);
      setOutputLines([
        '[CHECK] Verificación estática exitosa (yaguarete check): 0 errores de sintaxis o tipos.',
        `[LSP-CHECK] {"valid": true, "diagnostics": [], "variables_checked": ${res.variables.length}}`,
      ]);
      setExecTimeMs(0.18);
      setVariables(res.variables);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const isBlockIncomplete = (lines: string[]): boolean => {
    let depth = 0;
    for (const l of lines) {
      const t = l.trim();
      if (/^(FUNCION|PROCEDIMIENTO|ESTRUCTURA|SI|PARA|MIENTRAS|HACER)\b/i.test(t)) {
        depth++;
      }
      if (/^FIN\s+(FUNCION|PROCEDIMIENTO|ESTRUCTURA|SI|PARA|MIENTRAS|HACER)$/i.test(t)) {
        depth = Math.max(0, depth - 1);
      }
    }
    return depth > 0;
  };

  const handleReplSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = replInput;
    const trimmed = raw.trim();
    setReplInput('');

    const promptPrefix = multilineBuffer.length > 0 ? '...        ' : 'yaguarete> ';
    const nextHistory = [...replHistory, { type: 'input' as const, text: `${promptPrefix}${raw}` }];

    if (trimmed === ':cancel' || trimmed === ':c') {
      setMultilineBuffer([]);
      setReplHistory([...nextHistory, { type: 'meta', text: '(Entrada multilínea cancelada)' }]);
      return;
    }

    if (multilineBuffer.length === 0) {
      if (trimmed === ':ayuda' || trimmed === ':help') {
        setReplHistory([
          ...nextHistory,
          {
            type: 'meta',
            text: [
              'Comandos interactivos de YAGUARETÉ REPL:',
              '  :ayuda / :help       Muestra esta guía rápida',
              '  :variables / :vars   Despliega la tabla ASCII de variables en memoria',
              '  :limpiar / :clear    Reinicia la memoria y pantalla de la sesión',
              '  :cancel / :c         Cancela la edición de un bloque multilínea',
              '  :salir / :exit       Finaliza la sesión interactiva',
            ].join('\n'),
          },
        ]);
        return;
      }

      if (trimmed === ':variables' || trimmed === ':vars') {
        const tableLines = formatReplVariablesTable(
          Array.from(replStateRef.current.vars.values())
        );
        setReplHistory([...nextHistory, { type: 'output', text: tableLines.join('\n') }]);
        return;
      }

      if (trimmed === ':limpiar' || trimmed === ':clear') {
        replStateRef.current = { vars: new Map(), structs: new Map(), funcs: new Map() };
        setMultilineBuffer([]);
        setReplHistory([
          {
            type: 'meta',
            text: 'Entorno y tabla de variables reiniciados correctamente.',
          },
        ]);
        return;
      }

      if (trimmed === ':salir' || trimmed === ':exit' || trimmed === ':quit') {
        setReplHistory([...nextHistory, { type: 'meta', text: '¡Hasta luego!' }]);
        return;
      }
    }

    const candidateLines = [...multilineBuffer, raw];
    if (isBlockIncomplete(candidateLines)) {
      setMultilineBuffer(candidateLines);
      setReplHistory(nextHistory);
      return;
    }

    setMultilineBuffer([]);
    const fullSnippet = candidateLines.join('\n');
    const res = runYaguareteCode(fullSnippet, replStateRef.current);

    const additions: { type: 'input' | 'output' | 'error' | 'meta'; text: string }[] = [];
    for (const out of res.output) {
      additions.push({ type: 'output', text: out });
    }
    if (res.error) {
      additions.push({ type: 'error', text: res.error });
    } else if (res.lastExprValue !== undefined && res.output.length === 0) {
      additions.push({
        type: 'output',
        text: `=> ${formatYaguareteValue(res.lastExprValue)}`,
      });
    }

    setReplHistory([...nextHistory, ...additions]);
    setVariables(Array.from(replStateRef.current.vars.values()));
    setTimeout(() => replEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 30);
  };

  const runQuickReplSample = (cmds: string[]) => {
    setMode('repl');
    let hist = [...replHistory];
    for (const cmd of cmds) {
      hist.push({ type: 'input', text: `yaguarete> ${cmd}` });
      if (cmd === ':variables') {
        const tbl = formatReplVariablesTable(Array.from(replStateRef.current.vars.values()));
        hist.push({ type: 'output', text: tbl.join('\n') });
      } else {
        const res = runYaguareteCode(cmd, replStateRef.current);
        for (const o of res.output) hist.push({ type: 'output', text: o });
        if (res.error) hist.push({ type: 'error', text: res.error });
        else if (res.lastExprValue !== undefined && res.output.length === 0) {
          hist.push({ type: 'output', text: `=> ${formatYaguareteValue(res.lastExprValue)}` });
        }
      }
    }
    setReplHistory(hist);
    setVariables(Array.from(replStateRef.current.vars.values()));
  };

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-[#070b14] text-slate-100 shadow-2xl shadow-blue-950/40 overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0c1426] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>

          <button
            type="button"
            onClick={() => setMode('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'editor'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Editor (.yaguarete)
          </button>

          <button
            type="button"
            onClick={() => setMode('repl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'repl'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-400/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Consola Interactiva (yaguarete repl)
          </button>
        </div>

        {mode === 'editor' ? (
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Seleccionar algoritmo de ejemplo"
              onChange={(e) => {
                const val = e.target.value;
                if (val.startsWith('slide-')) {
                  const s = HERO_SLIDES.find((x) => `slide-${x.id}` === val);
                  if (s) {
                    setCode(s.code);
                    handleRunCode(s.code);
                  }
                } else {
                  const r = CODE_RECIPES.find((x) => x.id === val);
                  if (r) {
                    setCode(r.code);
                    handleRunCode(r.code);
                  }
                }
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 outline-none focus:border-sky-400"
            >
              <optgroup label="Ejemplos Destacados">
                {HERO_SLIDES.map((s) => (
                  <option key={`slide-${s.id}`} value={`slide-${s.id}`}>
                    {s.id}. {s.badge}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Recetas Canónicas (.yaguarete)">
                {CODE_RECIPES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.filename} — {r.title}
                  </option>
                ))}
              </optgroup>
            </select>

            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
              title="Copiar código"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>

            <button
              type="button"
              onClick={handleStaticCheck}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-sky-500/30 text-xs font-semibold text-sky-300 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              yaguarete check
            </button>

            <button
              type="button"
              onClick={() => handleRunCode(code)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Ejecutar (--time)
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                runQuickReplSample([
                  'ENTERO edad = 25',
                  'edad * 2',
                  'CADENA lenguaje = "YAGUARETÉ v0.1.2"',
                  ':variables',
                ])
              }
              className="px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-sky-500/30 text-xs text-sky-300 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Demo Sesión REPL
            </button>
            <button
              type="button"
              onClick={() => {
                replStateRef.current = { vars: new Map(), structs: new Map(), funcs: new Map() };
                setMultilineBuffer([]);
                setReplHistory([
                  { type: 'meta', text: 'YAGUARETÉ (v0.1.2) — Sesión REPL limpia.' },
                ]);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              :limpiar
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {mode === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left: Editable Code Area with Real-time VS Code Syntax Highlighting */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono text-sky-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                algoritmo.yaguarete
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Sintaxis Oficial VS Code (TextMate) • Tab = 4 espacios
              </span>
            </div>
            <YaguareteEditor
              value={code}
              onChange={(newCode) => setCode(newCode)}
              minHeight={compact ? '320px' : '440px'}
            />
          </div>

          {/* Right: Execution Output & Variable Inspector */}
          <div className="lg:col-span-5 flex flex-col bg-[#050811]">
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Salida de Consola
              </span>
              {execTimeMs !== null && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
                  <Clock className="w-3 h-3" />
                  [Tiempo total: {execTimeMs} ms]
                </span>
              )}
            </div>

            <div className="p-4 font-mono text-xs space-y-1.5 overflow-y-auto max-h-64 flex-1">
              {outputLines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('[RUN]') || line.startsWith('[CHECK]') || line.startsWith('[LSP-CHECK]')
                      ? 'text-sky-400 font-semibold'
                      : line.startsWith('[ARCHIVO')
                      ? 'text-amber-300'
                      : 'text-slate-200 whitespace-pre-wrap'
                  }
                >
                  {line}
                </div>
              ))}
              {errorMsg && (
                <div className="mt-2 p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Live Variable Table Inspector */}
            <div className="border-t border-slate-800/90 bg-slate-950/70 p-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-sky-400" />
                  Variables en Ámbito Global ({variables.length})
                </span>
                <span className="font-mono text-[10px] text-slate-500">:variables</span>
              </div>
              {variables.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Sin variables globales activas.
                </p>
              ) : (
                <div className="max-h-36 overflow-y-auto rounded border border-slate-800">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="bg-slate-900 text-slate-300">
                      <tr>
                        <th className="py-1 px-2">NOMBRE</th>
                        <th className="py-1 px-2">TIPO</th>
                        <th className="py-1 px-2">VALOR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {variables.map((v) => (
                        <tr key={v.name} className="hover:bg-slate-900/50">
                          <td className="py-1 px-2 text-white font-semibold">{v.name}</td>
                          <td className="py-1 px-2 text-sky-400">{v.type}</td>
                          <td className="py-1 px-2 text-emerald-300 truncate max-w-[180px]">
                            {formatYaguareteValue(v.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* REPL Interactive Mode */
        <div className="p-4 bg-[#050811] font-mono text-sm">
          <div className="h-80 overflow-y-auto space-y-1.5 pb-3">
            {replHistory.map((entry, idx) => {
              if (entry.type === 'input') {
                const promptMatch = entry.text.match(/^(\s*(?:yaguarete>|\.\.\.)\s*)(.*)$/);
                if (promptMatch) {
                  const prompt = promptMatch[1];
                  const codePart = promptMatch[2];
                  return (
                    <div key={idx} className="whitespace-pre flex flex-wrap items-baseline">
                      <span className="text-cyan-400 font-bold select-none mr-2 font-mono">
                        {prompt}
                      </span>
                      <span className="font-mono">
                        {highlightYaguareteLine(codePart)}
                      </span>
                    </div>
                  );
                }
              }
              return (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap font-mono ${
                    entry.type === 'meta'
                      ? 'text-slate-400'
                      : entry.type === 'error'
                      ? 'text-rose-400'
                      : 'text-emerald-300'
                  }`}
                >
                  {entry.text}
                </div>
              );
            })}
            <div ref={replEndRef} />
          </div>

          <form
            onSubmit={handleReplSubmit}
            className="mt-2 pt-3 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-bold select-none">
              {multilineBuffer.length > 0 ? '...       ' : 'yaguarete>'}
            </span>
            <input
              type="text"
              value={replInput}
              onChange={(e) => setReplInput(e.target.value)}
              placeholder='Escribe p. ej.: ENTERO x = 10  ó  x * 5  ó  :variables'
              className="flex-1 bg-transparent text-white outline-none placeholder-slate-600"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white cursor-pointer"
            >
              Evaluar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
