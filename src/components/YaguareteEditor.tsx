import React, { useRef, useMemo } from 'react';
import {
  highlightYaguareteLine,
  extractStructNames,
  extractFunctionNames,
} from '../utils/syntaxHighlighter';

interface YaguareteEditorProps {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
  className?: string;
}

export const YaguareteEditor: React.FC<YaguareteEditorProps> = ({
  value,
  onChange,
  minHeight = '380px',
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const lines = useMemo(() => value.replace(/\r\n/g, '\n').split('\n'), [value]);
  const structs = useMemo(() => extractStructNames(value), [value]);
  const funcs = useMemo(() => extractFunctionNames(value), [value]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      // Insert 4 spaces
      const updated = val.substring(0, start) + '    ' + val.substring(end);
      onChange(updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div
      className={`relative flex bg-[#070b14] border border-slate-800/80 rounded-b-xl overflow-hidden font-mono text-sm leading-6 ${className}`}
      style={{ minHeight }}
    >
      {/* Line Numbers Gutter */}
      <div
        ref={gutterRef}
        aria-hidden="true"
        className="select-none py-4 pl-3 pr-3 text-right text-xs text-slate-600 bg-[#050811] border-r border-slate-800/80 shrink-0 overflow-hidden font-mono"
        style={{ width: '3.2rem' }}
      >
        {lines.map((_, i) => (
          <div key={i} className="h-6 leading-6">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor Surface: Pre (highlighted) and Textarea (editable) stacked */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Syntax-Highlighted Layer (underneath) */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 m-0 p-4 font-mono text-sm leading-6 whitespace-pre pointer-events-none select-none overflow-hidden"
          style={{
            fontFamily: "'JetBrains Mono', Consolas, Menlo, monospace",
            tabSize: 4,
          }}
        >
          {lines.map((line, i) => (
            <div key={i} className="h-6 leading-6">
              {line.length > 0 ? highlightYaguareteLine(line, structs, funcs) : ' '}
            </div>
          ))}
        </pre>

        {/* Transparent Interactive Textarea (on top) */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Editor interactivo YAGUARETÉ con resaltado de sintaxis oficial"
          className="absolute inset-0 w-full h-full m-0 p-4 font-mono text-sm leading-6 bg-transparent text-transparent caret-cyan-400 outline-none resize-none whitespace-pre overflow-auto selection:bg-blue-600/35 selection:text-transparent"
          style={{
            fontFamily: "'JetBrains Mono', Consolas, Menlo, monospace",
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
};
