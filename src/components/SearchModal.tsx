import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, CornerDownLeft, BookOpen, Terminal, Cpu, Code2, Sparkles } from 'lucide-react';
import { SEARCHABLE_DOCS, CODE_RECIPES, DocSearchResult } from '../data/yaguareteData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Open/close native <dialog> via showModal()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      setTimeout(() => inputRef.current?.focus(), 20);
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Mandatory fallback for browsers without native <dialog closedby="any"> support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      onClose();
    };

    const handleBackdropClick = (event: MouseEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      }
    };

    dialog.addEventListener('close', handleNativeClose);
    dialog.addEventListener('click', handleBackdropClick);
    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  const categories = [
    'Todos',
    'Tipos de Datos',
    'Sintaxis y Control',
    'Funciones Built-in',
    'Operadores',
    'CLI y Motor Rust',
    'Recetas',
  ];

  const allItems: (DocSearchResult & { isRecipe?: boolean })[] = [
    ...SEARCHABLE_DOCS,
    ...CODE_RECIPES.map((r) => ({
      id: `recipe-${r.id}`,
      title: `${r.title} (${r.filename})`,
      category: 'Sintaxis y Control' as const,
      summary: r.description,
      syntax: r.complexity,
      route: `/ejemplos?recipe=${r.id}`,
      isRecipe: true,
    })),
  ];

  const filtered = allItems.filter((item) => {
    const matchesCat =
      selectedCategory === 'Todos' ||
      (selectedCategory === 'Recetas' ? item.isRecipe : item.category === selectedCategory);
    if (!matchesCat) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      (item.syntax && item.syntax.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const handleSelect = (item: DocSearchResult) => {
    dialogRef.current?.close();
    onClose();
    if (item.anchor) {
      navigate(`${item.route}#${item.anchor}`);
      setTimeout(() => {
        const el = document.getElementById(item.anchor!);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      navigate(item.route);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="searchDialogTitle"
      className="search-dialog overflow-hidden"
      {...({ closedby: 'any' } as any)}
    >
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/95 text-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h2 id="searchDialogTitle" className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Buscador Instantáneo de Documentación YAGUARETÉ
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar buscador"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-sky-400 absolute left-3.5 pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar tipos (ENTERO, REAL, NULO), built-ins (IMPRIMIR, ABRIR_ARCHIVO), CLI (repl, lsp-check)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 focus:border-sky-400 rounded-xl text-sm text-white placeholder-slate-400 outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto p-3 bg-slate-950 text-slate-100 divide-y divide-slate-800/60">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            No se encontraron resultados para <span className="text-sky-400 font-semibold">"{query}"</span>.
          </div>
        ) : (
          filtered.slice(0, 18).map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left p-3 rounded-xl flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-950/70 border border-blue-500/40' : 'hover:bg-slate-900/70'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/15 text-sky-400 border border-sky-500/20">
                      {item.category === 'CLI y Motor Rust' ? (
                        <Terminal className="w-3 h-3" />
                      ) : item.category === 'Tipos de Datos' ? (
                        <Cpu className="w-3 h-3" />
                      ) : item.isRecipe ? (
                        <Code2 className="w-3 h-3" />
                      ) : (
                        <BookOpen className="w-3 h-3" />
                      )}
                      {item.isRecipe ? 'Receta .yaguarete' : item.category}
                    </span>
                    <span className="font-bold text-sm text-white truncate">{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{item.summary}</p>
                  {item.syntax && (
                    <code className="inline-block text-[11px] text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.syntax}
                    </code>
                  )}
                </div>
                <CornerDownLeft
                  className={`w-4 h-4 shrink-0 mt-1 ${
                    isSelected ? 'text-sky-400' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })
        )}
      </div>

      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">↑</kbd>{' '}
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">↓</kbd> navegar
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Enter</kbd> ir
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Esc</kbd> o clic fuera para cerrar
          </span>
        </div>
        <span>{filtered.length} resultados</span>
      </div>
    </dialog>
  );
};
