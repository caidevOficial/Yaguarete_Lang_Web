export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  description: string;
  code: string;
  expectedOutput: string[];
}

export interface DocSearchResult {
  id: string;
  title: string;
  category: 'Tipos de Datos' | 'Sintaxis y Control' | 'Funciones Built-in' | 'CLI y Motor Rust' | 'VS Code & DAP' | 'Operadores';
  summary: string;
  syntax?: string;
  route: string;
  anchor?: string;
}

export interface CodeRecipe {
  id: string;
  filename: string;
  title: string;
  category: 'Básico' | 'Estructuras y Punteros' | 'Matrices y Algoritmos' | 'Archivos';
  complexity: string;
  description: string;
  highlights: string[];
  code: string;
}

export interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  tag: 'Oficial' | 'Motor Rust' | 'Linux & CLI' | 'Estructuras';
  highlights: {
    section: string;
    items: string[];
  }[];
}

export const GITHUB_REPO_URL = 'https://github.com/caidevOficial/Yaguarete_Lang';
export const GITHUB_RELEASES_URL = 'https://github.com/caidevOficial/Yaguarete_Lang/releases';
export const GITHUB_LATEST_RELEASE_URL = 'https://github.com/caidevOficial/Yaguarete_Lang/releases/latest';

export const DOWNLOAD_ASSETS = {
  windowsInstaller: {
    name: 'Instalador_Yaguarete.exe',
    label: 'Instalador Gráfico Todo-en-Uno (Windows x64)',
    version: '0.1.2',
    size: '~7.8 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/Instalador_Yaguarete.exe`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Instala automáticamente el binario nativo yaguarete.exe, configura el PATH del usuario, asocia iconos .yaguarete en Windows y registra la extensión oficial en VS Code y Antigravity IDE.',
    silentCommand: '.\\Instalador_Yaguarete.exe --silent',
  },
  windowsBinary: {
    name: 'yaguarete.exe',
    label: 'Binario CLI Autónomo (Windows PE x64)',
    version: '0.1.2',
    size: '~2.4 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete.exe`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description: 'Ejecutable nativo compilado en Rust sin dependencias externas ni runtime.',
  },
  linuxDeb: {
    name: 'yaguarete_0.1.2_amd64.deb',
    label: 'Paquete Nativo Debian / Ubuntu (.deb)',
    version: '0.1.2',
    size: '~3.3 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete_0.1.2_amd64.deb`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Para Ubuntu, Debian, Linux Mint, Pop!_OS y Kali Linux. Instala /usr/bin/yaguarete, registra el tipo MIME application/x-yaguarete e iconos del sistema.',
    installCommand: 'sudo apt install ./yaguarete_0.1.2_amd64.deb',
  },
  linuxTar: {
    name: 'yaguarete-0.1.2-linux-x86_64.tar.gz',
    label: 'Tarball Portable Universal Linux (.tar.gz)',
    version: '0.1.2',
    size: '~3.5 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete-0.1.2-linux-x86_64.tar.gz`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Compatible con cualquier distribución (Arch, Fedora, openSUSE, Alpine). Incluye script install.sh para usuario (~/.local/bin) o global.',
    installCommand: 'tar -xzf yaguarete-0.1.2-linux-x86_64.tar.gz && cd yaguarete-0.1.2-linux-x86_64 && ./install.sh',
  },
  vscodeExtension: {
    name: 'yaguarete-language-support-0.1.2.vsix',
    label: 'Extensión Oficial VS Code / Antigravity / Cursor (.vsix)',
    version: '0.1.2',
    size: '~778 KB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete-language-support-0.1.2.vsix`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Tema de iconos "Jaguar Gamer", gramática TextMate avanzada, IntelliSense prioritario, diagnósticos LSP en <0.2 ms, depurador DAP con breakpoints y consola REPL.',
    installCommand: 'code --install-extension yaguarete-language-support-0.1.2.vsix --force',
  },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: 'Tipado Estático y Funciones',
    title: 'Pseudocódigo en español con rigor de lenguaje compilado',
    description:
      'YAGUARETÉ combina palabras clave naturales en español (INICIO, FUNCION, PROCEDIMIENTO, SI, PARA) con validación estática de tipos y distinción IEEE 754 entre FLOTANTE (32 bits) y REAL (64 bits).',
    code: `// Funciones tipadas y procedimientos en YAGUARETÉ
FUNCION calcular_promedio(nota1: REAL, nota2: REAL): REAL
    REAL promedio = (nota1 + nota2) / 2
    RETORNAR promedio
FIN FUNCION

PROCEDIMIENTO evaluar_alumno(nombre: CADENA, n1: REAL, n2: REAL)
    REAL final = calcular_promedio(n1, n2)
    IMPRIMIR("Alumno: " + nombre + " | Promedio: " + final)
    SI (final >= 7.0)
        IMPRIMIR("Estado: PROMOCIONADO")
    SINO
        IMPRIMIR("Estado: REGULAR")
    FIN SI
FIN PROCEDIMIENTO

INICIO
    evaluar_alumno("Lucía Mendez", 8.5, 9.5)
FIN`,
    expectedOutput: [
      'Alumno: Lucía Mendez | Promedio: 9',
      'Estado: PROMOCIONADO',
    ],
  },
  {
    id: 2,
    badge: 'Estructuras Compuestas',
    title: 'Tipos compuestos ESTRUCTURA y arreglos tipados',
    description:
      'Define registros y estructuras de datos heterogéneas mediante ESTRUCTURA ... FIN ESTRUCTURA. Almacénalas en vectores tipados y pásalas por parámetro a funciones con autocompletado por punto (.).',
    code: `ESTRUCTURA Libro:
    CADENA nombre
    CADENA autor
    ENTERO hojas
FIN ESTRUCTURA

FUNCION resumir_libro(item: Libro): CADENA
    RETORNAR item.nombre + " por " + item.autor + " [" + item.hojas + " págs.]"
FIN FUNCION

INICIO
    Libro libro1
    libro1.nombre = "El Aleph"
    libro1.autor = "Jorge Luis Borges"
    libro1.hojas = 210

    Libro libro2
    libro2.nombre = "Ficciones"
    libro2.autor = "Jorge Luis Borges"
    libro2.hojas = 190

    Libro estante[2]
    estante[0] = libro1
    estante[1] = libro2

    PARA (ENTERO i = 0; i < estante.largo; i++)
        IMPRIMIR("• " + resumir_libro(estante[i]))
    FIN PARA
FIN`,
    expectedOutput: [
      '• El Aleph por Jorge Luis Borges [210 págs.]',
      '• Ficciones por Jorge Luis Borges [190 págs.]',
    ],
  },
  {
    id: 3,
    badge: 'Punteros y Tipo NULO',
    title: 'Estructuras autorreferenciales, Listas, Pilas y Colas',
    description:
      'Soporte nativo para estructuras que se referencian a sí mismas y el literal universal NULO con protección Null-Safety en tiempo de ejecución e inicialización segura contra ciclos infinitos.',
    code: `INICIO
    ESTRUCTURA Nodo:
        CADENA nombre
        Nodo proximo_nodo
    FIN ESTRUCTURA

    Nodo nodo_pila = NULO
    Nodo nodo_ultimo = NULO

    PARA (ENTERO vuelta = 0; vuelta < 4; vuelta++)
        Nodo nuevo_nodo
        nuevo_nodo.nombre = "Nodo " + (vuelta + 1)
        nuevo_nodo.proximo_nodo = NULO

        SI (nodo_pila == NULO)
            nodo_pila = nuevo_nodo
            nodo_ultimo = nuevo_nodo
        SINO
            nodo_ultimo.proximo_nodo = nuevo_nodo
            nodo_ultimo = nuevo_nodo
        FIN SI
    FIN PARA

    Nodo nodo_aux = nodo_pila
    MIENTRAS (nodo_aux != NULO)
        IMPRIMIR("Recorriendo -> " + nodo_aux.nombre)
        nodo_aux = nodo_aux.proximo_nodo
    FIN MIENTRAS
FIN`,
    expectedOutput: [
      'Recorriendo -> Nodo 1',
      'Recorriendo -> Nodo 2',
      'Recorriendo -> Nodo 3',
      'Recorriendo -> Nodo 4',
    ],
  },
  {
    id: 4,
    badge: 'Matrices y División Entera //',
    title: 'Álgebra matricial y ordenamiento con // y %',
    description:
      'Los operadores infijos de división entera (//) y módulo (%) conviven inteligentemente con los comentarios de línea, permitiendo mapear índices lineales a coordenadas [p // col][p % col].',
    code: `FUNCION ordenar_matriz(matriz[][]: ENTERO): ENTERO[][]
    ENTERO filas = matriz.largo
    ENTERO columnas = matriz[0].largo
    ENTERO total = filas * columnas

    // 1. Aplanar la matriz usando división entera (//) y módulo (%)
    ENTERO elementos[total]
    PARA (ENTERO p = 0; p < total; p++)
        elementos[p] = matriz[p // columnas][p % columnas]
    FIN PARA

    // 2. Selection Sort sobre el vector
    PARA (ENTERO i = 0; i < total - 1; i++)
        ENTERO min = i
        PARA (ENTERO j = i + 1; j < total; j++)
            SI (elementos[j] < elementos[min])
                min = j
            FIN SI
        FIN PARA
        SI (min != i)
            ENTERO aux = elementos[i]
            elementos[i] = elementos[min]
            elementos[min] = aux
        FIN SI
    FIN PARA

    // 3. Reconstruir la matriz ordenada
    ENTERO resultado[filas][columnas]
    PARA (ENTERO p = 0; p < total; p++)
        resultado[p // columnas][p % columnas] = elementos[p]
    FIN PARA
    RETORNAR resultado
FIN FUNCION

INICIO
    ENTERO datos[3][3] = [[9, 4, 7], [1, 8, 2], [6, 3, 5]]
    ENTERO ordenada[][] = ordenar_matriz(datos)
    PARA (ENTERO f = 0; f < ordenada.largo; f++)
        IMPRIMIR(ordenada[f])
    FIN PARA
FIN`,
    expectedOutput: ['[1, 2, 3]', '[4, 5, 6]', '[7, 8, 9]'],
  },
  {
    id: 5,
    badge: 'Manejo Nativo de Archivos',
    title: 'Flujos de lectura y escritura secuencial ARCHIVO',
    description:
      'El tipo primitivo ARCHIVO incorpora métodos orientados a objetos (.LEER_LINEA(), .ESCRIBIR_LINEA(), .CERRAR_ARCHIVO()) y la propiedad booleana .findearchivo para procesamiento de datos.',
    code: `INICIO
    // Lectura secuencial del archivo virtual "nomina.txt"
    ARCHIVO nomina = ABRIR_ARCHIVO("nomina.txt", "lectura")

    IMPRIMIR("--- PROCESANDO ARCHIVO DE NÓMINA ---")
    MIENTRAS NO nomina.findearchivo
        CADENA linea = nomina.LEER_LINEA()
        IMPRIMIR("Registro: " + linea)
    FIN MIENTRAS
    nomina.CERRAR_ARCHIVO()

    // Escritura de informe de salida
    ARCHIVO salida = ABRIR_ARCHIVO("resultados.txt", "escritura")
    salida.ESCRIBIR_LINEA("INFORME FINAL YAGUARETÉ v0.1.2")
    salida.ESCRIBIR_LINEA("Total liquidado: $1940000.00")
    salida.CERRAR_ARCHIVO()
FIN`,
    expectedOutput: [
      '--- PROCESANDO ARCHIVO DE NÓMINA ---',
      'Registro: ID:101 | Lucía Mendez | Analista Senior | $580000.00',
      'Registro: ID:102 | Martín Palermo | Arquitecto Rust | $720000.00',
      'Registro: ID:103 | Julieta Rossi | Ing. de Datos | $640000.00',
      '[ARCHIVO resultados.txt] << INFORME FINAL YAGUARETÉ v0.1.2',
      '[ARCHIVO resultados.txt] << Total liquidado: $1940000.00',
    ],
  },
];

