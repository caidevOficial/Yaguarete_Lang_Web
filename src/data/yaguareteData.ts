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

export interface BuiltinEntry {
  fn: string;
  category: 'Entrada / Salida y Archivos' | 'Cadenas' | 'Conversión de Tipos' | 'Matemáticas y Constantes';
  params: string;
  returns: string;
  description: string;
}

export interface ChecksumEntry {
  file: string;
  platform: string;
  size: string;
  sha256: string;
  url: string;
}

export const YAGUARETE_VERSION = '0.2.0';
export const GITHUB_REPO_URL = 'https://github.com/caidevOficial/Yaguarete_Lang';
export const GITHUB_RELEASES_URL = 'https://github.com/caidevOficial/Yaguarete_Lang/releases';
export const GITHUB_LATEST_RELEASE_URL = 'https://github.com/caidevOficial/Yaguarete_Lang/releases/latest';

export const DOWNLOAD_ASSETS = {
  windowsInstaller: {
    name: 'Instalador_Yaguarete.exe',
    label: 'Instalador Gráfico Todo-en-Uno (Windows x64)',
    version: '0.2.0',
    size: '7.92 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/Instalador_Yaguarete.exe`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Instala automáticamente el binario nativo yaguarete.exe (con Bytecode VM), configura el PATH del usuario, asocia iconos .yaguarete en Windows y registra la extensión oficial en VS Code y Antigravity IDE.',
    silentCommand: '.\\Instalador_Yaguarete.exe --silent',
  },
  windowsBinary: {
    name: 'yaguarete.exe',
    label: 'Binario CLI Autónomo (Windows PE x64)',
    version: '0.2.0',
    size: '2.75 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete.exe`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description: 'Ejecutable nativo compilado en Rust con Máquina Virtual Bytecode sin dependencias externas ni runtime.',
  },
  linuxBinary: {
    name: 'yaguarete',
    label: 'Binario ELF Nativo (Linux x64)',
    version: '0.2.0',
    size: '2.90 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description: 'Binario ELF autónomo de alta velocidad para GNU/Linux (yaguarete run, yaguarete repl, --engine vm|ast).',
  },
  linuxDeb: {
    name: 'yaguarete_0.2.0_amd64.deb',
    label: 'Paquete Nativo Debian / Ubuntu (.deb)',
    version: '0.2.0',
    size: '3.33 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete_0.2.0_amd64.deb`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Para Ubuntu, Debian, Linux Mint, Pop!_OS y Kali Linux. Instala /usr/bin/yaguarete, registra el tipo MIME application/x-yaguarete e iconos del sistema.',
    installCommand: 'sudo apt install ./yaguarete_0.2.0_amd64.deb',
  },
  linuxTar: {
    name: 'yaguarete-0.2.0-linux-x86_64.tar.gz',
    label: 'Tarball Portable Universal Linux (.tar.gz)',
    version: '0.2.0',
    size: '3.59 MB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete-0.2.0-linux-x86_64.tar.gz`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Compatible con cualquier distribución (Arch, Fedora, openSUSE, Alpine). Incluye script install.sh para usuario (~/.local/bin) o global.',
    installCommand: 'tar -xzf yaguarete-0.2.0-linux-x86_64.tar.gz && cd yaguarete-0.2.0-linux-x86_64 && ./install.sh',
  },
  vscodeExtension: {
    name: 'yaguarete-language-support-0.2.0.vsix',
    label: 'Extensión Oficial VS Code / Antigravity / Cursor (.vsix)',
    version: '0.2.0',
    size: '~781 KB',
    url: `${GITHUB_RELEASES_URL}/latest/download/yaguarete-language-support-0.2.0.vsix`,
    fallbackUrl: GITHUB_LATEST_RELEASE_URL,
    description:
      'Tema de iconos "Jaguar Gamer", gramática TextMate ampliada (cadenas, conversión, matemáticas y constante PI), SignatureHelp completo para built-ins, IntelliSense prioritario, diagnósticos LSP en <0.2 ms y depurador DAP.',
    installCommand: 'code --install-extension yaguarete-language-support-0.2.0.vsix --force',
  },
};

