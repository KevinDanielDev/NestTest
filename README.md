<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar proyecto en desarrollo

1. Clonar el repositorio

## SSH

```
git@github.com:KevinDanielDev/NestTest.git
```

## HTTPS

```
https://github.com/KevinDanielDev/NestTest.git
```

3. Instalar dependencias
```
npm install || npm i
```

4. Renombrar el archivo .env.template a .env

5. Agregar todas las variables de entorno para el correcto funcionamiento de la aplicacion

```
# Db
DB_NAME=dbTest.sqlite

# Server
NODE_ENV=development
PORT=3001

# JWT
JWT_SECRET=7d7b3221-f068-44bb-b875-c7594d5d280d

# Provider API Movie
BASE_URL=https://api.themoviedb.org/3
API_KEY_PROVIDER=d58b093ba2fa12b2f739c508780af23e
API_JWT_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNThiMDkzYmEyZmExMmIyZjczOWM1MDg3ODBhZjIzZSIsIm5iZiI6MTczMzAxMzU1Mi40OTcsInN1YiI6IjY3NGJiMDMwMjVmZTUwNTQwMDcwNjlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ekG22uZqw2m0l0tmZ23Nd8DISzPG8hsneRYEMK2JfDk
```

5. Correr proyecto en modo watch
```
npm run start:dev
```

6. Una vez el proyecto esta corriendo sin nigun problema lo que debemos hacer es sincronizar nuestra base de datos con los resultados de la api
7. Abrir Postman
8. Ejecutar el siguiente endpoint como (peticion GET)
```
localhost:3001/api/movies/sync
```

9. Asegurarse de que la data si esta en nuestra base de datos (Peticion GET)
```
localhost:3001/api/movies
```

10. Felicidades haz levantado el backend de forma exitosa. Ahora puedes ir y revisar el proyecto del frontend

# Stack Utilizado

### FrontEnd

* NextJs
* TypeScript

### Backend

* NestJs
* Sqlite
* TypeScript