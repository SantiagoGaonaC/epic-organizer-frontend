# Epic Organizer

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

## Tecnologías

- Backend: Node, Express, MongoDB
- Frontend: React, Next.js, Vite, Tailwind CSS, React Hook Form, Chakra UI
- Autenticación: Código enviado por correo electrónico
