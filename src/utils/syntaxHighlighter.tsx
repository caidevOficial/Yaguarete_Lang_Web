import React from 'react';

// Exact Visual Studio Code Dark+ Token Scopes & Colors for YAGUARETÉ (.yaguarete)
// Matches extension-vscode/syntaxes/yaguarete.tmLanguage.json
export const VSCODE_COLORS = {
  comment: '#6A9955',        // comment.line / comment.block (VS Code Classic Olive Green)
  keywordControl: '#C586C0', // keyword.control.* (INICIO, FIN, SI, SINO, MIENTRAS, PARA, HACER, RETORNAR, Y, O, NO)
  keywordDecl: '#569CD6',    // keyword.declaration.* (ESTRUCTURA, FUNCION, PROCEDIMIENTO, PROGRAMA, ALGORITMO)
  primitiveType: '#569CD6',  // storage.type.primitive.* (ENTERO, FLOTANTE, REAL, CADENA, CARACTER, BOOLEANO, ARCHIVO, VOID)
  structType: '#4EC9B0',     // entity.name.type.struct.* (Verde Menta / Turquesa de YAGUARETÉ)
  functionName: '#DCDCAA',   // entity.name.function / entity.name.function.call (Yellow / Dorado cálido)
  property: '#9CDCFE',       // variable.other.property (Celeste claro tras punto: .cabeza, .largo)
  variable: '#9CDCFE',       // variable.other / variable.parameter (Celeste claro: mi_lista, nuevo_nodo)
  constant: '#569CD6',       // constant.language.* (NULO, VERDADERO, FALSO)
  number: '#B5CEA8',         // constant.numeric.* (Verde suave para enteros y flotantes)
  string: '#CE9178',         // string.quoted.* (Coral / Naranja cálido)
  punctuation: '#D4D4D4',    // punctuation / operators (=, ==, !=, +, -, *, /, //, %, :, ,, ;, (, ))
};

const KEYWORDS_CONTROL = new Set([
  'INICIO',
  'FIN',
  'SI',
  'SINO',
  'ENTONCES',
  'MIENTRAS',
  'PARA',
  'HASTA',
  'PASO',
  'HACER',
  'RETORNAR',
  'RETORNO',
  'Y',
  'O',
  'NO',
]);

const KEYWORDS_DECL = new Set([
  'ESTRUCTURA',
  'Estructura',
  'FUNCION',
  'PROCEDIMIENTO',
  'ALGORITMO',
  'PROGRAMA',
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
  'VACIO',
  'SIN_RETORNO',
]);

const CONSTANTS = new Set([
  'VERDADERO',
  'FALSO',
  'TRUE',
  'FALSE',
  'NULO',
  'null',
  'NULL',
  'None',
  'NONE',
  'nulo',
]);

const BUILTINS = new Set([
  'IMPRIMIR',
  'MOSTRAR',
  'LEER',
  'ABRIR_ARCHIVO',
  'CERRAR_ARCHIVO',
  'LEER_LINEA',
  'ESCRIBIR_LINEA',
  'ESPAR',
  'ESIMPAR',
  'MOD',
  'largo',
  'findearchivo',
]);

export function extractStructNames(code: string): Set<string> {
  const structs = new Set<string>(['Libro', 'Nodo', 'NodoCliente', 'Pila', 'Cola', 'Lista']);
  const regex = /\bESTRUCTURA\s+([A-Za-z_][A-Za-z0-9_]*)/gi;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(code)) !== null) {
    structs.add(m[1]);
  }
  return structs;
}

export function extractFunctionNames(code: string): Set<string> {
  const funcs = new Set<string>();
  const regex = /\b(?:FUNCION|PROCEDIMIENTO)\s+([A-Za-z_][A-Za-z0-9_]*)/gi;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(code)) !== null) {
    funcs.add(m[1]);
  }
  return funcs;
}