export const RELEASE_CHECKSUMS: ChecksumEntry[] = [
  {
    file: 'Instalador_Yaguarete.exe',
    platform: 'Windows x64',
    size: '7.92 MB',
    sha256: '31a355d96bcb9c168c13cab7f2fa839cedee17948ed1e97713f75002417caf0e',
    url: DOWNLOAD_ASSETS.windowsInstaller.url,
  },
  {
    file: 'yaguarete.exe',
    platform: 'Windows x64 (CLI)',
    size: '2.75 MB',
    sha256: '4c4ef97577b2134a225975d3b5adcb268a5f13f95d28179d702b1c399b988fa7',
    url: DOWNLOAD_ASSETS.windowsBinary.url,
  },
  {
    file: 'yaguarete',
    platform: 'Linux x64 (ELF)',
    size: '2.90 MB',
    sha256: '073bf7483221101a76992948bbe6a73f15154093ac8e86e5840fb7f96eca3998',
    url: DOWNLOAD_ASSETS.linuxBinary.url,
  },
  {
    file: 'yaguarete_0.2.0_amd64.deb',
    platform: 'Debian / Ubuntu',
    size: '3.33 MB',
    sha256: 'cc8822b546ac87e75026fd3595aa7a018680d2505cf2ac3cedaf669da6cf808f',
    url: DOWNLOAD_ASSETS.linuxDeb.url,
  },
  {
    file: 'yaguarete-0.2.0-linux-x86_64.tar.gz',
    platform: 'Linux Universal',
    size: '3.59 MB',
    sha256: '03d437f024e550c0f5b7f96109890ada0728e91dd85e3e5f096b42f4587030ee',
    url: DOWNLOAD_ASSETS.linuxTar.url,
  },
  {
    file: 'yaguarete-language-support-0.2.0.vsix',
    platform: 'VS Code / Cursor / Antigravity',
    size: '0.76 MB',
    sha256: '6b7bf682c439b3cda47862ced022e87db00ace70a91c63ca9d4ee59770539bf2',
    url: DOWNLOAD_ASSETS.vscodeExtension.url,
  },
];

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
    salida.ESCRIBIR_LINEA("INFORME FINAL YAGUARETÉ v0.2.0")
    salida.ESCRIBIR_LINEA("Total liquidado: $1940000.00")
    salida.CERRAR_ARCHIVO()
