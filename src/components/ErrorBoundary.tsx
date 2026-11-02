import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error in Yaguarete Web:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#060913] text-white px-4">
          <div className="max-w-md w-full bg-[#0d1527] border border-cyan-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-3xl">
              🐆
            </div>
            <h1 className="text-2xl font-bold mb-2 text-cyan-300">¡Algo no cargó correctamente!</h1>
            <p className="text-slate-400 text-sm mb-6">
              Ocurrió un error inesperado al renderizar la interfaz. Puedes reiniciar la aplicación haciendo clic en el botón.
            </p>
            <button
              onClick={() => {
                window.location.hash = '#/';
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              Recargar Sitio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