export const PRIMITIVE_TYPES_TABLE = [
  {
    type: 'ENTERO',
    equivalent: 'int64 (i64)',
    description: 'Números enteros con signo de 64 bits.',
    example: 'ENTERO edad = 25',
  },
  {
    type: 'FLOTANTE',
    equivalent: 'float32 (f32)',
    description: 'Punto flotante de precisión simple de 32 bits (trunca mantisa según IEEE 754).',
    example: 'FLOTANTE tasa = 0.05',
  },
  {
    type: 'REAL',
    equivalent: 'float64 (f64)',
    description: 'Punto flotante de doble precisión de 64 bits para cálculos científicos o financieros.',
    example: 'REAL sueldo = 1250450.75',
  },
  {
    type: 'CADENA',
    equivalent: 'String',
    description: 'Secuencia de texto delimitada por comillas dobles o simples.',
    example: 'CADENA nombre = "Facundo"',
  },
  {
    type: 'CARACTER',
    equivalent: 'char',
    description: 'Carácter individual Unicode.',
    example: "CARACTER letra = 'A'",
  },
  {
    type: 'BOOLEANO',
    equivalent: 'bool',
    description: 'Valor lógico de verdad: VERDADERO o FALSO.',
    example: 'BOOLEANO activo = VERDADERO',
  },
  {
    type: 'ARCHIVO',
    equivalent: 'File Handle',
    description: 'Descriptor nativo para lectura, escritura o anexo de archivos de texto.',
    example: 'ARCHIVO f = ABRIR_ARCHIVO("datos.txt", "lectura")',
  },
  {
    type: 'NULO',
    equivalent: 'null / None',
    description: 'Literal y tipo universal para ausencia de valor o puntero nulo en estructuras.',
    example: 'Nodo actual = NULO',
  },
  {
    type: 'ESTRUCTURA',
    equivalent: 'struct',
    description: 'Tipo de dato compuesto y heterogéneo definido por el usuario (admite autorreferencia).',
    example: 'Libro libro1',
  },
  {
    type: 'VOID',
    equivalent: 'void / ()',
    description: 'Ausencia de valor de retorno en bloques PROCEDIMIENTO.',
    example: 'PROCEDIMIENTO saludar()',
  },
];

