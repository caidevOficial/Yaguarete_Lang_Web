// Motor de ejecución interactivo en el navegador para el Playground y REPL de YAGUARETÉ (.yaguarete)

export interface VariableEntry {
  name: string;
  type: string;
  value: any;
}

export interface ExecutionResult {
  output: string[];
  error?: string;
  timeMs: number;
  variables: VariableEntry[];
}

interface StructDef {
  name: string;
  fields: { name: string; type: string }[];
}

interface FuncDef {
  name: string;
  params: { name: string; type: string }[];
  returnType: string;
  body: string[];
  isProc: boolean;
}

export interface PersistentReplState {
  vars: Map<string, VariableEntry>;
  structs: Map<string, StructDef>;
  funcs: Map<string, FuncDef>;
}

export interface RunYaguareteOptions {
  persistentState?: PersistentReplState;
  onReadInput?: (prompt: string) => string | null;
}

const VIRTUAL_FILES: Record<string, string[]> = {
  'nomina.txt': [
    'ID:101 | Lucía Mendez | Analista Senior | $580000.00',
    'ID:102 | Martín Palermo | Arquitecto Rust | $720000.00',
    'ID:103 | Julieta Rossi | Ing. de Datos | $640000.00',
  ],
  'datos.txt': [
    'Línea 1: Configuración inicial YAGUARETÉ v0.2.1',
    'Línea 2: Máquina Virtual Bytecode Rust activada (<1 ms)',
    'Línea 3: Fin de registro de prueba',
  ],
};

function roundHalfAwayFromZero(n: number): number {
  if (n === 0) return 0;
  const rounded = n < 0 ? -Math.round(-n) : Math.round(n);
  return rounded === 0 ? 0 : rounded;
}

function parseFloatText(text: string): number | null {
  const t = text.trim();
  const lower = t.toLowerCase();
  if (!t || lower.includes('inf') || lower.includes('nan') || !/\d/.test(t)) {
    return null;
  }
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function parseInputLine(text: string): any {
  const t = text.trim();
  const up = t.toUpperCase();
  if (up === 'VERDADERO' || up === 'TRUE') return true;
  if (up === 'FALSO' || up === 'FALSE') return false;
  if (/^[+-]?\d+$/.test(t)) {
    const n = Number.parseInt(t, 10);
    if (Number.isSafeInteger(n)) return n;
  }
  if (t.includes('.') || t.includes('e') || t.includes('E')) {
    const f = parseFloatText(t);
    if (f !== null) return f;
  }
  return text;
}

function computePower(base: number, exp: number): number {
  if (base < 0 && !Number.isInteger(exp)) {
    throw new Error(
      'PseudoRuntimeError: No se puede elevar un número negativo a un exponente fraccionario real.'
    );
  }
  if (base === 0 && exp < 0) {
    throw new Error(
      'PseudoRuntimeError: División por cero: no se puede elevar 0 a un exponente negativo.'
    );
  }
  return Math.pow(base, exp);
}

export function formatYaguareteValue(val: any): string {
  if (val === null || val === undefined || val === 'NULO') return 'NULO';
  if (typeof val === 'boolean') return val ? 'VERDADERO' : 'FALSO';
  if (Array.isArray(val)) {
    return '[' + val.map((item) => formatYaguareteValue(item)).join(', ') + ']';
  }
  if (typeof val === 'object' && val.__structName) {
    const fields = Object.entries(val)
      .filter(([k]) => k !== '__structName')
      .map(([k, v]) => {
        if (typeof v === 'string' && v !== 'NULO') return `${k}: '${v}'`;
        return `${k}: ${formatYaguareteValue(v)}`;
      })
      .join(', ');
    return `${val.__structName}{${fields}}`;
  }
  return String(val);
}

export function formatReplVariablesTable(vars: VariableEntry[]): string[] {
  if (vars.length === 0) {
    return ['(No hay variables definidas en memoria)'];
  }
  const rows = vars.map((v) => ({
    name: v.name,
    type: v.type,
    val: formatYaguareteValue(v.value),
  }));
  const wName = Math.max(6, ...rows.map((r) => r.name.length));
  const wType = Math.max(4, ...rows.map((r) => r.type.length));
  const wVal = Math.max(5, ...rows.map((r) => Math.min(48, r.val.length)));

  const pad = (s: string, w: number) =>
    (s.length > 48 ? s.slice(0, 45) + '...' : s).padEnd(w, ' ');

  const top = `┌─${'─'.repeat(wName)}─┬─${'─'.repeat(wType)}─┬─${'─'.repeat(wVal)}─┐`;
  const head = `│ ${pad('NOMBRE', wName)} │ ${pad('TIPO', wType)} │ ${pad('VALOR', wVal)} │`;
  const mid = `├─${'─'.repeat(wName)}─┼─${'─'.repeat(wType)}─┼─${'─'.repeat(wVal)}─┤`;
  const bot = `└─${'─'.repeat(wName)}─┴─${'─'.repeat(wType)}─┴─${'─'.repeat(wVal)}─┘`;

  return [
    top,
    head,
    mid,
    ...rows.map((r) => `│ ${pad(r.name, wName)} │ ${pad(r.type, wType)} │ ${pad(r.val, wVal)} │`),
    bot,
  ];
}

function stripLineComment(rawLine: string): string {
  let inSingle = false;
  let inDouble = false;
  let parenDepth = 0;
  let bracketDepth = 0;

  for (let i = 0; i < rawLine.length; i++) {
    const ch = rawLine[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === '(') parenDepth++;
      else if (ch === ')') parenDepth = Math.max(0, parenDepth - 1);
      else if (ch === '[') bracketDepth++;
      else if (ch === ']') bracketDepth = Math.max(0, bracketDepth - 1);
      else if (ch === '#') {
        return rawLine.slice(0, i).trim();
      } else if (ch === '/' && rawLine[i + 1] === '/') {
        const before = rawLine.slice(0, i).trim();
        const after = rawLine.slice(i + 2).trim();
        if (!before) return '';
        // If inside brackets/parens or looks like operand // operand, keep as integer division
        if (bracketDepth > 0 || parenDepth > 0) {
          if (/^[A-Za-z0-9_(\s]+/.test(after) && !after.includes('esto es')) {
            i++;
            continue;
          }
        }
        // Check if before ends with an identifier/number and after is a single identifier/number
        if (/[A-Za-z0-9_)\]]$/.test(before) && /^[A-Za-z0-9_(]+$/.test(after)) {
          i++;
          continue;
        }
        return before;
      }
    }
  }
  return rawLine.trim();
}

