import React from 'react';

const KEYWORDS = new Set([
  'INICIO',
  'FIN',
  'FUNCION',
  'PROCEDIMIENTO',
  'RETORNAR',
  'SI',
  'SINO',
  'MIENTRAS',
  'PARA',
  'HACER',
  'ESTRUCTURA',
  'Estructura',
  'Fin',
  'Y',
  'O',
  'NO',
]);

const PRIMITIVE_TYPES = new Set([
  'ENTERO',
  'FLOTANTE',
  'REAL',
  'CADENA',
  'CARACTER',
  'BOOLEANO',
  'ARCHIVO',
  'VOID',
]);

const LITERALS = new Set([
  'VERDADERO',
  'FALSO',
  'NULO',
  'null',
  'NULL',
  'None',
  'NONE',
  'nulo',
]);

const BUILTINS = new Set([
  'IMPRIMIR',
  'ABRIR_ARCHIVO',
  'ESPAR',
  'ESIMPAR',
  'MOD',
  'LEER_LINEA',
  'ESCRIBIR_LINEA',
  'CERRAR_ARCHIVO',
  'largo',
  'findearchivo',
]);

export function highlightYaguareteLine(line: string, customStructs: Set<string> = new Set()): React.ReactNode[] {
  // Check for full line comment or trailing comment (respecting // integer division vs // comment)
  // Remember in Yaguarete: // is integer division when between two operands, or comment at start of line or after whitespace/text
  const nodes: React.ReactNode[] = [];
  let codePart = line;
  let commentPart = '';

  const trimmed = line.trimStart();
  if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
    return [<span key="comment" className="text-slate-500 italic">{line}</span>];
  }

  // Tokenize code line preserving strings, comments, words, numbers, and operators
  const tokenRegex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/.*$|#.*$|\b[A-Za-z_áéíóúÁÉÍÓÚñÑ][A-Za-z0-9_áéíóúÁÉÍÓÚñÑ]*\b|\b\d+(?:\.\d+)?\b|\/\/|[+\-*/%=<>!]+|[[\](){}.,:;]|\s+)/g;

  // Heuristic for // integer division vs end-of-line comment:
  // If // is inside brackets/parens or followed by a single identifier/number and then ], ), or ;, it's integer division!
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    const token = match[0];
    const key = `tok-${idx++}`;

    if (token.startsWith('//') && token.length > 2) {
      // Check if it looks like integer division e.g. // columnas]
      const afterSlash = token.slice(2).trim();
      if (/^[A-Za-z0-9_]+\s*[\]);]/.test(afterSlash)) {
        // Re-adjust regex lastIndex to just after '//'
        tokenRegex.lastIndex = match.index + 2;
        nodes.push(<span key={key} className="text-cyan-400 font-bold">//</span>);
        continue;
      }
      commentPart = token;
      nodes.push(<span key={key} className="text-slate-500 italic">{commentPart}</span>);
      break;
    }

    if (token.startsWith('#')) {
      nodes.push(<span key={key} className="text-slate-500 italic">{token}</span>);
      break;
    }

    if (token.startsWith('"') || token.startsWith("'")) {
      nodes.push(<span key={key} className="text-amber-300">{token}</span>);
    } else if (KEYWORDS.has(token)) {
      nodes.push(<span key={key} className="text-sky-400 font-bold">{token}</span>);
    } else if (PRIMITIVE_TYPES.has(token)) {
      nodes.push(<span key={key} className="text-blue-400 font-semibold">{token}</span>);
    } else if (LITERALS.has(token)) {
      nodes.push(<span key={key} className="text-purple-400 font-semibold">{token}</span>);
    } else if (BUILTINS.has(token)) {
      nodes.push(<span key={key} className="text-yellow-300 font-medium">{token}</span>);
    } else if (customStructs.has(token)) {
      // Official v0.1.1 struct token color: mint green / turquoise (entity.name.type.struct.yaguarete)
      nodes.push(<span key={key} className="text-emerald-400 font-semibold">{token}</span>);
    } else if (/^\d+(?:\.\d+)?$/.test(token)) {
      nodes.push(<span key={key} className="text-emerald-300">{token}</span>);
    } else if (/^(\/\/|[+\-*/%=<>!]+)$/.test(token)) {
      nodes.push(<span key={key} className="text-cyan-400">{token}</span>);
    } else {
      nodes.push(<span key={key} className="text-slate-100">{token}</span>);
    }
  }

  return nodes;
}

export function extractStructNames(code: string): Set<string> {
  const structs = new Set<string>(['Libro', 'Nodo', 'NodoCliente', 'Pila', 'Cola', 'Lista']);
  const regex = /ESTRUCTURA\s+([A-Za-z_][A-Za-z0-9_]*)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(code)) !== null) {
    structs.add(m[1]);
  }
  return structs;
}

export const YaguareteCodeBlock: React.FC<{
  code: string;
  showLineNumbers?: boolean;
  className?: string;
}> = ({ code, showLineNumbers = true, className = '' }) => {
  const structs = extractStructNames(code);
  const lines = code.replace(/\r\n/g, '\n').split('\n');

  return (
    <pre
      className={`code-surface overflow-x-auto p-4 text-sm leading-relaxed rounded-lg border border-slate-800/90 ${className}`}
    >
      <code>
        {lines.map((line, i) => (
          <div key={i} className="table-row hover:bg-slate-800/40 px-1">
            {showLineNumbers && (
              <span className="table-cell select-none pr-4 text-right text-xs text-slate-600 w-9">
                {i + 1}
              </span>
            )}
            <span className="table-cell whitespace-pre">
              {highlightYaguareteLine(line, structs)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
};
