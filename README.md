# AuthFlow API

AuthFlow API es una solución robusta para la gestión de autenticación y autorización en aplicaciones Node.js, implementando JSON Web Tokens (JWT) y tokens de refresco con rotación segura. Incluye funcionalidades como registro, inicio de sesión, cierre de sesión, protección de rutas y limpieza automática de tokens expirados.

# Características

+ Registro y Autenticación de Usuarios: Manejo seguro de credenciales con hashing de contraseñas.

+ JWT con Tokens de Refresco: Implementación de tokens de acceso y refresco para sesiones seguras y eficientes.

+ Rotación de Tokens de Refresco: Mejora la seguridad al rotar tokens de refresco después de su uso.

+ Middleware de Protección de Rutas: Asegura endpoints mediante la verificación de tokens de acceso.

+ Cierre de Sesión Individual y Global: Permite a los usuarios cerrar sesiones específicas o todas las sesiones activas.

+ Limpieza Automática de Tokens Expirados: Script para eliminar tokens de refresco expirados de la base de datos.

# Tecnologías Utilizadas

+ Node.js: Entorno de ejecución para JavaScript en el servidor.

+ Express.js: Framework web para Node.js.

+ Sequelize: ORM para bases de datos SQL.

+ PostgreSQL = Base de datos

+ jsonwebtoken: Implementación de JWT para Node.js.

+ bcrypt = Hash de contraseñas.

+ dotenv: Manejo de variables de entorno.

# Instalación y uso local 

## Requisitos Previos 🛠️

+ [Node.js](https://nodejs.org/en): entorno de ejecución para JavaScript
+ [PostgreSQL](): Motor de bases de datos SQL donde se almacenarán los usuarios y tokens
+ Cliente HTTP para realizar peticiones a los endpoints (Postman, Thunder Client, Insomnia, etc)
+ [Git](https://git-scm.com/): Permitirá clonar el repositorio

## Configuración

1. Clona el repositorio

    ```bash
    git clone https://github.com/AxelIbarrola/AuthFlow-api.git
    cd AuthFlow-api
    ```

2. Instala las dependencias

    ```bash
    npm install
    ```

3. Configura archivo `.env`

    ```env
    DB_HOST=localhost
    DB_USER=tu_usuario_postgres
    DB_PASS=tu_password_postgres
    DB_NAME=nombre_de_tu_base
    JWT_SECRET=secreto_para_jwt
    JWT_REFRESH_SECRET=secreto_para_refresh
    PORT=3000
    ```

4. Crear Base de Datos en PostgreSQL

    ```sql
    CREATE DATABASE database_name
    ```
5. Sincroniza la base de datos

    ```bash
    npm run sync
    ```

6. Inicia el servidor

    ```bash
    npm run dev
    ```

7. Solicitudes HTTP

### Endpoints disponibles

+ Registro de usuario: POST `/api/auth/register`

    ```json
    Body (JSON):

    {
        "email": "usuario@gmail.com",
        "password":"12342"
    }
    ```
    Devuelve un `accessToken` y un `refreshToken`

+ Inicio de sesión: POST `/api/auth/login`

    ```json
    Body (JSON):

    {
        "email": "usuario@gmail.com",
        "password":"12342"
    }
    ```
    Devuelve un `accessToken` y un `refreshToken`

+ Refresh de Token: POST `/api/refresh-token`

    ```json
    Body (JSON):

    {
        "refreshToken": "REFRESH_TOKEN_AQUI"
    }
    ```
    Devuelve un `accessToken` y un `refreshToken`

+ Ruta Protegida Ver Perfil: GET `/api/profile`

    ```http
    Headers:
    Autorization: Bearer TOKEN_DE_ACCESO
    ```
    Devuelve datos del usuario autenticado

+ Logout de sesión actual: POST `/api/logout`

    ```http
    Headers:
    Autorization: Bearer TOKEN_DE_ACCESO
    ```
    Invalida el `refreshToken` usado en esta sesión

+ Logout global: POST `/api/logout-all`

    ```http
    Headers:
    Autorization: Bearer TOKEN_DE_ACCESO
    ```
    Invalida los `refresh tokens` asociados al usuario

+ Limpieza manual de Tokens expirados

    ````bash
    npm run cleanup
    ```
    Elimina tokens expirados de la base de datos