export const OPERATORS_TABLE = [
  {
    operator: '+  -  *',
    operation: 'Suma, resta, multiplicación y concatenación',
    returnType: 'ENTERO / REAL / CADENA / TIPO[]',
    example: '7 * 2 -> 14 | [1, 2] + [3, 4] -> [1, 2, 3, 4]',
  },
  {
    operator: '/',
    operation: 'División real exacta',
    returnType: 'REAL (o FLOTANTE)',
    example: '10 / 4 -> 2.5',
  },
  {
    operator: '//',
    operation: 'División entera (redondea hacia abajo)',
    returnType: 'Siempre ENTERO',
    example: '10 // 3 -> 3 | matriz[p // col][p % col]',
  },
  {
    operator: '%',
    operation: 'Módulo (resto de la división entera)',
    returnType: 'Siempre ENTERO',
    example: '10 % 3 -> 1 (equivalente a MOD(10, 3))',
  },
  {
    operator: '==  !=  <  >  <=  >=',
    operation: 'Operadores relacionales y comparación con NULO',
    returnType: 'BOOLEANO',
    example: 'SI (nodo_aux != NULO Y edad >= 18)',
  },
  {
    operator: 'Y  O  NO',
    operation: 'Operadores lógicos booleanos en español (evaluación en cortocircuito en Y / O)',
    returnType: 'BOOLEANO',
    example: 'MIENTRAS (j >= 0 Y vector[j] > key) | NO archivo.findearchivo',
  },
];

