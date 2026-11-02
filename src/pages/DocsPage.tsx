import React from 'react';
import {
  BookOpen,
  Cpu,
  Layers,
  Code2,
  FileText,
  Terminal,
  AlertCircle,
  CheckCircle2,
  Link2,
} from 'lucide-react';
import {
  PRIMITIVE_TYPES_TABLE,
  OPERATORS_TABLE,
  BUILTINS_TABLE,
  CLI_COMMANDS,
} from '../data/yaguareteData';
import { YaguareteCodeBlock } from '../utils/syntaxHighlighter';

export const DocsPage: React.FC = () => {
  const sections = [
    { id: 'introduccion', label: '¿Qué es YAGUARETÉ?' },
    { id: 'tipos-primitivos', label: 'Sistema de Tipos Estático' },
    { id: 'vectores-matrices', label: 'Vectores y Matrices (.largo)' },
    { id: 'estructuras-datos', label: 'Estructuras y Tipo NULO' },
    { id: 'operadores', label: 'Operadores (// y %)' },
    { id: 'funciones-procedimientos', label: 'Funciones y Procedimientos' },
    { id: 'estructuras-control', label: 'Estructuras de Control' },
    { id: 'funciones-incorporadas', label: 'Manejo de Archivos y Built-ins' },
    { id: 'cli-comandos', label: 'Interfaz CLI y Motor Rust' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sticky Left Sidebar TOC (Python.org Docs style) */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 cyber-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-500">
              <BookOpen className="w-4 h-4" />
              Índice de Referencia v0.1.1
            </div>
            <nav aria-label="Tabla de contenidos de documentación" className="space-y-1 text-sm">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block px-3 py-2 rounded-lg text-(--text-secondary) hover:text-blue-500 hover:bg-blue-500/10 transition-colors font-medium"
                >
                  {sec.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Documentation Content */}
        <div className="lg:col-span-9 space-y-16">
          {/* 1. Introducción */}
          <section id="introduccion" className="scroll-mt-28 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-500 text-xs font-bold">
              Especificación Oficial del Lenguaje • Extensión .yaguarete
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
              Documentación Canónica de YAGUARETÉ
            </h1>
            <p className="text-(--text-secondary) leading-relaxed">
              <strong>YAGUARETÉ</strong> es un lenguaje de programación de pseudocódigo en español, diseñado para combinar la intuición pedagógica del pseudocódigo clásico con el rigor técnico y la seguridad de un <strong>sistema de tipos estático y moderno</strong> ejecutado sobre un motor nativo en Rust (<code className="inline-code">&lt;1 ms</code>).
            </p>
            <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong>Extensión Oficial Obligatoria:</strong> Todos los archivos fuente utilizan la extensión <code className="inline-code">.yaguarete</code> (por ejemplo: <code className="inline-code">algoritmo.yaguarete</code>, <code className="inline-code">pilas.yaguarete</code>).
              </div>
            </div>
          </section>

          {/* 2. Sistema de Tipos */}
          <section id="tipos-primitivos" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-500" />
              1. Sistema de Tipos (Fuertemente Tipado)
            </h2>
            <p className="text-sm text-(--text-secondary)">
              YAGUARETÉ valida estáticamente variables, firmas de funciones, aridad y tipos de retorno antes y durante la ejecución.
            </p>

            <div
              tabIndex={0}
              role="region"
              aria-labelledby="primitive-types-caption"
              className="table-wrapper"
            >
              <table
                style={
                  {
                    '--label-2': '"Equivalente"',
                    '--label-3': '"Descripción"',
                    '--label-4': '"Ejemplo"',
                  } as React.CSSProperties
                }
              >
                <caption id="primitive-types-caption">
                  Tabla de Tipos Primitivos y Compuestos en YAGUARETÉ
                </caption>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Equivalente</th>
                    <th>Descripción</th>
                    <th>Ejemplo de Declaración</th>
                  </tr>
                </thead>
                <tbody>
                  {PRIMITIVE_TYPES_TABLE.map((row) => (
                    <tr key={row.type}>
                      <th>
                        <code className="inline-code font-bold">{row.type}</code>
                      </th>
                      <td className="font-mono text-xs">{row.equivalent}</td>
                      <td>{row.description}</td>
                      <td>
                        <code className="inline-code">{row.example}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm">
              <strong className="text-amber-500 block mb-1">
                Diferencia Determinística entre FLOTANTE y REAL:
              </strong>
              <code className="inline-code">FLOTANTE</code> trunca deliberadamente la mantisa a 32 bits conforme al estándar IEEE 754 (<code className="inline-code">f32</code>), mientras que <code className="inline-code">REAL</code> preserva 64 bits de doble precisión (<code className="inline-code">f64</code>) para cálculos científicos o financieros.
            </div>
          </section>

          {/* 3. Vectores y Matrices */}
          <section id="vectores-matrices" className="scroll-mt-28 space-y-4">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-500" />
              2. Vectores, Matrices e Introspección (.largo)
            </h2>
            <p className="text-sm text-(--text-secondary)">
              Los arreglos unidimensionales (<code className="inline-code">TIPO[]</code>) y matrices bidimensionales (<code className="inline-code">TIPO[][]</code>) cuentan con la propiedad intrínseca <code className="inline-code">.largo</code> y admiten concatenación directa con el operador <code className="inline-code">+</code>.
            </p>
            <YaguareteCodeBlock
              code={`// Vectores unidimensionales
ENTERO edades[] = [18, 21, 30, 42]
REAL promedios[5] = [8.5, 9.0, 7.2, 10.0, 6.8]

// Matrices bidimensionales (filas x columnas)
REAL matriz[12][30]
ENTERO identidad[2][2] = [[1, 0], [0, 1]]

// Propiedad .largo y concatenación de vectores
IMPRIMIR(edades.largo)       // 4 (cantidad de elementos)
IMPRIMIR(matriz.largo)       // 12 (cantidad de filas)
IMPRIMIR(matriz[0].largo)    // 30 (cantidad de columnas)

ENTERO grupo_total[] = [1, 2] + [3, 4] // [1, 2, 3, 4]`}
            />
          </section>

          {/* 4. Estructuras y NULO */}
          <section id="estructuras-datos" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Link2 className="w-6 h-6 text-emerald-500" />
              3. Estructuras Compuestas y Punteros Autorreferenciales (NULO)
            </h2>
            <p className="text-sm text-(--text-secondary)">
              Mediante el bloque <code className="inline-code">ESTRUCTURA ... FIN ESTRUCTURA</code> puedes definir registros compuestos y estructuras autorreferenciales (como Nodos de Listas Enlazadas, Pilas y Colas). Al instanciar una estructura autorreferencial, YAGUARETÉ inicializa automáticamente sus campos recursivos en <code className="inline-code">NULO</code> para impedir ciclos infinitos.
            </p>
            <YaguareteCodeBlock
              code={`ESTRUCTURA Nodo:
    CADENA nombre
    Nodo proximo_nodo
FIN ESTRUCTURA

INICIO
    Nodo cabeza = NULO
    Nodo nuevo
    nuevo.nombre = "Nodo Inicial"
    nuevo.proximo_nodo = NULO
    cabeza = nuevo

    SI (cabeza != NULO)
        IMPRIMIR("Cabeza activa: " + cabeza.nombre)
    FIN SI
FIN`}
            />
          </section>

          {/* 5. Operadores */}
          <section id="operadores" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Code2 className="w-6 h-6 text-sky-400" />
              4. Operadores Aritméticos, División Entera (//) y Módulo (%)
            </h2>
            <p className="text-sm text-(--text-secondary)">
              El analizador léxico de YAGUARETÉ desambigua inteligentemente <code className="inline-code">//</code>: actúa como <strong>división entera</strong> cuando se ubica entre dos operandos (incluso dentro de índices como <code className="inline-code">matriz[p // columnas][p % columnas]</code>) y como <strong>comentario</strong> al inicio de línea o tras código libre.
            </p>
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="operators-table-caption"
              className="table-wrapper"
            >
              <table
                style={
                  {
                    '--label-2': '"Operación"',
                    '--label-3': '"Tipo Retorno"',
                    '--label-4': '"Ejemplo"',
                  } as React.CSSProperties
                }
              >
                <caption id="operators-table-caption">
                  Operadores Aritméticos, Relacionales y Lógicos
                </caption>
                <thead>
                  <tr>
                    <th>Operador</th>
                    <th>Operación</th>
                    <th>Tipo de Resultado</th>
                    <th>Ejemplo</th>
                  </tr>
                </thead>
                <tbody>
                  {OPERATORS_TABLE.map((op, i) => (
                    <tr key={i}>
                      <th>
                        <code className="inline-code font-bold">{op.operator}</code>
                      </th>
                      <td>{op.operation}</td>
                      <td>
                        <code className="inline-code">{op.returnType}</code>
                      </td>
                      <td className="font-mono text-xs">{op.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Funciones y Estructuras de Control */}
          <section id="funciones-procedimientos" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl font-bold">
              5. Funciones, Procedimientos y Estructuras de Control
            </h2>
            <div id="estructuras-control" className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="text-sm font-bold mb-2">Condicional SI / SINO SI / SINO</h3>
                <YaguareteCodeBlock
                  code={`SI (edad >= 18 Y activo == VERDADERO)
    IMPRIMIR("Mayor de edad habilitado")
SINO SI (edad >= 16)
    IMPRIMIR("Permiso especial")
SINO
    IMPRIMIR("No habilitado")
FIN SI`}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-2">Bucles PARA, MIENTRAS y HACER...MIENTRAS</h3>
                <YaguareteCodeBlock
                  code={`PARA (ENTERO i = 0; i < 5; i++)
    IMPRIMIR("Iteración: " + i)
FIN PARA

ENTERO intentos = 0
HACER
    intentos++
MIENTRAS (intentos < 3)
FIN HACER`}
                />
              </div>
            </div>
          </section>

          {/* 7. Archivos y Built-ins */}
          <section id="funciones-incorporadas" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-amber-400" />
              6. Manejo de Archivos (ARCHIVO) y Funciones Incorporadas
            </h2>
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="builtins-table-caption"
              className="table-wrapper"
            >
              <table
                style={
                  {
                    '--label-2': '"Parámetros"',
                    '--label-3': '"Retorno"',
                    '--label-4': '"Descripción"',
                  } as React.CSSProperties
                }
              >
                <caption id="builtins-table-caption">
                  Funciones Incorporadas (Built-ins) y Métodos de ARCHIVO
                </caption>
                <thead>
                  <tr>
                    <th>Función / Método</th>
                    <th>Parámetros</th>
                    <th>Retorno</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {BUILTINS_TABLE.map((b, idx) => (
                    <tr key={idx}>
                      <th>
                        <code className="inline-code font-bold">{b.fn}</code>
                      </th>
                      <td className="text-xs font-mono">{b.params}</td>
                      <td>
                        <code className="inline-code">{b.returns}</code>
                      </td>
                      <td>{b.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. CLI Commands */}
          <section id="cli-comandos" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Terminal className="w-6 h-6 text-emerald-400" />
              7. Interfaz de Línea de Comandos (yaguarete)
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {CLI_COMMANDS.map((c, idx) => (
                <div key={idx} className="cyber-card rounded-xl p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <code className="inline-code text-sm font-bold">{c.cmd}</code>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600/15 text-blue-500">
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-sm text-(--text-secondary)">{c.description}</p>
                  <div className="code-surface px-3 py-2 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800">
                    $ {c.example}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
