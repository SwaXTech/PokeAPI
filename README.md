# PokeAPI

## Objetivo

Definir una API para gestionar nuestro equipo Pokémon.

## Conceptos importantes

- Construcción y uso de una API con Express
- Entendiendo el Protocolo HTTP
- Testing unitario
- Testing de Integración
- Test Driven Development
- Autenticación
  - Passport
  - JWT
  - Bcrypt
- Refactors con base de tests
- Arquitectura
- Uso y configuración de Middlewares
- Uso de Routing
- Uso de Promesas - Async/Await
- Persistencia
  - Mongodb
  - Variables de entorno

### Acciones

- Identificarnos
- Añadir pokémon a nuestro equipo
- Eliminar pokémon de nuestro equipo
- Consultar información de nuestro equipo
- Intercambiar el orden de nuestros pokémons


### REST Design

- Añadir Pokémon:   POST /team/pokemons
- Consultar Equipo: GET /team
- Eliminar Pokémon: DELETE /team/pokémons/:id
- Intercambiar el orden de nuestro pokémon: PUT /team
- Sistema de Credenciales


# Autenticación

- [PassportJS](passportjs.org/docs)
  - Biblioteca de autenticación para NodeJS
  - Autenticación por diferentes estrategias
  - Usamos [JWT](jwt.io) JSON Web Token
    - Codificar información de usuario en un String.

# Middleware

En la construcción de un endpoint está:

- El verbo http.
- El endpoint
- Los middlewares
- El handler

Con respecto a los middlewares:

- Pueden ser 0 a n;
- Van en orden
- Deben llamar a next()

```js
app.get('/', (req, res, next) => {
  ...
  next()
}), (req, res, next) => {
  ...
  next()
}), (req, res) => {
  // Handler
});
```
En el caso de AUTH, se pasa como parámetro  `passport.authenticate('jwt', { session: false })`

Posteriormente se generaliza con [auth-middleware.js]("util/auth-middleware.js")