export function runYaguareteCode(
  source: string,
  persistentOrOptions?: PersistentReplState | RunYaguareteOptions
): ExecutionResult & { lastExprValue?: any } {
  const isOptions =
    persistentOrOptions !== undefined &&
    ('persistentState' in persistentOrOptions || 'onReadInput' in persistentOrOptions);
  const persistentState = isOptions
    ? (persistentOrOptions as RunYaguareteOptions).persistentState
    : (persistentOrOptions as PersistentReplState | undefined);
  const onReadInput = isOptions
    ? (persistentOrOptions as RunYaguareteOptions).onReadInput
    : undefined;
  const readInput =
    onReadInput ??
    ((prompt: string) =>
      typeof window !== 'undefined' && typeof window.prompt === 'function'
        ? window.prompt(prompt || 'Ingresa un valor para LEER():')
        : '');

  const startTime = performance.now();
  const output: string[] = [];
  const structs = persistentState?.structs ?? new Map<string, StructDef>();
  const funcs = persistentState?.funcs ?? new Map<string, FuncDef>();
  const globalVars = persistentState?.vars ?? new Map<string, VariableEntry>();
  let lastExprValue: any = undefined;

  // Strip multiline comments /* ... */ and """ ... """
  const cleanedSource = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/"""[\s\S]*?"""/g, '');

  const rawLines = cleanedSource.replace(/\r\n/g, '\n').split('\n');
  const lines: string[] = [];

  // Join multi-line array declarations like [ \n [1,2], \n [3,4] \n ]
  let buffer = '';
  let openBrackets = 0;
  for (const rl of rawLines) {
    const clean = stripLineComment(rl);
    if (!clean && openBrackets === 0) continue;
    for (const c of clean) {
      if (c === '[') openBrackets++;
      if (c === ']') openBrackets = Math.max(0, openBrackets - 1);
    }
    buffer = buffer ? `${buffer} ${clean}` : clean;
    if (openBrackets === 0) {
      if (buffer) lines.push(buffer);
      buffer = '';
    }
  }
  if (buffer) lines.push(buffer);

  // Extract top-level or nested ESTRUCTURA, FUNCION, PROCEDIMIENTO
  const mainBody: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^INICIO$/i.test(line) || /^FIN$/i.test(line)) {
      i++;
      continue;
    }

    const structMatch = line.match(/^ESTRUCTURA\s+([A-Za-z_][A-Za-z0-9_]*)\s*:?$/i);
    if (structMatch) {
      const sName = structMatch[1];
      const fields: { name: string; type: string }[] = [];
      i++;
      while (i < lines.length && !/^FIN\s+ESTRUCTURA$/i.test(lines[i])) {
        const fm = lines[i].match(/^([A-Za-z_][A-Za-z0-9_]*)\s+([A-Za-z_][A-Za-z0-9_]*)$/);
        if (fm) {
          fields.push({ type: fm[1], name: fm[2] });
        }
        i++;
      }
      structs.set(sName, { name: sName, fields });
      i++;
      continue;
    }

    const funcMatch = line.match(
      /^(FUNCION|PROCEDIMIENTO)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*(?::\s*([A-Za-z0-9_\[\]]+))?$/i
    );
    if (funcMatch) {
      const isProc = funcMatch[1].toUpperCase() === 'PROCEDIMIENTO';
      const fName = funcMatch[2];
      const rawParams = funcMatch[3].trim();
      const returnType = funcMatch[4] || 'VOID';
      const params: { name: string; type: string }[] = [];

      if (rawParams) {
        for (const p of rawParams.split(',')) {
          const pm = p.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)(\[\])*?\s*:\s*([A-Za-z0-9_\[\]]+)$/);
          if (pm) {
            params.push({ name: pm[1], type: pm[3] + (pm[2] || '') });
          }
        }
      }

      const fBody: string[] = [];
      i++;
      let depth = 1;
      while (i < lines.length && depth > 0) {
        if (/^(FUNCION|PROCEDIMIENTO)\b/i.test(lines[i])) depth++;
        if (/^FIN\s+(FUNCION|PROCEDIMIENTO)$/i.test(lines[i])) {
          depth--;
          if (depth === 0) break;
        }
        fBody.push(lines[i]);
        i++;
      }
      funcs.set(fName, { name: fName, params, returnType, body: fBody, isProc });
      i++;
      continue;
    }

    mainBody.push(line);
    i++;
  }

  function instantiateStruct(sName: string): any {
    const def = structs.get(sName);
    if (!def) return null;
    const obj: any = { __structName: sName };
    for (const f of def.fields) {
      // En v0.2.1 todos los atributos de ESTRUCTURA se inicializan en NULO por defecto
      obj[f.name] = null;
    }
    return obj;
  }

  function evalExpr(exprStr: string, scope: Map<string, VariableEntry>): any {
    const s = exprStr.trim();
    if (!s) return undefined;
    if (/^(VERDADERO)$/i.test(s)) return true;
    if (/^(FALSO)$/i.test(s)) return false;
    if (/^(NULO|null|NULL|None|NONE|nulo)$/.test(s)) return null;

    // Array literal
    if (s.startsWith('[') && s.endsWith(']')) {
      const inner = s.slice(1, -1).trim();
      if (!inner) return [];
      const items = splitTopLevel(inner, ',');
      return items.map((it) => evalExpr(it, scope));
    }

    // String literal
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      if (!s.slice(1, -1).includes(s[0])) {
        return s.slice(1, -1);
      }
    }

    // Logical O / Y
    const orParts = splitByLogicalKeyword(s, 'O');
    if (orParts.length > 1) {
      return orParts.some((p) => Boolean(evalExpr(p, scope)));
    }
    const andParts = splitByLogicalKeyword(s, 'Y');
    if (andParts.length > 1) {
      return andParts.every((p) => Boolean(evalExpr(p, scope)));
    }

    // Logical NO
    if (/^NO\s+/i.test(s)) {
      return !Boolean(evalExpr(s.replace(/^NO\s+/i, ''), scope));
    }

    // Comparisons ==, !=, <=, >=, <, >
    for (const op of ['==', '!=', '<=', '>=', '<', '>']) {
      const parts = splitTopLevelOperator(s, op);
      if (parts) {
        const left = evalExpr(parts[0], scope);
        const right = evalExpr(parts[1], scope);
        switch (op) {
          case '==':
            return left === right;
          case '!=':
            return left !== right;
          case '<=':
          case '>=':
          case '<':
          case '>':
            if (left === null || right === null) {
              throw new Error(`PseudoRuntimeError: Operador '${op}' no compatible con tipo 'Nulo'.`);
            }
            if (op === '<=') return left <= right;
            if (op === '>=') return left >= right;
            if (op === '<') return left < right;
            return left > right;
        }
      }
    }

    // Addition / Subtraction (right-to-left split at top level)
    const addSub = splitTopLevelAddSub(s);
    if (addSub) {
      const left = evalExpr(addSub.left, scope);
      const right = evalExpr(addSub.right, scope);
      if (addSub.op === '+') {
        if (Array.isArray(left) && Array.isArray(right)) {
          return [...left, ...right];
        }
        if (typeof left === 'string' || typeof right === 'string') {
          return formatYaguareteValue(left) + formatYaguareteValue(right);
        }
        if (left === null || right === null) {
          throw new Error("PseudoRuntimeError: Operador '+' no compatible con tipos 'Nulo' y numérico.");
        }
        return Number(left) + Number(right);
      } else {
        if (left === null || right === null) {
          throw new Error("PseudoRuntimeError: Operador '-' no compatible con tipo 'Nulo'.");
        }
        return Number(left) - Number(right);
      }
    }

    // Multiplication, Division, Integer Division (//), Modulo (%)
    const mulDiv = splitTopLevelMulDiv(s);
    if (mulDiv) {
      const leftVal = evalExpr(mulDiv.left, scope);
      const rightVal = evalExpr(mulDiv.right, scope);
      if (leftVal === null || rightVal === null) {
        throw new Error(`PseudoRuntimeError: Operador '${mulDiv.op}' no compatible con tipo 'Nulo'.`);
      }
      const left = Number(leftVal);
      const right = Number(rightVal);
      if (mulDiv.op === '*') return left * right;
      if (mulDiv.op === '/') {
        if (right === 0) throw new Error('PseudoRuntimeError: División por cero.');
        return left / right;
      }
      if (mulDiv.op === '//') {
        if (right === 0) throw new Error('PseudoRuntimeError: División por cero.');
        return Math.floor(Math.trunc(left) / Math.trunc(right));
      }
      if (mulDiv.op === '%') {
        if (right === 0) throw new Error('PseudoRuntimeError: Módulo por cero.');
        return Math.trunc(left) % Math.trunc(right);
      }
    }

    // Unary +/- (lower precedence than ^ so -2 ^ 2 === -4, while allowing 2 ^ -3 === 0.125)
    if (s.startsWith('-') && s.length > 1) {
      return -Number(evalExpr(s.slice(1), scope));
    }
    if (s.startsWith('+') && s.length > 1) {
      return Number(evalExpr(s.slice(1), scope));
    }

    // Power operator (^), right-associative (2 ^ 3 ^ 2 === 512)
    const powSplit = splitTopLevelPower(s);
    if (powSplit) {
      const left = evalExpr(powSplit.left, scope);
      const right = evalExpr(powSplit.right, scope);
      if (left === null || right === null) {
        throw new Error("PseudoRuntimeError: Operador '^' no compatible con tipo 'Nulo'.");
      }
      if (typeof left !== 'number' || typeof right !== 'number') {
        throw new Error("PseudoRuntimeError: Operador '^' solo compatible con números.");
      }
      return computePower(left, right);
    }

    // Parenthesized expression
    if (s.startsWith('(') && s.endsWith(')') && isMatchingOuterParens(s)) {
      return evalExpr(s.slice(1, -1), scope);
    }

    // Numeric literal
    if (/^\d+(\.\d+)?$/.test(s)) {
      return Number(s);
    }

    // Built-ins or Function calls: FUNC(args...)
    const fnCallMatch = s.match(/^([A-Za-z_][A-Za-z0-9_.]*)\s*\((.*)\)$/);
    if (fnCallMatch && isMatchingOuterParens(s.slice(fnCallMatch[1].length).trim())) {
      const fnName = fnCallMatch[1];
      const upperFn = fnName.toUpperCase();
      const argsList = fnCallMatch[2].trim()
        ? splitTopLevel(fnCallMatch[2].trim(), ',').map((a) => evalExpr(a, scope))
        : [];

      const requireArity = (expected: number) => {
        if (argsList.length !== expected) {
          throw new Error(
            `PseudoRuntimeError: ${upperFn} requiere exactamente ${expected} argumento(s).`
          );
        }
      };

      const requireNum = (val: any): number => {
        if (typeof val !== 'number' || Number.isNaN(val)) {
          throw new Error(`PseudoRuntimeError: ${upperFn} requiere argumentos numéricos.`);
        }
        return val;
      };

      const requireText = (val: any): string => {
        if (typeof val !== 'string') {
          throw new Error(`PseudoRuntimeError: ${upperFn} requiere un argumento de tipo CADENA.`);
        }
        return val;
      };

      if (fnName.endsWith('.LEER_LINEA')) {
        const targetName = fnName.slice(0, -'.LEER_LINEA'.length);
        const fObj = resolvePathValue(targetName, scope);
        if (fObj && fObj.__file) {
          const lineVal = fObj.lines[fObj.cursor] ?? '';
          fObj.cursor++;
          return lineVal;
        }
        return '';
      }

      if (upperFn === 'LEER') {
        if (argsList.length > 1) {
          throw new Error('PseudoRuntimeError: LEER requiere 0 o 1 argumento.');
        }
        let promptMsg = '';
        if (argsList.length === 1) {
          if (typeof argsList[0] !== 'string') {
            throw new Error('PseudoRuntimeError: LEER requiere un mensaje de tipo CADENA.');
          }
          promptMsg = argsList[0];
        }
        const raw = (readInput(promptMsg) ?? '').replace(/[\r\n]+$/, '');
        if (promptMsg) output.push(`${promptMsg}${raw}`);
        return parseInputLine(raw);
      }

      if (upperFn === 'MAYUSCULAS') {
        requireArity(1);
        return requireText(argsList[0]).toUpperCase();
      }
      if (upperFn === 'MINUSCULAS') {
        requireArity(1);
        return requireText(argsList[0]).toLowerCase();
      }
      if (upperFn === 'RECORTAR') {
        requireArity(1);
        return requireText(argsList[0]).trim();
      }
      if (upperFn === 'DIVIDIR_CADENA') {
        requireArity(2);
        const text = requireText(argsList[0]);
        const sep = requireText(argsList[1]);
        if (sep.length === 0) {
          throw new Error('PseudoRuntimeError: El separador no puede estar vacío.');
        }
        return text.split(sep);
      }

      if (upperFn === 'A_ENTERO') {
        requireArity(1);
        const v = argsList[0];
        if (typeof v === 'number') return Math.trunc(v);
        if (typeof v === 'boolean') return v ? 1 : 0;
        if (typeof v === 'string') {
          const t = v.trim();
          if (/^[+-]?\d+$/.test(t)) return Number.parseInt(t, 10);
          const f = parseFloatText(t);
          if (f !== null) return Math.trunc(f);
        }
        throw new Error(
          `PseudoRuntimeError: No se puede convertir '${formatYaguareteValue(v)}' a ENTERO.`
        );
      }
      if (upperFn === 'A_REAL' || upperFn === 'A_FLOTANTE') {
        requireArity(1);
        const v = argsList[0];
        let r: number | null = null;
        if (typeof v === 'number') r = v;
        else if (typeof v === 'boolean') r = v ? 1 : 0;
        else if (typeof v === 'string') r = parseFloatText(v);
        if (r === null) {
          throw new Error(
            `PseudoRuntimeError: No se puede convertir '${formatYaguareteValue(v)}' a número real.`
          );
        }
        return upperFn === 'A_FLOTANTE' ? Math.fround(r) : r;
      }
      if (upperFn === 'A_CADENA') {
        requireArity(1);
        return formatYaguareteValue(argsList[0]);
      }
      if (upperFn === 'A_BOOLEANO') {
        requireArity(1);
        const v = argsList[0];
        if (typeof v === 'boolean') return v;
        if (typeof v === 'number') return v !== 0;
        if (typeof v === 'string') {
          const up = v.trim().toUpperCase();
          if (up === 'VERDADERO' || up === 'TRUE') return true;
          if (up === 'FALSO' || up === 'FALSE') return false;
        }
        throw new Error(
          `PseudoRuntimeError: No se puede convertir '${formatYaguareteValue(v)}' a BOOLEANO.`
        );
      }

      if (upperFn === 'ESPAR') {
        requireArity(1);
        return Math.trunc(requireNum(argsList[0])) % 2 === 0;
      }
      if (upperFn === 'ESIMPAR') {
        requireArity(1);
        return Math.abs(Math.trunc(requireNum(argsList[0])) % 2) === 1;
      }
      if (upperFn === 'MOD') {
        requireArity(2);
        const d = Math.trunc(requireNum(argsList[1]));
        if (d === 0) throw new Error('PseudoRuntimeError: Módulo por cero.');
        return Math.trunc(requireNum(argsList[0])) % d;
      }
      if (upperFn === 'RAIZCUADRADA') {
        requireArity(1);
        const n = requireNum(argsList[0]);
        if (n < 0) {
          throw new Error(
            'PseudoRuntimeError: No se puede calcular la raíz cuadrada de un número negativo.'
          );
        }
        return Math.sqrt(n);
      }
      if (upperFn === 'ABS') {
        requireArity(1);
        return Math.abs(requireNum(argsList[0]));
      }
      if (upperFn === 'POTENCIA') {
        requireArity(2);
        return computePower(requireNum(argsList[0]), requireNum(argsList[1]));
      }
      if (upperFn === 'ALEATORIO') {
        requireArity(2);
        const lo = Math.trunc(requireNum(argsList[0]));
        const hi = Math.trunc(requireNum(argsList[1]));
        if (lo > hi) {
          throw new Error("PseudoRuntimeError: ALEATORIO: 'min' no puede ser mayor que 'max'.");
        }
        return Math.floor(Math.random() * (hi - lo + 1)) + lo;
      }
      if (upperFn === 'MIN' || upperFn === 'MAX') {
        requireArity(2);
        const a = requireNum(argsList[0]);
        const b = requireNum(argsList[1]);
        return upperFn === 'MIN' ? Math.min(a, b) : Math.max(a, b);
      }
      if (upperFn === 'REDONDEAR') {
        if (argsList.length < 1 || argsList.length > 2) {
          throw new Error('PseudoRuntimeError: REDONDEAR requiere 1 o 2 argumentos.');
        }
        const x = requireNum(argsList[0]);
        if (argsList.length === 1) {
          return roundHalfAwayFromZero(x);
        }
        const rawDec = requireNum(argsList[1]);
        if (!Number.isInteger(rawDec) || rawDec < 0) {
          throw new Error(
            'PseudoRuntimeError: Los decimales de REDONDEAR deben ser un entero mayor o igual a 0.'
          );
        }
        const factor = Math.pow(10, Math.min(rawDec, 300));
        const res = roundHalfAwayFromZero(x * factor) / factor;
        return Number.isFinite(res) ? res : x;
      }

      if (upperFn === 'ABRIR_ARCHIVO') {
        const path = String(argsList[0]);
        const mode = String(argsList[1] || 'lectura').toLowerCase();
        const linesData = VIRTUAL_FILES[path] ? [...VIRTUAL_FILES[path]] : [];
        return {
          __file: true,
          path,
          mode,
          lines: mode === 'escritura' ? [] : linesData,
          cursor: 0,
          get findearchivo() {
            return this.cursor >= this.lines.length;
          },
        };
      }

      if (funcs.has(fnName)) {
        return invokeFunction(funcs.get(fnName)!, argsList, scope);
      }
    }

    // Variable / Property / Array Index access
    return resolvePathValue(s, scope);
  }

  function resolvePathValue(pathExpr: string, scope: Map<string, VariableEntry>): any {
    // Handle expressions like matriz[0].largo or edades.largo or libro1.nombre or matriz[p // col][p % col]
    const tokens = tokenizeAccessPath(pathExpr);
    if (tokens.length === 0) return undefined;

    const rootName = tokens[0];
    if (tokens.length === 1 && rootName.toUpperCase() === 'PI') {
      return Math.PI;
    }
    const entry = scope.get(rootName) ?? globalVars.get(rootName);
    if (!entry) {
      throw new Error(`Identificador no declarado: '${rootName}'`);
    }
    let current = entry.value;

    for (let k = 1; k < tokens.length; k++) {
      const tok = tokens[k];
      if (tok.startsWith('[') && tok.endsWith(']')) {
        const idx = Math.trunc(Number(evalExpr(tok.slice(1, -1), scope)));
        if (!Array.isArray(current)) {
          throw new Error(`Intento de indexar un valor que no es arreglo: '${rootName}'`);
        }
        current = current[idx];
      } else if (tok.startsWith('.')) {
        const prop = tok.slice(1);
        if (current === null || current === undefined) {
          throw new Error(
            `PseudoRuntimeError: Intento de acceder al campo '${prop}' en una referencia nula (NULO)`
          );
        }
        if (prop === 'largo' && (Array.isArray(current) || typeof current === 'string')) {
          current = current.length;
        } else {
          if (typeof current === 'object' && current.__structName && !(prop in current)) {
            throw new Error(
              `PseudoRuntimeError: La estructura '${current.__structName}' no tiene el campo '${prop}'`
            );
          }
          current = current[prop];
        }
      }
    }
    return current;
  }

  function assignPathValue(
    lhs: string,
    newVal: any,
    scope: Map<string, VariableEntry>,
    declaredType?: string
  ) {
    const tokens = tokenizeAccessPath(lhs);
    const rootName = tokens[0];

    if (rootName.toUpperCase() === 'PI') {
      throw new Error("PseudoRuntimeError: No se puede reasignar o redeclarar la constante matemática 'PI'.");
    }

    if (tokens.length === 1) {
      const existing = scope.get(rootName) ?? globalVars.get(rootName);
      let finalVal = newVal;
      const targetType = declaredType || existing?.type || inferYaguareteType(newVal);
      if (targetType === 'FLOTANTE' && typeof finalVal === 'number') {
        finalVal = Math.fround(finalVal);
      } else if (targetType === 'ENTERO' && typeof finalVal === 'number') {
        finalVal = Math.trunc(finalVal);
      }
      if (existing && !declaredType) {
        existing.value = finalVal;
      } else {
        scope.set(rootName, { name: rootName, type: targetType, value: finalVal });
      }
      return;
    }

    const entry = scope.get(rootName) ?? globalVars.get(rootName);
    if (!entry) throw new Error(`Variable '${rootName}' no definida.`);
    let current = entry.value;

    for (let k = 1; k < tokens.length - 1; k++) {
      const tok = tokens[k];
      if (tok.startsWith('[')) {
        const idx = Math.trunc(Number(evalExpr(tok.slice(1, -1), scope)));
        current = current[idx];
      } else if (tok.startsWith('.')) {
        const prop = tok.slice(1);
        if (current === null || current === undefined) {
          throw new Error(
            `PseudoRuntimeError: Intento de acceder al campo '${prop}' en una referencia nula (NULO)`
          );
        }
        if (typeof current === 'object' && current.__structName && !(prop in current)) {
          throw new Error(
            `PseudoRuntimeError: La estructura '${current.__structName}' no tiene el campo '${prop}'`
          );
        }
        current = current[prop];
      }
    }

    const lastTok = tokens[tokens.length - 1];
    if (lastTok.startsWith('[')) {
      const idx = Math.trunc(Number(evalExpr(lastTok.slice(1, -1), scope)));
      current[idx] = newVal;
    } else if (lastTok.startsWith('.')) {
      const prop = lastTok.slice(1);
      if (current === null || current === undefined) {
        throw new Error(
          `PseudoRuntimeError: Intento de asignar el campo '${prop}' en una referencia nula (NULO)`
        );
      }
      if (typeof current === 'object' && current.__structName && !(prop in current)) {
        throw new Error(
          `PseudoRuntimeError: La estructura '${current.__structName}' no tiene el campo '${prop}'`
        );
      }
      current[prop] = newVal;
    }
  }

  function invokeFunction(
    fn: FuncDef,
    args: any[],
    callerScope: Map<string, VariableEntry>
  ): any {
    const localScope = new Map<string, VariableEntry>();
    fn.params.forEach((p, idx) => {
      localScope.set(p.name, {
        name: p.name,
        type: p.type,
        value: args[idx],
      });
    });

    const res = executeBlock(fn.body, localScope);
    return res.returned ? res.returnValue : undefined;
  }

  function executeBlock(
    stmts: string[],
    scope: Map<string, VariableEntry>
  ): { returned: boolean; returnValue?: any } {
    let idx = 0;
    let loopGuard = 0;

    while (idx < stmts.length) {
      if (++loopGuard > 150000) {
        throw new Error('Límite de iteraciones excedido en el entorno del navegador.');
      }

      const stmt = stmts[idx].trim();
      if (!stmt) {
        idx++;
        continue;
      }

      // RETORNAR
      if (/^RETORNAR\b/i.test(stmt)) {
        const expr = stmt.replace(/^RETORNAR\b/i, '').trim();
        return { returned: true, returnValue: expr ? evalExpr(expr, scope) : undefined };
      }

      // IMPRIMIR(...)
      const printMatch = stmt.match(/^IMPRIMIR\s*\((.*)\)$/i);
      if (printMatch) {
        const args = printMatch[1].trim()
          ? splitTopLevel(printMatch[1].trim(), ',').map((a) => evalExpr(a, scope))
          : [''];
        output.push(args.map((a) => formatYaguareteValue(a)).join(' '));
        idx++;
        continue;
      }

      // File methods: salida.ESCRIBIR_LINEA(...) or salida.CERRAR_ARCHIVO()
      const writeLineMatch = stmt.match(/^([A-Za-z_][A-Za-z0-9_]*)\.ESCRIBIR_LINEA\s*\((.*)\)$/i);
      if (writeLineMatch) {
        const fObj = resolvePathValue(writeLineMatch[1], scope);
        const text = formatYaguareteValue(evalExpr(writeLineMatch[2], scope));
        if (fObj && fObj.__file) {
          fObj.lines.push(text);
          VIRTUAL_FILES[fObj.path] = fObj.lines;
          output.push(`[ARCHIVO ${fObj.path}] << ${text}`);
        }
        idx++;
        continue;
      }

      if (/^[A-Za-z_][A-Za-z0-9_]*\.CERRAR_ARCHIVO\s*\(\s*\)$/i.test(stmt)) {
        idx++;
        continue;
      }

      // SI / SINO SI / SINO / FIN SI
      if (/^SI\b/i.test(stmt)) {
        const branches: { cond: string | null; body: string[] }[] = [];
        let currentCond: string | null = extractCondition(stmt.replace(/^SI\b/i, '').trim());
        let currentBody: string[] = [];
        idx++;
        let depth = 1;

        while (idx < stmts.length && depth > 0) {
          const line = stmts[idx].trim();
          if (/^SI\b/i.test(line)) {
            depth++;
            currentBody.push(line);
          } else if (/^FIN\s+SI$/i.test(line)) {
            depth--;
            if (depth === 0) {
              branches.push({ cond: currentCond, body: currentBody });
              break;
            } else {
              currentBody.push(line);
            }
          } else if (depth === 1 && /^SINO\s+SI\b/i.test(line)) {
            branches.push({ cond: currentCond, body: currentBody });
            currentCond = extractCondition(line.replace(/^SINO\s+SI\b/i, '').trim());
            currentBody = [];
          } else if (depth === 1 && /^SINO$/i.test(line)) {
            branches.push({ cond: currentCond, body: currentBody });
            currentCond = null;
            currentBody = [];
          } else {
            currentBody.push(line);
          }
          idx++;
        }

        for (const b of branches) {
          if (b.cond === null || Boolean(evalExpr(b.cond, scope))) {
            const r = executeBlock(b.body, scope);
            if (r.returned) return r;
            break;
          }
        }
        idx++;
        continue;
      }

      // PARA (init; cond; step) ... FIN PARA
      const paraMatch = stmt.match(/^PARA\s*\(([^;]+);([^;]+);([^)]+)\)$/i);
      if (paraMatch) {
        const initStmt = paraMatch[1].trim();
        const condExpr = paraMatch[2].trim();
        const stepStmt = paraMatch[3].trim();
        const loopBody: string[] = [];
        idx++;
        let depth = 1;
        while (idx < stmts.length && depth > 0) {
          if (/^PARA\s*\(/i.test(stmts[idx])) depth++;
          if (/^FIN\s+PARA$/i.test(stmts[idx])) {
            depth--;
            if (depth === 0) break;
          }
          loopBody.push(stmts[idx]);
          idx++;
        }

        executeBlock([initStmt], scope);
        while (Boolean(evalExpr(condExpr, scope))) {
          if (++loopGuard > 150000) {
            throw new Error('Límite de iteraciones excedido en bucle PARA.');
          }
          const r = executeBlock(loopBody, scope);
          if (r.returned) return r;
          executeBlock([stepStmt], scope);
        }
        idx++;
        continue;
      }

      // MIENTRAS ... FIN MIENTRAS
      if (/^MIENTRAS\b/i.test(stmt)) {
        const condExpr = extractCondition(stmt.replace(/^MIENTRAS\b/i, '').trim());
        const loopBody: string[] = [];
        idx++;
        let depth = 1;
        while (idx < stmts.length && depth > 0) {
          if (/^MIENTRAS\b/i.test(stmts[idx])) depth++;
          if (/^FIN\s+MIENTRAS$/i.test(stmts[idx])) {
            depth--;
            if (depth === 0) break;
          }
          loopBody.push(stmts[idx]);
          idx++;
        }

        while (Boolean(evalExpr(condExpr, scope))) {
          if (++loopGuard > 150000) {
            throw new Error('Límite de iteraciones excedido en bucle MIENTRAS.');
          }
          const r = executeBlock(loopBody, scope);
          if (r.returned) return r;
        }
        idx++;
        continue;
      }

      // HACER ... MIENTRAS (cond) [FIN HACER]
      if (/^HACER$/i.test(stmt)) {
        const loopBody: string[] = [];
        idx++;
        let condExpr = 'FALSO';
        while (idx < stmts.length) {
          if (/^MIENTRAS\b/i.test(stmts[idx])) {
            condExpr = extractCondition(stmts[idx].replace(/^MIENTRAS\b/i, '').trim());
            if (idx + 1 < stmts.length && /^FIN\s+HACER$/i.test(stmts[idx + 1])) {
              idx++;
            }
            break;
          }
          loopBody.push(stmts[idx]);
          idx++;
        }

        do {
          if (++loopGuard > 150000) {
            throw new Error('Límite de iteraciones excedido en bucle HACER...MIENTRAS.');
          }
          const r = executeBlock(loopBody, scope);
          if (r.returned) return r;
        } while (Boolean(evalExpr(condExpr, scope)));
        idx++;
        continue;
      }

      // Increment / Decrement: i++, i--
      const incMatch = stmt.match(/^([A-Za-z_][A-Za-z0-9_.]*)\s*(\+\+|--)$/);
      if (incMatch) {
        const cur = Number(resolvePathValue(incMatch[1], scope));
        assignPathValue(incMatch[1], incMatch[2] === '++' ? cur + 1 : cur - 1, scope);
        idx++;
        continue;
      }

      // Compound assignment: +=, -=
      const compMatch = stmt.match(/^([A-Za-z_][A-Za-z0-9_.\[\]]*)\s*(\+=|-=)\s*(.+)$/);
      if (compMatch) {
        const cur = Number(resolvePathValue(compMatch[1], scope));
        const delta = Number(evalExpr(compMatch[3], scope));
        assignPathValue(compMatch[1], compMatch[2] === '+=' ? cur + delta : cur - delta, scope);
        idx++;
        continue;
      }

      // Typed declaration with optional dimensions and initialization:
      // e.g. ENTERO edad = 25 | REAL matriz[12][30] | ENTERO[][] matriz_1 = [...] | Libro libro1
      const declMatch = stmt.match(
        /^(ENTERO|FLOTANTE|REAL|CADENA|CARACTER|BOOLEANO|ARCHIVO|[A-Za-z_][A-Za-z0-9_]*)((?:\[\s*\])*)\s+([A-Za-z_][A-Za-z0-9_]*)((?:\[[^\]]*\])*)\s*(?:=\s*(.+))?$/
      );
      if (
        declMatch &&
        ([
          'ENTERO',
          'FLOTANTE',
          'REAL',
          'CADENA',
          'CARACTER',
          'BOOLEANO',
          'ARCHIVO',
        ].includes(declMatch[1]) ||
          structs.has(declMatch[1]))
      ) {
        const baseType = declMatch[1];
        const prefixDims = declMatch[2] || '';
        const varName = declMatch[3];
        const suffixDims = declMatch[4] || '';
        const rhs = declMatch[5];

        let initVal: any = undefined;
        let fullType = baseType + (prefixDims || suffixDims ? '[]' : '');

        if (rhs !== undefined) {
          initVal = evalExpr(rhs, scope);
        } else if (suffixDims) {
          const dimMatches = [...suffixDims.matchAll(/\[([^\]]*)\]/g)];
          if (dimMatches.length === 1 && dimMatches[0][1]) {
            const len = Math.trunc(Number(evalExpr(dimMatches[0][1], scope)));
            initVal = Array.from({ length: len }, () =>
              structs.has(baseType) ? instantiateStruct(baseType) : 0
            );
          } else if (dimMatches.length === 2) {
            const rows = Math.trunc(Number(evalExpr(dimMatches[0][1], scope)));
            const cols = Math.trunc(Number(evalExpr(dimMatches[1][1], scope)));
            fullType = baseType + '[][]';
            initVal = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
          } else {
            initVal = [];
          }
        } else if (structs.has(baseType)) {
          initVal = instantiateStruct(baseType);
        } else {
          initVal = baseType === 'CADENA' ? '' : baseType === 'BOOLEANO' ? false : 0;
        }

        assignPathValue(varName, initVal, scope, fullType);
        idx++;
        continue;
      }

      // Standard assignment: lhs = rhs
      const assignIdx = findTopLevelEquals(stmt);
      if (assignIdx !== -1) {
        const lhs = stmt.slice(0, assignIdx).trim();
        const rhs = stmt.slice(assignIdx + 1).trim();
        const val = evalExpr(rhs, scope);
        assignPathValue(lhs, val, scope);
        idx++;
        continue;
      }

      // Standalone procedure/expression call
      lastExprValue = evalExpr(stmt, scope);
      idx++;
    }

    return { returned: false };
  }

  try {
    executeBlock(mainBody, globalVars);
    const timeMs = Math.max(0.12, Number((performance.now() - startTime).toFixed(2)));
    return {
      output,
      timeMs,
      variables: Array.from(globalVars.values()),
      lastExprValue,
    };
  } catch (err: any) {
    const timeMs = Math.max(0.12, Number((performance.now() - startTime).toFixed(2)));
    return {
      output,
      error: err?.message || String(err),
      timeMs,
      variables: Array.from(globalVars.values()),
    };
  }
}