export function highlightYaguareteLine(
  line: string,
  customStructs: Set<string> = new Set(),
  customFuncs: Set<string> = new Set()
): React.ReactNode[] {
  const trimmed = line.trimStart();
  // Entire line comments
  if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
    return [
      <span key="c-full" style={{ color: VSCODE_COLORS.comment, fontStyle: 'italic' }}>
        {line}
      </span>,
    ];
  }

  const nodes: React.ReactNode[] = [];
  // Tokenize while capturing strings, comments, identifiers, properties with dot, numbers, and symbols
  const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/.*$|#.*$|\.[A-Za-z_][A-Za-z0-9_]*|\b[A-Za-z_áéíóúÁÉÍÓÚñÑ][A-Za-z0-9_áéíóúÁÉÍÓÚñÑ]*\b|\b\d+(?:\.\d+)?\b|\/\/|[+\-*/%=<>!:]+|[[\](){}.,;]|\s+)/g;

  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = regex.exec(line)) !== null) {
    const token = match[0];
    const key = `tok-${idx++}`;

    // Trailing comment vs integer division
    if (token.startsWith('//') && token.length > 2) {
      const afterSlash = token.slice(2).trim();
      // Check if it's integer division operand (e.g. // columnas])
      if (/^[A-Za-z0-9_(\s]+[\]);,]/.test(afterSlash)) {
        regex.lastIndex = match.index + 2;
        nodes.push(
          <span key={key} style={{ color: VSCODE_COLORS.punctuation, fontWeight: 700 }}>
            //
          </span>
        );
        continue;
      }
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.comment, fontStyle: 'italic' }}>
          {token}
        </span>
      );
      break;
    }

    if (token.startsWith('#')) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.comment, fontStyle: 'italic' }}>
          {token}
        </span>
      );
      break;
    }

    // String literals
    if (token.startsWith('"') || token.startsWith("'")) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.string }}>
          {token}
        </span>
      );
      continue;
    }

    // Properties with dot (.cabeza, .producto, .largo)
    if (token.startsWith('.')) {
      const propName = token.slice(1);
      const isMethodCall = BUILTINS.has(propName);
      nodes.push(
        <span key={`${key}-dot`} style={{ color: VSCODE_COLORS.punctuation }}>
          .
        </span>
      );
      nodes.push(
        <span
          key={`${key}-prop`}
          style={{
            color: isMethodCall ? VSCODE_COLORS.functionName : VSCODE_COLORS.property,
          }}
        >
          {propName}
        </span>
      );
      continue;
    }

    // Peek ahead to detect function call e.g. foo(
    const restOfLine = line.slice(regex.lastIndex).trimStart();
    const isCall = restOfLine.startsWith('(');

    if (KEYWORDS_CONTROL.has(token)) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.keywordControl, fontWeight: 600 }}>
          {token}
        </span>
      );
    } else if (KEYWORDS_DECL.has(token)) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.keywordDecl, fontWeight: 600 }}>
          {token}
        </span>
      );
    } else if (PRIMITIVE_TYPES.has(token)) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.primitiveType, fontWeight: 600 }}>
          {token}
        </span>
      );
    } else if (CONSTANTS.has(token)) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.constant, fontWeight: 600 }}>
          {token}
        </span>
      );
    } else if (customStructs.has(token)) {
      // VS Code struct turquoise
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.structType, fontWeight: 600 }}>
          {token}
        </span>
      );
    } else if (BUILTINS.has(token) || customFuncs.has(token) || isCall) {
      // Function declaration or call (VS Code yellow)
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.functionName }}>
          {token}
        </span>
      );
    } else if (/^\d+(?:\.\d+)?$/.test(token)) {
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.number }}>
          {token}
        </span>
      );
    } else if (/^[A-Za-z_áéíóúÁÉÍÓÚñÑ][A-Za-z0-9_áéíóúÁÉÍÓÚñÑ]*$/.test(token)) {
      // Identifiers / variables / parameters (VS Code light sky blue)
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.variable }}>
          {token}
        </span>
      );
    } else {
      // Operators and punctuation
      nodes.push(
        <span key={key} style={{ color: VSCODE_COLORS.punctuation }}>
          {token}
        </span>
      );
    }
  }

  return nodes;
}

export const YaguareteCodeBlock: React.FC<{
  code: string;
  showLineNumbers?: boolean;
  className?: string;
}> = ({ code, showLineNumbers = true, className = '' }) => {
  const structs = extractStructNames(code);
  const funcs = extractFunctionNames(code);
  const lines = code.replace(/\r\n/g, '\n').split('\n');

  return (
    <pre
      className={`code-surface overflow-x-auto p-4 text-sm leading-relaxed rounded-lg border border-slate-800/90 ${className}`}
      style={{ backgroundColor: '#070b14', color: '#e2e8f0' }}
    >
      <code className="font-mono">
        {lines.map((line, i) => (
          <div key={i} className="table-row hover:bg-slate-800/30 px-1">
            {showLineNumbers && (
              <span className="table-cell select-none pr-4 text-right text-xs text-slate-600 w-9">
                {i + 1}
              </span>
            )}
            <span className="table-cell whitespace-pre">
              {highlightYaguareteLine(line, structs, funcs)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
};
