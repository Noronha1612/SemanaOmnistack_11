const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.list);

module.exports = routes;

/**
 * Parâmetros:
 * 
 * Query: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação) Ex: http://localhost:3333/users?name=Gabriel&idade=17
 * 
 * Route: Parâmetros utilizados para identificar recursos Ex: http://localhost:3333/users/2 (/users/:id)
 * 
 * Request body: Corpo da requisição utilizado para criar ou alterar recursos
 */
