# Epic Organizer
<div style="display: flex; justify-content: center;">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://shields.io/badge/chakra--ui-black?logo=chakraui&style=for-the-badge"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
<div/>
  
Epic Organizer es una aplicación de gestión de tareas y calendario. Los usuarios pueden crear tareas con etiquetas y fechas, que se muestran en un calendario interactivo. Las tareas pueden filtrarse por etiquetas, y se pueden agregar notas a cada tarea. 

## Características

### 1. Autenticación de Usuarios

Los usuarios deben poder registrarse y autenticarse en la aplicación.

**Actividades**

- Configurar un servidor Express en Node.js para manejar las peticiones de autenticación.
- Configurar una base de datos MongoDB para almacenar la información del usuario.
- Implementar el envío de código de autenticación al correo electrónico del usuario.
- Validar el código de autenticación del usuario.

### 2. Manejo de Tareas

Los usuarios deben poder crear, editar y eliminar tareas.

**Actividades**

- Configurar una colección en MongoDB para almacenar las tareas.
- Crear rutas en Express para manejar la creación, actualización y eliminación de tareas.
- Crear formularios en React usando React Hook Form para la entrada de datos de la tarea.

### 3. Etiquetas de Tareas

Las tareas deben tener etiquetas que pueden ser usadas para filtrar las tareas en el calendario.

**Actividades**

- Agregar un campo de etiquetas en la colección de tareas de MongoDB.
- Crear una interfaz en React para seleccionar y agregar etiquetas a las tareas.

### 4. Notas de Tareas

Los usuarios deben poder agregar notas a las tareas.

**Actividades**

- Configurar una colección en MongoDB para almacenar las notas de las tareas.
- Crear rutas en Express para manejar la creación y eliminación de notas.
- Crear una interfaz en React para mostrar y editar las notas de las tareas.

### 5. Calendario

Los usuarios deben poder ver sus tareas en un calendario y navegar entre los meses.

**Actividades**

- Implementar una vista de calendario en React usando una biblioteca como `react-calendar`.
- Agregar funcionalidad para mostrar las tareas en el calendario.
- Implementar la navegación entre los meses en el calendario.

### 6. Filtrado de Tareas

Los usuarios deben poder filtrar sus tareas en el calendario por etiquetas.

**Actividades**

- Implementar una interfaz en React para seleccionar etiquetas de filtrado.
- Agregar funcionalidad para filtrar las tareas en el calendario según las etiquetas seleccionadas.

---

# Por qué con NextJS?:

- Compilación de NextJS (Compiling): [What is Compiling? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/compiling)

- Reducción de código (Minifying): [What is Minifying? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/minifying)

- Únificación del Código (Bundling): [What is Bundling? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/bundling)

- División de código dependiendo de las rutas de entrada(## Code Splitting): [What is Code Splitting? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/code-splitting)

- Pasos para llevar el code a producción (Build Time): [Build Time and Runtime - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/buildtime-and-runtime)
  
  - - HTML files for statically generated pages
    - JavaScript code for [rendering](https://nextjs.org/learn/foundations/how-nextjs-works/rendering) pages on the [server](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)
    - JavaScript code for making pages interactive on the [client](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)
    - CSS files

- Runtime:
  
  - Rendering: [What is Rendering? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)
  
  - Client-Side Rendering vs. Pre-Rendering: Client Side carga componente por componente y cada componente puede tener un tamaño de carga diferente al otro, por lo cual la página puede cargar por partes, Pre Rendering toda la página se carga apenas se hace la solicitud.
  
  - Server-Side Rendering: Esto se renderiza del lado del servidor.
  
  - Static Site Generation: [What is Rendering? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/rendering) : Generación de sitios estáticos
    Con la generación de sitios estáticos, el HTML se genera en el servidor, pero a diferencia de la renderización del lado del servidor, no hay servidor en tiempo de ejecución. En su lugar, el contenido se genera una vez, en tiempo de compilación, cuando se despliega la aplicación, y el HTML se almacena en una CDN y se reutiliza para cada solicitud.
  
  - Despliegue en múltiples CDN gracias a los archivos estáticos generados en Compilación de lado del servidor: [What is the Network? - How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works/cdns-and-edge)

- Enrutamiento dinámico por medio de la estructura de carpetas, contiene rutas por grupos en carptas

- Importaciones de estilos automáticos desde NextJS sin necesidad de descargar los paquetes.

- Aplicaciones extensibles.



---

# Mockup



![](C:\Users\sgaon\AppData\Roaming\marktext\images\2023-06-10-20-11-52-image.png)