function inferYaguareteType(val: any): string {
  if (typeof val === 'number') return Number.isInteger(val) ? 'ENTERO' : 'REAL';
  if (typeof val === 'boolean') return 'BOOLEANO';
  if (typeof val === 'string') return 'CADENA';
  if (Array.isArray(val)) {
    if (val.length === 0) return 'ENTERO[]';
    if (Array.isArray(val[0])) {
      const inner = inferYaguareteType(val[0]);
      return inner.endsWith('[]') ? `${inner}[]` : `${inner}[]`;
    }
    return `${inferYaguareteType(val[0])}[]`;
  }
  if (val && val.__structName) return val.__structName;
  if (val && val.__file) return 'ARCHIVO';
  return 'NULO';
}

function extractCondition(s: string): string {
  const t = s.trim();
  if (t.startsWith('(') && t.endsWith(')') && isMatchingOuterParens(t)) {
    return t.slice(1, -1).trim();
  }
  return t;
}

function isMatchingOuterParens(s: string): boolean {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0 && i < s.length - 1) return false;
      }
    }
  }
  return depth === 0;
}

function splitTopLevel(s: string, delimiter: string): string[] {
  const res: string[] = [];
  let cur = '';
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "'" && !inD) inS = !inS;
    else if (ch === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (ch === '(') p++;
      else if (ch === ')') p--;
      else if (ch === '[') b++;
      else if (ch === ']') b--;
      else if (p === 0 && b === 0 && s.startsWith(delimiter, i)) {
        res.push(cur.trim());
        cur = '';
        i += delimiter.length - 1;
        continue;
      }
    }
    cur += ch;
  }
  if (cur.trim()) res.push(cur.trim());
  return res;
}