FIN`,
    expectedOutput: [
      '--- PROCESANDO ARCHIVO DE NÓMINA ---',
      'Registro: ID:101 | Lucía Mendez | Analista Senior | $580000.00',
      'Registro: ID:102 | Martín Palermo | Arquitecto Rust | $720000.00',
      'Registro: ID:103 | Julieta Rossi | Ing. de Datos | $640000.00',
      '[ARCHIVO resultados.txt] << INFORME FINAL YAGUARETÉ v0.2.0',
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
    operator: '^',
    operation: 'Potencia / Exponenciación (asociativo a derecha)',
    returnType: 'Siempre REAL',
    example: '2 ^ 3 -> 8.0 | 9 ^ 0.5 -> 3.0 | 2 ^ 3 ^ 2 -> 512.0',
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

export const BUILTINS_TABLE: BuiltinEntry[] = [
  {
    fn: 'IMPRIMIR(...)',
    category: 'Entrada / Salida y Archivos',
    params: 'Uno o varios valores',
    returns: 'VOID',
    description: 'Muestra valores formateados en la salida estándar (consola, REPL o canal DAP).',
  },
  {
    fn: 'LEER() / LEER(mensaje)',
    category: 'Entrada / Salida y Archivos',
    params: 'CADENA (opcional)',
    returns: 'BOOLEANO | ENTERO | REAL | CADENA',
    description:
      'Lee una línea del teclado y la autoparsea: BOOLEANO si es VERDADERO/FALSO/TRUE/FALSE, ENTERO si es entero, REAL si es decimal, si no CADENA. El mensaje se imprime sin salto de línea. No disponible en DAP.',
  },
  {
    fn: 'ABRIR_ARCHIVO(ruta, modo)',
    category: 'Entrada / Salida y Archivos',
    params: 'CADENA, CADENA',
    returns: 'ARCHIVO',
    description: 'Abre un flujo de archivo en modo "lectura", "escritura" o "anexo".',
  },
  {
    fn: 'archivo.LEER_LINEA()',
    category: 'Entrada / Salida y Archivos',
    params: 'Método de ARCHIVO',
    returns: 'CADENA',
    description: 'Lee y retorna la siguiente línea de texto avanzando el cursor del archivo.',
  },
  {
    fn: 'archivo.ESCRIBIR_LINEA(texto)',
    category: 'Entrada / Salida y Archivos',
    params: 'CADENA',
    returns: 'VOID',
    description: 'Escribe una línea de texto en el archivo abierto en modo escritura o anexo.',
  },
  {
    fn: 'archivo.findearchivo',
    category: 'Entrada / Salida y Archivos',
    params: 'Propiedad de ARCHIVO',
    returns: 'BOOLEANO',
    description: 'Evalúa a VERDADERO cuando se alcanza el fin del archivo (EOF).',
  },
  {
    fn: 'archivo.CERRAR_ARCHIVO()',
    category: 'Entrada / Salida y Archivos',
    params: 'Método de ARCHIVO',
    returns: 'VOID',
    description: 'Libera el descriptor del archivo y vuelca el buffer en disco.',
  },
  {
    fn: 'MAYUSCULAS(texto)',
    category: 'Cadenas',
    params: 'CADENA',
    returns: 'CADENA',
    description: 'Convierte todo el texto a mayúsculas.',
  },
  {
    fn: 'MINUSCULAS(texto)',
    category: 'Cadenas',
    params: 'CADENA',
    returns: 'CADENA',
    description: 'Convierte todo el texto a minúsculas.',
  },
  {
    fn: 'RECORTAR(texto)',
    category: 'Cadenas',
    params: 'CADENA',
    returns: 'CADENA',
    description: 'Elimina los espacios en blanco al inicio y al final del texto.',
  },
  {
    fn: 'DIVIDIR_CADENA(texto, separador)',
    category: 'Cadenas',
    params: 'CADENA, CADENA (no vacío)',
    returns: 'CADENA[]',
    description: 'Divide el texto por el separador y devuelve un vector de cadenas.',
  },
  {
    fn: 'A_ENTERO(valor)',
    category: 'Conversión de Tipos',
    params: 'Número, BOOLEANO o CADENA',
    returns: 'ENTERO',
    description: 'Trunca decimales, convierte booleanos (1/0) y parsea cadenas numéricas.',
  },
  {
    fn: 'A_REAL(valor)',
    category: 'Conversión de Tipos',
    params: 'Número, BOOLEANO o CADENA',
    returns: 'REAL',
    description: 'Convierte a punto flotante de 64 bits (REAL).',
  },
  {
    fn: 'A_FLOTANTE(valor)',
    category: 'Conversión de Tipos',
    params: 'Número, BOOLEANO o CADENA',
    returns: 'FLOTANTE',
    description: 'Convierte a punto flotante de 32 bits (FLOTANTE).',
  },
  {
    fn: 'A_CADENA(valor)',
    category: 'Conversión de Tipos',
    params: 'Cualquier valor',
    returns: 'CADENA',
    description: 'Convierte cualquier valor a su representación canónica en texto.',
  },
  {
    fn: 'A_BOOLEANO(valor)',
    category: 'Conversión de Tipos',
    params: 'VERDADERO/FALSO/TRUE/FALSE o número',
    returns: 'BOOLEANO',
    description: 'Evalúa cadenas booleanas o números (donde != 0 es VERDADERO).',
  },
  {
    fn: 'ESPAR(numero)',
    category: 'Matemáticas y Constantes',
    params: 'ENTERO o REAL',
    returns: 'BOOLEANO',
    description: 'Retorna VERDADERO si el número evaluado es par.',
  },
  {
    fn: 'ESIMPAR(numero)',
    category: 'Matemáticas y Constantes',
    params: 'ENTERO o REAL',
    returns: 'BOOLEANO',
    description: 'Retorna VERDADERO si el número evaluado es impar.',
  },
  {
    fn: 'MOD(dividendo, divisor)',
    category: 'Matemáticas y Constantes',
    params: 'Numéricos',
    returns: 'ENTERO',
    description: 'Calcula el resto de la división entera (función canónica equivalente a %).',
  },
  {
    fn: 'POTENCIA(base, exponente)',
    category: 'Matemáticas y Constantes',
    params: 'ENTERO o REAL',
    returns: 'REAL',
    description: 'Eleva base a exponente (equivalente a base ^ exponente).',
  },
  {
    fn: 'RAIZCUADRADA(numero)',
    category: 'Matemáticas y Constantes',
    params: 'ENTERO o REAL (>= 0)',
    returns: 'REAL',
    description: 'Calcula la raíz cuadrada de un número no negativo.',
  },
  {
    fn: 'ABS(numero)',
    category: 'Matemáticas y Constantes',
    params: 'ENTERO, FLOTANTE o REAL',
    returns: 'ENTERO | FLOTANTE | REAL',
    description: 'Retorna el valor absoluto preservando el tipo numérico original.',
  },
  {
    fn: 'ALEATORIO(min, max)',
    category: 'Matemáticas y Constantes',
    params: 'ENTERO, ENTERO',
    returns: 'ENTERO',
    description: 'Retorna un número entero pseudoaleatorio entre min y max inclusive.',
  },
  {
    fn: 'MIN(a, b) / MAX(a, b)',
    category: 'Matemáticas y Constantes',
    params: 'Numéricos',
    returns: 'ENTERO si ambos son ENTERO; si no REAL',
    description: 'Retorna el menor o mayor de dos números.',
  },
  {
    fn: 'REDONDEAR(numero [, decimales])',
    category: 'Matemáticas y Constantes',
    params: 'Numérico [, ENTERO >= 0]',
    returns: 'ENTERO (1 arg) | REAL (2 args)',
    description: 'Redondeo half-away-from-zero (2.5 -> 3, -2.5 -> -3) o a N decimales.',
  },
  {
    fn: 'PI',
    category: 'Matemáticas y Constantes',
    params: 'Constante matemática inmutable',
    returns: 'REAL',
    description: 'Constante matemática π = 3.141592653589793.',
  },
  {
    fn: 'arreglo.largo',
    category: 'Entrada / Salida y Archivos',
    params: 'Propiedad intrínseca',
    returns: 'ENTERO',
    description: 'Retorna la cantidad de elementos de un vector o filas/columnas de una matriz.',
  },
];

export const CLI_COMMANDS = [
  {
    cmd: 'yaguarete run <archivo.yaguarete> [--engine <vm|ast>]',
    badge: 'Bytecode VM + AST',
    description:
      'Ejecuta el programa sobre el motor nativo en Rust (<1 ms de arranque). Por defecto usa --engine vm (Máquina Virtual Bytecode hasta 5.72x más rápida; usa --engine ast para el intérprete tradicional). Admite --time (ms), --time full y --lenient.',
    example: 'yaguarete run sort.yaguarete --engine vm --time full',
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
      'Acelerado por la Máquina Virtual Bytecode Rust v0.2.0 (<1 ms arranque)',
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
  {
    id: 'builtins-v020',
    filename: 'builtins_v020.yaguarete',
    title: 'Novedades v0.2.0: Potencia ^, PI, Cadenas, Conversión y Matemáticas',
    category: 'Básico',
    complexity: 'O(N) sobre tokens | Built-ins nativas v0.2.0',
    description:
      'Demostración ejecutable de las nuevas funciones incorporadas en v0.2.0: operador ^, constante PI, RAIZCUADRADA, REDONDEAR, MIN/MAX, ABS, ALEATORIO, DIVIDIR_CADENA, RECORTAR y conversiones A_ENTERO/A_CADENA.',
    highlights: [
      'Cálculo geométrico con constante PI, potencia ^ y REDONDEAR(val, decimales)',
      'Procesamiento de texto CSV con DIVIDIR_CADENA, RECORTAR, MAYUSCULAS y A_ENTERO',
      'Funciones matemáticas nativas ABS, MIN, MAX, RAIZCUADRADA y ALEATORIO',
    ],
    code: `// Archivo: builtins_v020.yaguarete (Novedades YAGUARETÉ v0.2.0)
