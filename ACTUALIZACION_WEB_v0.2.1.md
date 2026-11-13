# Actualización del Portal Web a YAGUARETÉ v0.2.1

> **Fecha de relevamiento:** 2026-11-13
> **Web actual:** `Yaguarete_Lang_Web` @ `0e9e9b1` (sincronizada con **v0.2.0**)
> **Lenguaje:** `Yaguarete_Lang` @ `cf2f7c1` (tag **v0.2.1**, 2026-11-13)
> **Método:** `git diff v0.2.0..v0.2.1` en el repo del lenguaje + ejecución de **todos los ejemplos de la web** con el binario real `yaguarete.exe v0.2.1` en ambos motores (`--engine vm` y `--engine ast`).

---

## 1. Qué cambió en el lenguaje (v0.2.0 → v0.2.1)

| # | Cambio | Impacto en la web |
|---|---|---|
| R1 | **Todos los atributos de una `ESTRUCTURA` se inicializan en `NULO`** (antes: `0`, `0.0`, `""`, `FALSO`, `' '`, `[]` y auto-instanciación de sub-estructuras). Aplica en AST (`eval.rs`), VM (`vm.rs`/`compiler.rs`) y prototipo Python (`types_system.py`). | Documentación, ejemplos, intérprete del Playground, buscador. |
| R1 | **Se elimina la auto-instanciación anidada** de sub-estructuras (evita recursión infinita / bucles como en `semaforo.yaguarete`). | Textos que hablan de "inicialización segura de campos recursivos". |
| R1 | **Comparación segura `== NULO` / `!= NULO`** sobre atributos sin inicializar, con paridad AST/VM. | Documentación y operadores. |
| R1 | VM: los **vectores de estructuras** (`Nodo v[10]`) se crean con instancias cuyos campos son `NULO`; nuevos errores explícitos: *"Intento de acceder/asignar el campo 'x' en una referencia nula (NULO)"* y *"La estructura 'X' no tiene el campo 'y'"* al asignar. | Intérprete del Playground (mensajes de error). |
| R2 | Corregidos `semaforo.yaguarete` (bucle infinito) y `colas.yaguarete`. | Posible nuevo ejemplo. |
| R3 | Versión `0.2.1` en crates, CLI, instalador y extensión `yaguarete-language-support-0.2.1.vsix`. **366 tests** (271 Rust + 95 Python). | Descargas, checksums, VS Code, Home, Novedades. |

> [!IMPORTANT]
> Las **variables escalares sueltas** NO cambian: `ENTERO x` sigue valiendo `0`, `CADENA s` → `""`, `BOOLEANO b` → `FALSO`. El cambio aplica **solo a atributos de estructuras**.

**Comportamiento real verificado con v0.2.1 (VM y AST idénticos):**

```text
Registro r              -> Registro{id: NULO, nombre: NULO, ok: NULO}
r.id == NULO            -> VERDADERO
"concat: " + r.nombre   -> "concat: NULO"        (concatenación con CADENA permitida)
r.cantidad + 1          -> Error: Operador '+' no compatible con tipos 'Nulo' y 'Entero(1)'
Registro v[2]; v[0]     -> Registro{id: NULO, nombre: NULO, ok: NULO}
```

---

## 2. Resultado de ejecutar los ejemplos de la web con v0.2.1