function splitByLogicalKeyword(s: string, kw: 'Y' | 'O'): string[] {
  const regex = new RegExp(`\\s+${kw}\\s+`, 'g');
  const parts: string[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(s)) !== null) {
    const before = s.slice(0, m.index);
    if (isBalanced(before)) {
      parts.push(s.slice(lastIndex, m.index).trim());
      lastIndex = m.index + m[0].length;
    }
  }
  if (parts.length > 0) {
    parts.push(s.slice(lastIndex).trim());
    return parts;
  }
  return [s];
}

function isBalanced(s: string): boolean {
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (c === '(') p++;
      else if (c === ')') p--;
      else if (c === '[') b++;
      else if (c === ']') b--;
    }
  }
  return p === 0 && b === 0 && !inS && !inD;
}

function splitTopLevelOperator(s: string, op: string): [string, string] | null {
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (c === '(') p++;
      else if (c === ')') p--;
      else if (c === '[') b++;
      else if (c === ']') b--;
      else if (p === 0 && b === 0 && s.startsWith(op, i)) {
        if ((op === '<' || op === '>') && s[i + 1] === '=') continue;
        return [s.slice(0, i).trim(), s.slice(i + op.length).trim()];
      }
    }
  }
  return null;
}

function splitTopLevelAddSub(s: string): { left: string; op: '+' | '-'; right: string } | null {
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (c === ')') p++;
      else if (c === '(') p--;
      else if (c === ']') b++;
      else if (c === '[') b--;
      else if (p === 0 && b === 0 && (c === '+' || c === '-') && i > 0) {
        const prev = s.slice(0, i).trim();
        if (prev && !/[+\-*/%^,(,=<>!]$/.test(prev) && !/\d[eE]$/.test(prev)) {
          return { left: prev, op: c, right: s.slice(i + 1).trim() };
        }
      }
    }
  }
  return null;
}