export const BUILTINS_TABLE = [
  {
    fn: 'IMPRIMIR(...)',
    params: 'Uno o varios valores',
    returns: 'VOID',
    description: 'Muestra valores formateados en la salida estándar (consola, REPL o canal DAP).',
  },
  {
    fn: 'ABRIR_ARCHIVO(ruta, modo)',
    params: 'CADENA, CADENA',
    returns: 'ARCHIVO',
    description: 'Abre un flujo de archivo en modo "lectura", "escritura" o "anexo".',
  },
  {
    fn: 'ESPAR(numero)',
    params: 'ENTERO o REAL',
    returns: 'BOOLEANO',
    description: 'Retorna VERDADERO si el número evaluado es par.',
  },
  {
    fn: 'ESIMPAR(numero)',
    params: 'ENTERO o REAL',
    returns: 'BOOLEANO',
    description: 'Retorna VERDADERO si el número evaluado es impar.',
  },
  {
    fn: 'MOD(dividendo, divisor)',
    params: 'Numéricos',
    returns: 'ENTERO',
    description: 'Calcula el resto de la división entera (función canónica equivalente a %).',
  },
  {
    fn: 'arreglo.largo',
    params: 'Propiedad intrínseca',
    returns: 'ENTERO',
    description: 'Retorna la cantidad de elementos de un vector o filas/columnas de una matriz.',
  },
  {
    fn: 'archivo.LEER_LINEA()',
    params: 'Método de ARCHIVO',
    returns: 'CADENA',
    description: 'Lee y retorna la siguiente línea de texto avanzando el cursor del archivo.',
  },
  {
    fn: 'archivo.ESCRIBIR_LINEA(texto)',
    params: 'CADENA',
    returns: 'VOID',
    description: 'Escribe una línea de texto en el archivo abierto en modo escritura o anexo.',
  },
  {
    fn: 'archivo.findearchivo',
    params: 'Propiedad de ARCHIVO',
    returns: 'BOOLEANO',
    description: 'Evalúa a VERDADERO cuando se alcanza el fin del archivo (EOF).',
  },
  {
    fn: 'archivo.CERRAR_ARCHIVO()',
    params: 'Método de ARCHIVO',
    returns: 'VOID',
    description: 'Libera el descriptor del archivo y vuelca el buffer en disco.',
  },
];

export const CLI_COMMANDS = [
  {
    cmd: 'yaguarete run <archivo.yaguarete>',
    badge: 'Ejecución Nativa',
    description:
      'Ejecuta el programa directamente sobre el motor nativo en Rust (<1 ms de arranque). Admite medición de tiempo con --time (ms) y --time full (horas, minutos, segundos y milisegundos), además de --lenient.',
    example: 'yaguarete run sort.yaguarete --time full',
  },
  {
    cmd: 'yaguarete repl',
    badge: 'Consola Interactiva',
    description:
      'Inicia el entorno interactivo línea a línea (también al ejecutar "yaguarete" sin argumentos). Incluye balanceo de bloques multilínea y metacomandos :ayuda, :variables, :limpiar, :cancel y :salir.',
    example: 'yaguarete repl',
  },
  {
    cmd: 'yaguarete check <archivo.yaguarete>',
    badge: 'Chequeo Estático',
    description:
      'Analiza la gramática y verifica estáticamente todos los tipos de datos, firmas de funciones, aridad y retornos sin ejecutar el programa.',
    example: 'yaguarete check algoritmo.yaguarete',
  },
  {
    cmd: 'yaguarete lsp-check --json --stdin',
    badge: 'Diagnóstico IDE (<0.2 ms)',
    description:
      'Validador sub-milisegundo para editores como VS Code, Antigravity IDE y Cursor. Emite diagnósticos estructurados en JSON con línea, columna y severidad.',
    example: 'cat mi_algoritmo.yaguarete | yaguarete lsp-check --stdin --json',
  },
  {
    cmd: 'yaguarete dap',
    badge: 'Depurador DAP',
    description:
      'Servidor nativo del Debug Adapter Protocol por stdin/stdout para depuración con breakpoints, Step Over, Step Into, Step Out, Call Stack e inspección de estructuras.',
    example: 'yaguarete dap',
  },
  {
    cmd: 'yaguarete update [--check | --silent]',
    badge: 'Auto-Actualizador',
    description:
      'Consulta la API de GitHub Releases (caidevOficial/Yaguarete_Lang) y descarga e instala automáticamente la última versión disponible al estilo pip.',
    example: 'yaguarete update --check',
  },
  {
    cmd: 'yaguarete tokens <archivo.yaguarete>',
    badge: 'Inspección Léxica',
    description:
      'Muestra el flujo completo de tokens generados por el analizador léxico determinista (ideal para aprendizaje de compiladores).',
    example: 'yaguarete tokens ejemplo.yaguarete',
  },
];