| Ejemplo (archivo `yaguareteData.ts`) | VM | AST | Estado |
|---|---|---|---|
| Hero 1 – Funciones tipadas (L180) | ✅ | ✅ | OK (salida real `Promedio: 9.0`, la web muestra `9`) |
| Hero 2 – `ESTRUCTURA Libro` (L210) | ✅ | ✅ | OK |
| Hero 3 – Nodos / `NULO` (L250) | ✅ | ✅ | OK |
| Hero 4 – Matrices `//` y `%` (L292) | ❌ | ✅ | Falla en VM (bug preexistente del motor, ver §5) |
| Hero 5 – `ARCHIVO` (L341) | ❌ | — | VM: *"Llamada a método aún no implementada en bytecode"* (preexistente) |
| Receta – Liquidación de sueldos (L736) | ✅ | ✅ | OK |
| **Receta – `lista_enlazada.yaguarete` (L791)** | ❌ | ❌ | **ROTO por v0.2.1**: `mi_lista.cantidad + 1` con `cantidad = NULO` |
| Receta – `matrices.yaguarete` (L843) | ❌ | ✅ | Falla en VM (preexistente, ver §5) |
| Receta – Quicksort (L897) | ✅ | ✅ | OK |
| Receta – `builtins_v020` (L966) | ✅ | ✅ | OK |

> [!CAUTION]
> La receta **Lista Simplemente Enlazada** deja de funcionar en el lenguaje real v0.2.1. Corrección verificada (VM y AST imprimen `cantidad: 3`): agregar `mi_lista.cantidad = 0` después de `Lista mi_lista`.

---

## 3. Cambios por sección de la página web

Cada sección indica **archivo/línea**, **qué modificar** y la **referencia a v0.2.1** que debe figurar.

### 3.0 Configuración global (afecta a todas las secciones)