function splitTopLevelMulDiv(
  s: string
): { left: string; op: '*' | '/' | '//' | '%'; right: string } | null {
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (c === ')') p++;
      else if (c === '(') p--;
      else if (c === ']') b++;
      else if (c === '[') b--;
      else if (p === 0 && b === 0) {
        if (c === '/' && s[i - 1] === '/') {
          return {
            left: s.slice(0, i - 1).trim(),
            op: '//',
            right: s.slice(i + 1).trim(),
          };
        }
        if (c === '*' || c === '/' || c === '%') {
          return { left: s.slice(0, i).trim(), op: c, right: s.slice(i + 1).trim() };
        }
      }
    }
  }
  return null;
}

function splitTopLevelPower(s: string): { left: string; right: string } | null {
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (c === '(') p++;
      else if (c === ')') p--;
      else if (c === '[') b++;
      else if (c === ']') b--;
      else if (p === 0 && b === 0 && c === '^') {
        const left = s.slice(0, i).trim();
        const right = s.slice(i + 1).trim();
        if (left && right) {
          return { left, right };
        }
      }
    }
  }
  return null;
}

function findTopLevelEquals(s: string): number {
  let p = 0;
  let b = 0;
  let inS = false;
  let inD = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (c === '(') p++;
      else if (c === ')') p--;
      else if (c === '[') b++;
      else if (c === ']') b--;
      else if (
        p === 0 &&
        b === 0 &&
        c === '=' &&
        s[i - 1] !== '=' &&
        s[i - 1] !== '!' &&
        s[i - 1] !== '<' &&
        s[i - 1] !== '>' &&
        s[i + 1] !== '='
      ) {
        return i;
      }
    }
  }
  return -1;
}

function tokenizeAccessPath(expr: string): string[] {
  const tokens: string[] = [];
  let cur = '';
  let b = 0;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (c === '[') {
      if (b === 0 && cur) {
        tokens.push(cur);
        cur = '';
      }
      b++;
      cur += c;
    } else if (c === ']') {
      b--;
      cur += c;
      if (b === 0) {
        tokens.push(cur);
        cur = '';
      }
    } else if (c === '.' && b === 0) {
      if (cur) tokens.push(cur);
      cur = '.';
    } else {
      cur += c;
    }
  }
  if (cur) tokens.push(cur);
  return tokens;
}