export const CODE_RECIPES: CodeRecipe[] = [
  {
    id: 'nomina-sueldos',
    filename: 'ejemplo_completo.yaguarete',
    title: 'Liquidación Mensual de Sueldos y Porcentajes',
    category: 'Básico',
    complexity: 'O(N) tiempo | O(1) espacio auxiliar',
    description:
      'Algoritmo modular que combina funciones con retorno REAL, procedimientos VOID, recorrido de vectores tipados mediante .largo y validación de funciones incorporadas (ESPAR, ESIMPAR, MOD).',
    highlights: [
      'Paso de vectores tipados (vec[]: REAL) a funciones',
      'Protección contra división por cero en cálculo de porcentajes',
      'Uso de funciones incorporadas ESPAR, ESIMPAR y MOD',
    ],
    code: `// Archivo: ejemplo_completo.yaguarete
FUNCION sumar_vector(vec[]: REAL): REAL
    REAL total = 0
    PARA (ENTERO i = 0; i < vec.largo; i++)
        total = total + vec[i]
    FIN PARA
    RETORNAR total
FIN FUNCION

FUNCION calcular_porcentaje(porcion: REAL, total: REAL): REAL
    SI (total == 0)
        RETORNAR 0
    FIN SI
    RETORNAR porcion * 100 / total
FIN FUNCION

PROCEDIMIENTO mostrar_resumen(nombres[]: CADENA, montos[]: REAL)
    REAL total = sumar_vector(montos)
    IMPRIMIR("========================================")
    IMPRIMIR("TOTAL ABONADO: $" + total)
    IMPRIMIR("========================================")

    PARA (ENTERO i = 0; i < nombres.largo; i++)
        REAL porc = calcular_porcentaje(montos[i], total)
        IMPRIMIR("• Empleado: " + nombres[i] + " -> $" + montos[i] + " (" + porc + "%)")
    FIN PARA
FIN PROCEDIMIENTO

INICIO
    IMPRIMIR("=== SISTEMA DE SUELDOS EN YAGUARETÉ ===")
    CADENA empleados[3] = ["Juan Perez", "Maria Lopez", "Carlos Gomez"]
    REAL sueldos[3] = [450000.0, 520000.0, 390000.0]

    mostrar_resumen(empleados, sueldos)

    IMPRIMIR("")
    IMPRIMIR("Validación de Built-ins:")
    IMPRIMIR("ESPAR(4): " + ESPAR(4))
    IMPRIMIR("ESIMPAR(7): " + ESIMPAR(7))
    IMPRIMIR("MOD(14, 3): " + MOD(14, 3))
FIN`,
  },
  {
    id: 'lista-enlazada',
    filename: 'lista_enlazada.yaguarete',
    title: 'Lista Simplemente Enlazada con Inserción Posicional',
    category: 'Estructuras y Punteros',
    complexity: 'O(N) inserción posicional | O(1) en cabeza',
    description:
      'Implementación canónica de una estructura contenedora Lista y un nodo autorreferencial Nodo utilizando referencias NULO y enlace dinámico de punteros.',
    highlights: [
      'Definición de estructuras anidadas y autorreferenciales (Nodo siguiente)',
      'Inicialización automática segura a NULO evitando recursión infinita',
      'Serialización e impresión directa del árbol de estructuras en memoria',
    ],
    code: `// Archivo: lista_enlazada.yaguarete
ESTRUCTURA Lista:
    Nodo cabeza
    ENTERO cantidad
FIN ESTRUCTURA

ESTRUCTURA Nodo:
    CADENA producto
    Nodo siguiente
FIN ESTRUCTURA

PROCEDIMIENTO Insertar(mi_lista: Lista, posicion: ENTERO, producto: CADENA)
    Nodo nuevo_nodo
    nuevo_nodo.producto = producto
    nuevo_nodo.siguiente = NULO

    SI (posicion == 1)
        nuevo_nodo.siguiente = mi_lista.cabeza
        mi_lista.cabeza = nuevo_nodo
    SINO
        Nodo actual = mi_lista.cabeza
        PARA (ENTERO i = 1; i < posicion - 1; i++)
            actual = actual.siguiente
        FIN PARA
        nuevo_nodo.siguiente = actual.siguiente
        actual.siguiente = nuevo_nodo
    FIN SI
    mi_lista.cantidad = mi_lista.cantidad + 1
FIN PROCEDIMIENTO

INICIO
    Lista mi_lista
    Insertar(mi_lista, 1, "Manzana")
    Insertar(mi_lista, 2, "Pera")
    Insertar(mi_lista, 3, "Naranja")
    IMPRIMIR("Estructura completa en memoria:")
    IMPRIMIR(mi_lista)
FIN`,
  },
  {
    id: 'multiplicacion-matrices',
    filename: 'matrices.yaguarete',
    title: 'Multiplicación de Matrices Bidimensionales',
    category: 'Matrices y Algoritmos',
    complexity: 'O(N · M · P) tiempo | O(N · P) espacio',
    description:
      'Creación dinámica de matrices dimensionadas en funciones y producto matricial (3x3) por (3x2) verificando compatibilidad dimensional mediante .largo.',
    highlights: [
      'Introspección de filas (matriz.largo) y columnas (matriz[0].largo)',
      'Retorno de matrices bidimensionales tipadas FLOTANTE[][]',
      'Validación previa de dimensiones (columnas de A == filas de B)',
    ],
    code: `// Archivo: matrices.yaguarete
FUNCION crear_matriz_dimensionada(filas: ENTERO, columnas: ENTERO): FLOTANTE[][]
    FLOTANTE matriz[filas][columnas]
    RETORNAR matriz
FIN FUNCION

FUNCION multiplicar_matrices(matriz_1: ENTERO[][], matriz_2: ENTERO[][]): FLOTANTE[][]
    ENTERO dim_1_filas = matriz_1.largo
    ENTERO dim_1_columnas = matriz_1[0].largo
    ENTERO dim_2_filas = matriz_2.largo
    ENTERO dim_2_columnas = matriz_2[0].largo

    FLOTANTE resultado[][] = crear_matriz_dimensionada(dim_1_filas, dim_2_columnas)

    SI (dim_1_columnas != dim_2_filas)
        IMPRIMIR("No es posible multiplicar las matrices")
    SINO
        PARA (ENTERO f1 = 0; f1 < dim_1_filas; f1++)
            PARA (ENTERO c2 = 0; c2 < dim_2_columnas; c2++)
                ENTERO suma = 0
                PARA (ENTERO c1 = 0; c1 < dim_1_columnas; c1++)
                    suma = suma + (matriz_1[f1][c1] * matriz_2[c1][c2])
                FIN PARA
                resultado[f1][c2] = suma
            FIN PARA
        FIN PARA

        IMPRIMIR("Matriz resultado (3x2):")
        PARA (ENTERO fila = 0; fila < resultado.largo; fila++)
            IMPRIMIR(resultado[fila])
        FIN PARA
    FIN SI
    RETORNAR resultado
FIN FUNCION

INICIO
    ENTERO[][] matriz_1 = [[1, 2, 3], [3, 3, 1], [1, 1, 1]]
    ENTERO[][] matriz_2 = [[1, 2], [2, 4], [2, 1]]
    multiplicar_matrices(matriz_1, matriz_2)
FIN`,
  },
  {
    id: 'quicksort-tres-vias',
    filename: 'sort.yaguarete',
    title: 'Quicksort Optimizado de 3 Vías y Fibonacci Recursivo',
    category: 'Matrices y Algoritmos',
    complexity: 'O(N log N) tiempo | O(log N) espacio recursivo',
    description:
      'Ordenamiento rápido con selección de pivote central (vector.largo // 2), partición en tres subvectores (menores, iguales, mayores) y concatenación nativa de arreglos con el operador +.',
    highlights: [
      'Partición de 3 vías que evita degradación O(N²) con elementos repetidos',
      'Concatenación directa de vectores tipados: RETORNAR (menores + iguales + mayores)',
      '300x más veloz en el motor nativo Rust v0.1.2 (<1 ms)',
    ],
    code: `// Archivo: sort.yaguarete (Versión demostrativa interactiva)
FUNCION ordenar_vector_asc_quick(vector[]: ENTERO): ENTERO[]
    SI (vector.largo < 2)
        RETORNAR vector
    FIN SI

    ENTERO medio = vector.largo // 2
    ENTERO pivote = vector[medio]

    ENTERO cant_menores = 0
    ENTERO cant_iguales = 0
    ENTERO cant_mayores = 0

    PARA (ENTERO i = 0; i < vector.largo; i++)
        SI (vector[i] < pivote)
            cant_menores++
        SINO SI (vector[i] > pivote)
            cant_mayores++
        SINO
            cant_iguales++
        FIN SI
    FIN PARA

    ENTERO menores[cant_menores]
    ENTERO iguales[cant_iguales]
    ENTERO mayores[cant_mayores]

    ENTERO idx_men = 0
    ENTERO idx_igu = 0
    ENTERO idx_may = 0

    PARA (ENTERO i = 0; i < vector.largo; i++)
        SI (vector[i] < pivote)
            menores[idx_men] = vector[i]
            idx_men++
        SINO SI (vector[i] > pivote)
            mayores[idx_may] = vector[i]
            idx_may++
        SINO
            iguales[idx_igu] = vector[i]
            idx_igu++
        FIN SI
    FIN PARA

    menores = ordenar_vector_asc_quick(menores)
    mayores = ordenar_vector_asc_quick(mayores)
    RETORNAR (menores + iguales + mayores)
FIN FUNCION

INICIO
    ENTERO datos[] = [42, 15, 8, 99, 23, 4, 16, 15, 1]
    IMPRIMIR("Vector original: " + datos)
    ENTERO ordenado[] = ordenar_vector_asc_quick(datos)
    IMPRIMIR("Vector ordenado (Quicksort): " + ordenado)
FIN`,
  },
];