INICIO
    // 1. Geometría con constante PI, operador ^ y REDONDEAR
    REAL radio = 5.0
    REAL area = PI * radio ^ 2
    IMPRIMIR("Área círculo (r=5): " + REDONDEAR(area, 2))
    IMPRIMIR("Raíz de 16: " + RAIZCUADRADA(16) + " | 2^3^2 = " + (2 ^ 3 ^ 2))

    // 2. Procesamiento de cadenas y conversión de tipos
    CADENA entrada_csv = "  10, 25 , 15 , 50  "
    CADENA partes[] = DIVIDIR_CADENA(RECORTAR(entrada_csv), ",")
    ENTERO suma = 0
    PARA (ENTERO i = 0; i < partes.largo; i++)
        suma += A_ENTERO(RECORTAR(partes[i]))
    FIN PARA
    IMPRIMIR(MAYUSCULAS("suma csv: ") + A_CADENA(suma))

    // 3. Matemáticas: MIN, MAX, ABS, REDONDEAR y ALEATORIO
    IMPRIMIR("MIN(8, 3)=" + MIN(8, 3) + " | MAX(8, 3)=" + MAX(8, 3))
    IMPRIMIR("ABS(-42)=" + ABS(-42) + " | REDONDEAR(-2.5)=" + REDONDEAR(-2.5))
    IMPRIMIR("Dado (1..6): " + ALEATORIO(1, 6))
