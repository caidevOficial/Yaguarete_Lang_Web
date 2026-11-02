import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Play, Copy, Check, CheckCircle2, Sparkles } from 'lucide-react';
import { CODE_RECIPES, HERO_SLIDES } from '../data/yaguareteData';
import { YaguareteCodeBlock } from '../utils/syntaxHighlighter';

export const ExamplesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = ['Todos', 'Básico', 'Estructuras y Punteros', 'Matrices y Algoritmos', 'Archivos'];

  const allExamples = [
    ...CODE_RECIPES,
    {
      id: 'archivos-secuenciales',
      filename: 'nomina_archivos.yaguarete',
      title: 'Lectura y Escritura Secuencial de Archivos (ARCHIVO)',
      category: 'Archivos' as const,
      complexity: 'O(L) líneas leídas | Streaming secuencial',
      description:
        'Procesa registros línea a línea con .LEER_LINEA() controlando .findearchivo y genera un archivo de resumen con .ESCRIBIR_LINEA().',
      highlights: [
        'Control de bucle con MIENTRAS NO nomina.findearchivo',
        'Escritura estructurada y cierre seguro con .CERRAR_ARCHIVO()',
      ],
      code: HERO_SLIDES[4].code,
    },
    {
      id: 'selection-sort-matriz',
      filename: 'ordenar_matriz.yaguarete',
      title: 'Ordenamiento de Matriz 2D con // y % (Selection Sort)',
      category: 'Matrices y Algoritmos' as const,
      complexity: 'O(N²) con N = filas * columnas',
      description:
        'Traduce un índice lineal p a coordenadas [p // columnas][p % columnas] sin necesidad de bucles anidados para aplanar y reconstruir la matriz.',
      highlights: [
        'Traducción directa de índice lineal con // y %',
        'Preserva intacta la matriz original y retorna ENTERO[][]',
      ],
      code: HERO_SLIDES[3].code,
    },
  ];

  const filtered =
    selectedCategory === 'Todos'
      ? allExamples
      : allExamples.filter((r) => r.category === selectedCategory);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-500 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Recetario Oficial de Algoritmos (.yaguarete)
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
            Ejemplos Canónicos y Estructuras de Datos
          </h1>
          <p className="text-sm text-(--text-secondary) max-w-2xl">
            Explora programas reales del repositorio oficial de YAGUARETÉ. Puedes copiar el código o cargarlo con un clic en el Playground Interactivo para ejecutarlo en el navegador.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'cyber-card text-(--text-secondary) hover:text-blue-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {filtered.map((recipe) => (
          <article key={recipe.id} className="cyber-card rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8 border-b border-(--border-subtle) flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600/15 text-blue-500">
                    {recipe.category}
                  </span>
                  <code className="inline-code text-xs">{recipe.filename}</code>
                  <span className="text-xs font-mono text-(--text-muted)">
                    • {recipe.complexity}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold">{recipe.title}</h2>
                <p className="text-sm text-(--text-secondary) max-w-3xl">{recipe.description}</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {recipe.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs text-(--text-secondary)"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(recipe.code, recipe.id)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === recipe.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedId === recipe.id ? 'Copiado' : 'Copiar Código'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/playground', { state: { code: recipe.code } })}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-blue-600/25 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Ejecutar en Playground
                </button>
              </div>
            </div>

            <div className="p-2 bg-[#070b14]">
              <YaguareteCodeBlock code={recipe.code} className="border-0 max-h-[420px]" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