export const RELEASES_HISTORY: ReleaseEntry[] = [
  {
    version: '0.1.2',
    date: '2026-11-05',
    title: 'Evaluación en Cortocircuito de Operadores Lógicos (Y, O) e Instaladores Multiplataforma',
    tag: 'Oficial',
    highlights: [
      {
        section: '⚡ Motor de Ejecución y Lenguaje (yaguarete_core)',
        items: [
          'Evaluación en cortocircuito (short-circuit evaluation) nativa en eval.rs para los operadores lógicos booleanos Y y O.',
          'Operador Y: Si el operando izquierdo evalúa a FALSO, el derecho no se evalúa, evitando excepciones en tiempo de ejecución.',
          'Operador O: Si el operando izquierdo evalúa a VERDADERO, la evaluación concluye de forma inmediata.',
          'Garantía de seguridad en arreglos y vectores: Condiciones compuestas como MIENTRAS (j >= 0 Y vector[j] > key) ahora se ejecutan de manera segura sin desbordamiento de índice.',
          'Protección de punteros y estructuras: Validaciones como SI (nodo != NULO Y nodo.siguiente != NULO) previenen accesos a memoria o propiedades inválidas.',
        ],
      },
      {
        section: '📦 Sincronización del Ecosistema y Binarios Multiplataforma',
        items: [
          'Sincronización integral de versión a 0.1.2 en todos los crates de Rust (crates/yaguarete_core, crates/yaguarete_cli, crates/yaguarete_installer).',
          'Metadatos de ejecutables Windows PE actualizados con ProductVersion y FileVersion 0.1.2.0.',
          'Publicación oficial de instaladores Windows x64 (~7.8 MB), binarios CLI (~2.4 MB Windows / ~2.8 MB Linux), paquetes Debian/Ubuntu (.deb ~3.3 MB) y tarball portable (.tar.gz ~3.5 MB).',
          'Extensión oficial para VS Code, Antigravity IDE y Cursor actualizada a v0.1.2 (yaguarete-language-support-0.1.2.vsix ~778 KB).',
          'Actualización de la suite de pruebas canónicas con cobertura exhaustiva para evaluación de cortocircuito en estructuras de control.',
        ],
      },
    ],
  },
  {
    version: '0.1.1',
    date: '2026-10-30',
    title: 'Primer Release Oficial de YAGUARETÉ: Identidad "Jaguar Gamer" & Electric Blue',
    tag: 'Oficial',
    highlights: [
      {
        section: '🐆 Identidad Oficial YAGUARETÉ (.yaguarete)',
        items: [
          'Consolidación del lenguaje bajo la identidad oficial YAGUARETÉ (v0.1.1), adoptando la extensión obligatoria .yaguarete, el comando CLI yaguarete y el paquete yaguarete-language-support.',
          'Nuevo isotipo vectorial afilado "Jaguar Gamer" con paleta cibernética Electric Blue & Cyber Cyan (#0066FF, #00D4FF, #38BDF8).',
          'Iconos Windows PE High-DPI multirresolución (16x16 a 256x256 px) e instalador gráfico renovado en Dark Electric Blue.',
        ],
      },
      {
        section: '🧩 Extensión VS Code y Toolchain Rust',
        items: [
          'Nuevo tema de iconos yaguarete-icon-theme.json e iconos SVG/PNG para el explorador de archivos.',
          'Sincronización integral de versión 0.1.1 en crates/yaguarete_core, crates/yaguarete_cli y crates/yaguarete_installer.',
        ],
      },
    ],
  },
  {
    version: '0.1.0-rc.3',
    date: '2026-10-26',
    title: 'Trazabilidad Precisa de Errores en Tiempo de Ejecución (Línea y Columna)',
    tag: 'Motor Rust',
    highlights: [
      {
        section: '⚙️ Motor Nativo Rust (yaguarete_core)',
        items: [
          'Extensión del nodo Statement::Located del AST para almacenar línea y columna exactas del código fuente.',
          'Rastreo preciso de columna en desbordamientos de índices, referencias nulas, llamadas a métodos y división por cero.',
          'Preservación de call_line y call_column en el marco de llamadas (CallFrame).',
        ],
      },
    ],
  },
  {
    version: '0.1.0-rc.2',
    date: '2026-10-23',
    title: 'Documentación Integral de Pilas y Colas y Mejoras en Retorno de Estructuras',
    tag: 'Estructuras',
    highlights: [
      {
        section: '📚 Estructuras Dinámicas (pilas.yaguarete y colas.yaguarete)',
        items: [
          'Documentación paso a paso de operaciones LIFO (push/pop en O(1) sobre lista doblemente enlazada) y FIFO (enqueue/dequeue en O(1)).',
          'Blindaje de punteros contra referencias nulas al desapilar el último nodo restante.',
          'Soporte mejorado en parser.rs para tipos de retorno de estructuras personalizadas (FUNCION f(): MiEstructura).',
        ],
      },
    ],
  },
  {
    version: '0.1.0-rc.1',
    date: '2026-10-23',
    title: 'IntelliSense Prioritario, Depurador Nativo DAP y Auto-Actualizador en Rust',
    tag: 'Motor Rust',
    highlights: [
      {
        section: '🐞 Depurador Interactivo DAP y Autocompletado',
        items: [
          'Servidor nativo Debug Adapter Protocol (yaguarete dap) con soporte de Breakpoints, Step Over, Step Into, Step Out y Call Stack en VS Code y Antigravity IDE.',
          'IntelliSense prioritario multi-módulo para funciones, procedimientos y variables locales con SignatureHelpProvider en tiempo real.',
          'Coloreado TextMate verde menta/turquesa para tipos ESTRUCTURA en parámetros y retornos.',
          'Subcomando yaguarete update en Rust conectado en vivo a GitHub Releases.',
        ],
      },
    ],
  },
  {
    version: '0.1.0-beta.1',
    date: '2026-10-17',
    title: 'Migración Arquitectónica Completa al Motor Nativo en Rust y Consola REPL',
    tag: 'Motor Rust',
    highlights: [
      {
        section: '🚀 Rendimiento Revolucionario (~300x más rápido)',
        items: [
          'Workspace Cargo con yaguarete_core, yaguarete_cli y yaguarete_installer nativo en eframe/egui (~5.05 MB todo-en-uno).',
          'Arranque en frío <1 ms (~250x más rápido) y ejecución de Quicksort en 1 ms frente a 3.240 ms previos.',
          'Nueva consola interactiva yaguarete repl con evaluación al vuelo y tabla ASCII de variables (:variables).',
        ],
      },
    ],
  },
  {
    version: '0.1.0-alpha.1',
    date: '2026-10-17',
    title: 'Operadores // y % dentro de Índices Matriciales e Iconos Multiplataforma',
    tag: 'Linux & CLI',
    highlights: [
      {
        section: '➗ Gramática, Operadores y Empaquetado',
        items: [
          'Soporte completo de división entera (//) dentro de índices de matrices: matriz[p // columnas][p % columnas].',
          'Asociación de iconos .yaguarete en Windows (SHChangeNotify), Linux MIME (application-x-yaguarete) y VS Code.',
          'Soporte oficial de paquetes nativos Debian/Ubuntu (.deb) y tarball universal (.tar.gz).',
        ],
      },
    ],
  },
];