FIN`,
  },
];

export const RELEASES_HISTORY: ReleaseEntry[] = [
  {
    version: '0.2.0',
    date: '2026-11-11',
    title: 'Máquina Virtual Bytecode (VM), Optimizaciones AST y Nuevas Funciones Nativas',
    tag: 'Oficial',
    highlights: [
      {
        section: '🚀 Máquina Virtual Bytecode (crates/yaguarete_core/src/vm/) y CLI --engine',
        items: [
          'Nuevo compilador de bytecode (Compiler) y máquina virtual basada en pila (VM) con conjunto compacto de instrucciones (OpCode) y pool de constantes (Chunk).',
          'Resolución estática de variables locales a slots O(1) en tiempo de compilación, saltos directos (Jump, JumpIfFalse, Loop) y marcos de ejecución aislados (CallFrame).',
          'Modificación e indexación in-situ de vectores sin clonado (SetIndexLocal, GetIndexLocal, LengthLocal) y selección de motor con --engine <vm|ast> (vm activado por defecto).',
          'Optimizaciones Nivel 1 y 2 en el intérprete AST (eval.rs): tablas FxHashMap, VariableEntry unificado, reutilización de ámbitos con scope_pool y fast-paths para +=, -=, i++, i--.',
          'Benchmark (Selection Sort 10.000 elementos, ~50M iteraciones): de 39.459,87 ms originales a 9.068,74 ms en AST optimizado (4,35x) y 6.901,29 ms en Bytecode VM (5,72x más rápido, 82,5% menos tiempo).',
        ],
      },
      {
        section: '⚡ Operador ^, Constante PI y Nuevas Built-ins (Cadenas, Conversión y Matemáticas)',
        items: [
          'Operador de potencia ^ (asociativo a derecha, retorno REAL), constante matemática inmutable PI y funciones POTENCIA, RAIZCUADRADA, ABS, ALEATORIO, MIN, MAX y REDONDEAR (half-away-from-zero).',
          'Entrada interactiva LEER() / LEER(mensaje) con autoparseo a BOOLEANO, ENTERO, REAL o CADENA (no disponible en depurador DAP).',
          'Funciones de cadena: MAYUSCULAS, MINUSCULAS, RECORTAR y DIVIDIR_CADENA(texto, separador): CADENA[].',
          'Conversiones explícitas de tipo: A_ENTERO, A_REAL, A_FLOTANTE, A_CADENA y A_BOOLEANO.',
        ],
      },
      {
        section: '🎨 Extensión VS Code v0.2.0 y Documentación',
        items: [
          'SignatureHelp para todas las built-ins (nuevas y existentes), autocompletado/hover actualizado (LEER(mensaje)) y exclusión de Ir a Definición.',
          'Gramática TextMate ampliada con scopes support.function.builtin.string, support.function.builtin.conversion, constant.language.math (PI) y MIN/MAX/REDONDEAR en math.',
          'Paquetes oficiales v0.2.0 publicados: Instalador_Yaguarete.exe (7.92 MB), yaguarete.exe (2.75 MB), Linux ELF (2.90 MB), .deb (3.33 MB), .tar.gz (3.59 MB) y .vsix (0.76 MB).',
        ],
      },
    ],
  },
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
    id: 'cli-engine-vm',
    title: 'Máquina Virtual Bytecode (--engine vm | ast)',
    category: 'CLI y Motor Rust',
    summary:
      'Motor de ejecución de alto rendimiento en Bytecode (5,72x más rápido en Selection Sort 10k). Habilitado por defecto; usa --engine ast para el intérprete tradicional.',
    syntax: 'yaguarete run algoritmo.yaguarete --engine vm --time',
    route: '/documentacion',
    anchor: 'cli-comandos',
  },
  {
    id: 'vscode-dap',
    title: 'Depurador Interactivo DAP y Extensión VS Code',
    category: 'VS Code & DAP',
    summary:
      'Soporte nativo de puntos de interrupción (Breakpoints), Step Over/Into/Out, SignatureHelp de built-ins, inspección de estructuras y diagnóstico lsp-check en <0.2 ms.',
    syntax: 'code --install-extension yaguarete-language-support-0.2.0.vsix --force',
    route: '/vscode',
  },
];