**[yaguareteData.ts](file:///e:/Python_d/Yaguarete_Lang_Web/src/data/yaguareteData.ts#L58)**

| Línea | Actual | Nuevo |
|---|---|---|
| 58 | `YAGUARETE_VERSION = '0.2.0'` | `YAGUARETE_VERSION = '0.2.1'` |

> [!NOTE]
> Al cambiar esta constante se actualizan automáticamente: Navbar (`Docs v…`, `Bytecode VM Rust v…`, badge, `Descargar v…`), Footer, banner del Playground/REPL, Home (badge del hero, tarjeta de arquitectura, "Ver Changelog v…"), Docs (índice, captions de tablas), VS Code (botón y versión) y el marcador "latest" de la tabla de lanzamientos en Descargas.

**[package.json](file:///e:/Python_d/Yaguarete_Lang_Web/package.json#L4)** — `"version": "0.2.0"` → `"0.2.1"`.

---

### 3.1 Barra de navegación — [Navbar.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/components/Navbar.tsx)

- Sin cambios de código: usa `YAGUARETE_VERSION` (L127, L155, L183, L222).
- **Opcional:** en el menú (L155, "Bytecode VM Rust v0.2.1") se podría agregar un ítem/etiqueta *"Novedad v0.2.1: atributos en NULO"* enlazando a `/documentacion#estructuras-datos`.

---

### 3.2 Inicio (`/`) — [HomePage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/HomePage.tsx)

| Línea | Qué modificar | Referencia v0.2.1 |
|---|---|---|
| 121 | Badge del hero: `Bytecode VM & Nuevas Built-ins • v{VERSION}` | Cambiar a **`Estructuras con NULO por defecto • v{YAGUARETE_VERSION}`** (o `Bytecode VM + NULO por defecto • v0.2.1`). |
| 225 | Tarjeta "Documentación": *"estructuras autorreferenciales con NULO…"* | Añadir: *"…y atributos de estructura inicializados en `NULO` por defecto (v0.2.1)"*. |
| 277 | Comentario `BYTECODE VM v0.2.0` | Actualizar a `v0.2.x` (cosmético). |
| 284 / 290 | "incorpora en v{VERSION} un compilador a bytecode…" | Con la constante en 0.2.1 el texto queda incorrecto (la VM es de 0.2.0). Reescribir: *"incorpora **desde v0.2.0** un compilador a bytecode… y en **v0.2.1** paridad AST/VM en la inicialización `NULO` de estructuras"*. |
| **314** | `110 tests Rust & 83 tests Python` (hardcodeado y desactualizado) | **`366 tests (271 Rust + 95 Python) • v0.2.1`** |
| 337 | `RELEASES_HISTORY.slice(0, 4)` | Sin cambio; mostrará v0.2.1 al agregarla a los datos (§3.8). |

**Carrusel del hero — `HERO_SLIDES` en [yaguareteData.ts](file:///e:/Python_d/Yaguarete_Lang_Web/src/data/yaguareteData.ts#L204-L285):**

- **Slide 2 (L206‑209)** *Estructuras Compuestas*: agregar a la descripción *"Desde v0.2.1 todos los atributos inician en `NULO` hasta su asignación explícita."*
- **Slide 3 (L246‑249)** *Punteros y Tipo NULO*: reemplazar *"inicialización segura contra ciclos infinitos"* por *"todos los atributos se inicializan en `NULO` (v0.2.1), sin auto-instanciación de sub-estructuras ni ciclos infinitos"*. Opcional: añadir al código una guarda demostrativa:
  ```yaguarete
  Nodo nuevo_nodo
  SI (nuevo_nodo.proximo_nodo == NULO)   // VERDADERO por defecto en v0.2.1
  ```
- **Slide 1 (L200)**: `expectedOutput` `'Promedio: 9'` → `'Promedio: 9.0'` (salida real del motor).
- **Slide 5 (L354 y L363)**: `"INFORME FINAL YAGUARETÉ v0.2.0"` → `v0.2.1` (código y `expectedOutput`).

---

### 3.3 Documentación (`/documentacion`) — [DocsPage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/DocsPage.tsx)

**Sección 3 "Estructuras Compuestas y Punteros Autorreferenciales (NULO)" (L180‑207)** — es el cambio principal.

- **L187 — texto obsoleto** (*"inicializa automáticamente sus campos recursivos en NULO"*). Reemplazar por:

  > A partir de **v0.2.1**, al instanciar cualquier `ESTRUCTURA` **todos sus atributos** (primitivos como `ENTERO`, `CADENA`, `BOOLEANO` y referencias a otras estructuras) se inicializan en `NULO` hasta que el programador les asigne un valor. No se auto-instancian sub-estructuras, lo que evita recursiones infinitas, y es posible verificar el estado con `== NULO` / `!= NULO`. Las variables escalares sueltas mantienen su valor neutro (`0`, `""`, `FALSO`).

- Añadir un `<div className="callout">` / badge **"Nuevo en v0.2.1"** y un segundo bloque de código (tomado de la wiki oficial `Sistema-de-Tipos-Estatico.md`):
  ```yaguarete
  ESTRUCTURA Registro:
      ENTERO id
      CADENA nombre
      BOOLEANO confirmado
  FIN ESTRUCTURA

  INICIO
      Registro reg
      // v0.2.1+: reg.id, reg.nombre y reg.confirmado inician en NULO
      SI (reg.id == NULO Y reg.nombre == NULO)
          IMPRIMIR("Atributos sin inicializar (NULO)")
      FIN SI
      IMPRIMIR(reg)   // Registro{id: NULO, nombre: NULO, confirmado: NULO}
  FIN
  ```
- Añadir advertencia: *"Operar aritméticamente un atributo `NULO` produce error (`Operador '+' no compatible con tipos 'Nulo' y 'Entero'`). Inicializa contadores explícitamente (`lista.cantidad = 0`)."*
- Renombrar el ítem del índice (L28) a `Estructuras y Tipo NULO (v0.2.1)` (opcional).

**Sección 1 "Tipos primitivos" (tabla desde `PRIMITIVE_TYPES_TABLE`):** ver §3.0/L413‑423 de datos:

| Línea | Campo | Nuevo texto |
|---|---|---|
| 415 | `NULO.description` | *"Literal y tipo universal para ausencia de valor. Desde v0.2.1 es el valor por defecto de todos los atributos de una ESTRUCTURA."* |
| 416 | `NULO.example` | `'Nodo actual = NULO  |  SI (reg.id == NULO)'` |
| 421 | `ESTRUCTURA.description` | *"Tipo compuesto definido por el usuario (admite autorreferencia). En v0.2.1 sus atributos inician en NULO."* |

**Sección 4 "Operadores" (`OPERATORS_TABLE` L463‑468):** añadir a la fila `== != …`: *"comparación segura de atributos sin inicializar con `NULO` (v0.2.1)"*, ejemplo `SI (reg.nombre == NULO)`.

**L216 y L305/L330/L361:** usan `v{YAGUARETE_VERSION}` para describir el operador `^` y las built-ins, que son de **v0.2.0**. Con la constante en 0.2.1 dirían "incorpora en v0.2.1 el operador ^", lo cual es incorrecto. Cambiar L216 a **"desde v0.2.0"**; L305/L330 pueden quedar (describen la referencia vigente).

---

### 3.4 Ejemplos y Recetas (`/ejemplos`) — `CODE_RECIPES` en [yaguareteData.ts](file:///e:/Python_d/Yaguarete_Lang_Web/src/data/yaguareteData.ts#L778-L829)

**Receta `lista-enlazada` (L778‑829) — obligatorio:**

- Código, después de `Lista mi_lista` (L822): agregar `mi_lista.cantidad = 0  // v0.2.1: los atributos inician en NULO`.
- Highlight L788 *"Inicialización automática segura a NULO evitando recursión infinita"* → *"Atributos inicializados en NULO por defecto (v0.2.1): cabeza == NULO sin auto-instanciación"*.
- Descripción L785: añadir *"Compatible con la semántica NULO por defecto de v0.2.1."*

**Receta `quicksort-tres-vias` (L895):** *"Acelerado por la Máquina Virtual Bytecode Rust v0.2.0"* → *"…desde v0.2.0"* (correcto tal cual; solo aclarar).

**Receta `builtins-v020` (L953‑988):** mantener como "Novedades v0.2.0" (es histórica). No cambiar.

**Nueva receta sugerida `semaforo-cola` — Novedades v0.2.1:** basada en [`semaforo.yaguarete`](file:///e:/Python_d/Yaguarete_Lang/semaforo.yaguarete) (cola FIFO `AVENIDA`/`AUTO`; verificado OK en VM y AST con v0.2.1). Metadatos propuestos:
- `title`: *"Novedades v0.2.1: Cola de Autos en Semáforo con NULO por defecto"*
- `category`: `'Estructuras y Punteros'`
- `highlights`: *"`calle.primer_auto == NULO` sin inicialización defensiva"*, *"Sin auto-instanciación recursiva de `primer_auto`/`ultimo_auto`"*, *"Paridad AST/VM"*.

Actualizar también [ExamplesPage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/ExamplesPage.tsx) solo si hay textos de conteo de recetas.

---

### 3.5 Playground / REPL (`/playground`) — intérprete web

**[yaguareteInterpreter.ts](file:///e:/Python_d/Yaguarete_Lang_Web/src/utils/yaguareteInterpreter.ts)** — paridad semántica con v0.2.1 (obligatorio para que el Playground no muestre resultados distintos al lenguaje real):

| Línea | Actual | Cambio |
|---|---|---|
| **308‑319** `instantiateStruct` | Primitivos → `0` / `''` / `false`; solo estructuras → `null` | **Todos los campos → `null`** (`for (const f of def.fields) obj[f.name] = null;`). |
| 1029‑1031 | Vectores de estructuras usan `instantiateStruct` | OK tras el cambio anterior (campos `NULO`, igual que la VM). |
| **393 / 395** `+` y `-` | `Number(null) + 1 → 1` (JS lo acepta silenciosamente) | Lanzar `PseudoRuntimeError: Operador '+' no compatible con tipos 'Nulo' y …` si algún operando es `null` (salvo concatenación con CADENA, que en v0.2.1 produce `"…NULO"`). Aplicar igual a `*`, `/`, `//`, `%` (L402‑415), `^`, `++`, `--`, `+=`, `-=` y a `<`, `>`, `<=`, `>=` (L369‑376). |
| 765 | `Intento de asignar al campo…` | Alinear texto con la VM: `Intento de asignar el campo '…' en una referencia nula (NULO)`. |
| — | Asignar a un campo inexistente | Lanzar `La estructura 'X' no tiene el campo 'y'` (nuevo en VM v0.2.1). |
| 47 | Archivo virtual `datos.txt`: `"Configuración inicial YAGUARETÉ v0.2.0"` | → `v0.2.1`. |

**[PlaygroundPage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/PlaygroundPage.tsx#L25):** el texto *"con soporte de v{VERSION} (potencia ^, PI, LEER()…)"* atribuye a v0.2.1 funciones de v0.2.0. Reescribir: *"con soporte de **v0.2.1** (atributos de estructura en `NULO` por defecto, potencia `^`, `PI`, `LEER()`…)"*.

**[InteractivePlayground.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/components/InteractivePlayground.tsx):** sin cambios (L50, L353, L368 usan la constante). Opcional: tras `:ayuda` en el REPL, mencionar la nueva semántica.

---

### 3.6 Descargas (`/descargas`) — `DOWNLOAD_ASSETS` y `RELEASE_CHECKSUMS`

**[yaguareteData.ts L63‑171](file:///e:/Python_d/Yaguarete_Lang_Web/src/data/yaguareteData.ts#L63-L171)** — reemplazar todas las cadenas `0.2.0` por `0.2.1`:

| Asset | `version` | Nombre / URL / comando | Tamaño | SHA‑256 v0.2.1 |
|---|---|---|---|---|
| `Instalador_Yaguarete.exe` | 0.2.1 | sin cambio de nombre | 7.92 → **7.93 MB** | `28a83c4af507d3a6513e006c9f04c7c2a1cf6a5da40680e71e733cb5cbb65a88` |
| `yaguarete.exe` | 0.2.1 | sin cambio | 2.75 MB | `3b5a7485274c356029f41a5e723b8878e250b5c5af1bed7b2cdc0f2140c67fcd` |
| `yaguarete` (ELF) | 0.2.1 | sin cambio | ⚠️ pendiente | ⚠️ pendiente (no compilado localmente) |
| `.deb` | 0.2.1 | `yaguarete_0.2.1_amd64.deb` (L94, L98, L102, L151) | ⚠️ pendiente | ⚠️ pendiente |
| `.tar.gz` | 0.2.1 | `yaguarete-0.2.1-linux-x86_64.tar.gz` (L105, L109, L113 ×2, L158) | ⚠️ pendiente | ⚠️ pendiente |
| `.vsix` | 0.2.1 | `yaguarete-language-support-0.2.1.vsix` (L116, L120, L124, L165) | 0.76 MB | `77fd75eab9c8f0081cc509cbf513ea76cc8807400df58583118b645fb625aff8` |

> [!WARNING]
> Los hashes Windows/VSIX fueron calculados sobre `Yaguarete_Lang/dist` y coinciden con `release_notes.md`. Los artefactos Linux figuran como *"No disponible (binario aún no compilado)"* en las release notes: **completar tamaño y SHA‑256 cuando el workflow de GitHub los publique**, de lo contrario las URLs `latest/download/yaguarete_0.2.1_amd64.deb` darán 404.

Las descripciones de los assets pueden mencionar *"incluye semántica NULO por defecto en estructuras (v0.2.1)"* (opcional).

**[DownloadsPage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/DownloadsPage.tsx#L454-L463):** sin cambios; la tabla marcará v0.2.1 como "latest" al agregarla a `RELEASES_HISTORY`.

---

### 3.7 Extensión VS Code (`/vscode`) — [VSCodePage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/VSCodePage.tsx)

| Línea | Qué modificar |
|---|---|
| 29 | `Gramática TextMate v0.2.0` → `v0.2.1` (o "v0.2.x"). |
| 37 | *"hover para todas las funciones v0.2.0"* → *"…funciones v0.2.x"*. |
| 103 / 117 | Automático (constante + `DOWNLOAD_ASSETS`). |
| **174** | `"version": "0.2.0"` del `launch.json` → **NO CAMBIAR**: es la versión del esquema de `launch.json` de VS Code, no de YAGUARETÉ. |

`SEARCHABLE_DOCS` → `vscode-dap` ([L1244](file:///e:/Python_d/Yaguarete_Lang_Web/src/data/yaguareteData.ts#L1244)): `yaguarete-language-support-0.2.0.vsix` → `0.2.1.vsix`.

---

### 3.8 Novedades (`/novedades`) — `RELEASES_HISTORY` y [ChangelogPage.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/pages/ChangelogPage.tsx)

**Agregar al inicio de `RELEASES_HISTORY` (antes de L992):**

```ts
{
  version: '0.2.1',
  date: '2026-11-13',
  title: 'Inicialización en NULO por Defecto para Todos los Atributos de Estructuras',
  tag: 'Estructuras',
  highlights: [
    {
      section: '🛠️ Semántica de Estructuras (R1)',
      items: [
        'Todos los atributos de cualquier ESTRUCTURA (primitivos y referencias a otras estructuras) se inicializan por defecto en NULO hasta que el programador les asigne un valor explícitamente.',
        'Eliminación de la auto-instanciación anidada de sub-estructuras, evitando recursiones infinitas y desbordamientos de memoria.',
        'Comparaciones seguras == NULO y != NULO sobre atributos sin inicializar con comportamiento idéntico en el evaluador AST y la VM de bytecode.',
        'Vectores de estructuras (Nodo v[n]) creados con instancias cuyos atributos son NULO en ambos motores; errores explícitos al acceder/asignar campos sobre referencias NULO o campos inexistentes.',
      ],
    },
    {
      section: '🐛 Correcciones (R2)',
      items: [
        'semaforo.yaguarete: corregido el bucle infinito causado por la auto-instanciación de primer_auto y ultimo_auto dentro de AVENIDA.',
        'colas.yaguarete: encolado y desencolado de NodoCliente sin inicializaciones defensivas manuales.',
      ],
    },
    {
      section: '⚙️ Infraestructura y Build (R3)',
      items: [
        'Versión 0.2.1 en yaguarete_core, yaguarete_cli, yaguarete_installer, extensión VS Code (yaguarete-language-support-0.2.1.vsix), metadatos PE y banner del CLI.',
        'Suite completa de 366 pruebas automatizadas: 271 en el workspace Rust (cargo test --workspace) y 95 en Python.',
        'Paquetes oficiales v0.2.1: Instalador_Yaguarete.exe (7.93 MB), yaguarete.exe (2.75 MB) y .vsix (0.76 MB).',
      ],
    },
  ],
},
```

**Tarjeta ADR‑001 (ChangelogPage L31):** añadir al final: *"En **v0.2.1** se unifica la semántica de inicialización de estructuras (atributos en `NULO`) entre el evaluador AST, la VM y el prototipo Python."*

---

### 3.9 Buscador (`Ctrl + K`) — `SEARCHABLE_DOCS` en [yaguareteData.ts L1198‑1207](file:///e:/Python_d/Yaguarete_Lang_Web/src/data/yaguareteData.ts#L1198-L1207)

- `syn-estructura.summary`: *"…con inicialización automática de punteros recursivos a NULO"* → *"…con **todos los atributos inicializados en NULO por defecto (v0.2.1)** y comprobación `== NULO` / `!= NULO`"*.
- **Nueva entrada sugerida:**
  ```ts
  {
    id: 'syn-nulo-default',
    title: 'NULO por defecto en atributos de ESTRUCTURA (v0.2.1)',
    category: 'Sintaxis y Control',
    summary: 'Desde v0.2.1 todos los atributos de una estructura inician en NULO; las variables escalares sueltas mantienen 0, "" o FALSO.',
    syntax: 'Registro reg\nSI (reg.id == NULO)\n    reg.id = 1\nFIN SI',
    route: '/documentacion',
    anchor: 'estructuras-datos',
  },
  ```
- Las entradas derivadas de `PRIMITIVE_TYPES_TABLE` y `OPERATORS_TABLE` se actualizan solas con los cambios de §3.3.

---

### 3.10 Pie de página — [Footer.tsx](file:///e:/Python_d/Yaguarete_Lang_Web/src/components/Footer.tsx)

- L24: automático (`v{YAGUARETE_VERSION}`).
- L104‑105: enlace "Estructuras y Punteros NULO" → opcional `Estructuras y NULO por defecto (v0.2.1)`.

---

### 3.11 Metadatos y README del portal

- **[README.md](file:///e:/Python_d/Yaguarete_Lang_Web/README.md)** L15, L18, L28: `v0.2.0` → `v0.2.1`; en L18 añadir *"atributos de estructura en `NULO` por defecto"*; en L28 anteponer `v0.2.1` al historial SemVer.
- **[index.html](file:///e:/Python_d/Yaguarete_Lang_Web/index.html)**: no contiene versión; sin cambios (opcional: mencionar v0.2.1 en `og:description`).

---

## 4. Checklist de implementación

- [ ] `YAGUARETE_VERSION` y `package.json` → `0.2.1`
- [ ] `DOWNLOAD_ASSETS` + `RELEASE_CHECKSUMS` (nombres, tamaños, SHA‑256; Linux pendiente de CI)
- [ ] Entrada `0.2.1` en `RELEASES_HISTORY` + tarjeta ADR‑001
- [ ] Docs §3 Estructuras reescrita + bloque `Registro` + callout "Nuevo en v0.2.1"
- [ ] `PRIMITIVE_TYPES_TABLE` (NULO, ESTRUCTURA) y `OPERATORS_TABLE` (`== NULO`)
- [ ] Receta `lista-enlazada`: `mi_lista.cantidad = 0` + highlights
- [ ] Nueva receta `semaforo-cola` (opcional)
- [ ] `instantiateStruct` → todo `null`; errores aritméticos/relacionales con `NULO` en el intérprete web
- [ ] Home: badge hero, contador de tests `366 (271 + 95)`, texto "desde v0.2.0" de la VM
- [ ] Hero slides 2, 3 (texto), 1 (`9.0`), 5 (`v0.2.1`)
- [ ] VS Code L29/L37 y `SEARCHABLE_DOCS` vsix; **no tocar `launch.json` "version"**
- [ ] Textos que atribuyen features de v0.2.0 a `v{YAGUARETE_VERSION}` (Docs L216, Playground L25, Home L290)
- [ ] README del portal
- [ ] `npm run build` + ejecutar en el Playground todos los slides y recetas

---

## 5. Hallazgos en el lenguaje (fuera del alcance de la web, para reportar)

Detectados al ejecutar los ejemplos de la web con `yaguarete.exe v0.2.1`; **no parecen introducidos por v0.2.1** (el diff no toca esas rutas), pero afectan a la afirmación de la web de que la VM es el motor por defecto:

1. **Matrices bidimensionales en la VM:** `ENTERO resultado[filas][columnas]` declarada con dimensiones dinámicas y luego indexada → *"Acceso por índice sobre elemento no indexable"* (Hero 4 y receta `matrices.yaguarete`). Con `--engine ast` funciona.
2. **Métodos de `ARCHIVO` en la VM:** `nomina.LEER_LINEA()` → *"Llamada a método aún no implementada en bytecode"* (Hero 5).
3. **BOM UTF‑8:** un archivo `.yaguarete` guardado con BOM falla con *"Error léxico en línea 1, columna 1: Carácter inesperado"*. Algunos editores de Windows guardan con BOM por defecto.