export const SEARCHABLE_DOCS: DocSearchResult[] = [
  ...PRIMITIVE_TYPES_TABLE.map((t) => ({
    id: `type-${t.type.toLowerCase()}`,
    title: `Tipo ${t.type} (${t.equivalent})`,
    category: 'Tipos de Datos' as const,
    summary: t.description,
    syntax: t.example,
    route: '/documentacion',
    anchor: 'tipos-primitivos',
  })),
  ...BUILTINS_TABLE.map((b, i) => ({
    id: `builtin-${i}`,
    title: b.fn,
    category: 'Funciones Built-in' as const,
    summary: `${b.description} (Retorna: ${b.returns})`,
    syntax: `${b.fn} -> ${b.returns}`,
    route: '/documentacion',
    anchor: 'funciones-incorporadas',
  })),
  ...OPERATORS_TABLE.map((o, i) => ({
    id: `op-${i}`,
    title: `Operador ${o.operator}`,
    category: 'Operadores' as const,
    summary: `${o.operation}. Tipo de resultado: ${o.returnType}`,
    syntax: o.example,
    route: '/documentacion',
    anchor: 'operadores',
  })),
  ...CLI_COMMANDS.map((c, i) => ({
    id: `cli-${i}`,
    title: c.cmd,
    category: 'CLI y Motor Rust' as const,
    summary: c.description,
    syntax: c.example,
    route: '/documentacion',
    anchor: 'cli-comandos',
  })),
  {
    id: 'syn-estructura',
    title: 'ESTRUCTURA ... FIN ESTRUCTURA (Registros y Nodos)',
    category: 'Sintaxis y Control',
    summary:
      'Define tipos compuestos personalizados y estructuras autorreferenciales (Listas, Pilas, Colas) con inicialización automática de punteros recursivos a NULO.',
    syntax: 'ESTRUCTURA Nodo:\n    CADENA nombre\n    Nodo proximo_nodo\nFIN ESTRUCTURA',
    route: '/documentacion',
    anchor: 'estructuras-datos',
  },
  {
    id: 'syn-funcion',
    title: 'FUNCION y PROCEDIMIENTO',
    category: 'Sintaxis y Control',
    summary:
      'Subrutinas fuertemente tipadas con validación de aridad, tipos de parámetros y valor de retorno obligatorio en FUNCION.',
    syntax: 'FUNCION sumar(a: ENTERO, b: ENTERO): ENTERO\n    RETORNAR a + b\nFIN FUNCION',
    route: '/documentacion',
    anchor: 'funciones-procedimientos',
  },
  {
    id: 'syn-bucles',
    title: 'Estructuras de Control: SI, PARA, MIENTRAS, HACER...MIENTRAS',
    category: 'Sintaxis y Control',
    summary:
      'Bloques condicionales y bucles iterativos estructurados en español con alcance léxico y validación booleana.',
    syntax: 'PARA (ENTERO i = 0; i < vector.largo; i++) ... FIN PARA',
    route: '/documentacion',
    anchor: 'estructuras-control',
  },
  {
    id: 'vscode-dap',
    title: 'Depurador Interactivo DAP y Extensión VS Code',
    category: 'VS Code & DAP',
    summary:
      'Soporte nativo de puntos de interrupción (Breakpoints), Step Over/Into/Out, inspección de estructuras y diagnóstico lsp-check en <0.2 ms.',
    syntax: 'code --install-extension yaguarete-language-support-0.1.2.vsix --force',
    route: '/vscode',
  },
];
