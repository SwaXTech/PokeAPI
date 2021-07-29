const express = require('express');
const router = express.Router();
const axios = require('axios').default;

const passport = require('passport');
require('../auth')(passport);

const teamsController = require('../controllers/teams');
const usersController = require('../controllers/users');

const authMiddleware = passport.authenticate('jwt', { session: false });

router.route('/').get(
  authMiddleware,
  (request, response) => {
    let userID = request.user.userId;
    let user = usersController.getUser(userID);
    let team = teamsController.getTeamOfUser(userID);
    response.status(200).json({
      trainer: user.username,
      team: team
    })
  }).put(passport.authenticate('jwt', { session: false }), (request, response) => {
    teamsController.setTeam(request.user.userId, request.body.team);
    response.sendStatus(200);
  })

router.route('/pokemons').post(authMiddleware,
  (request, response) => {
    let pokemonName = request.body.name;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((pokeApiResponse) => {
        let id = pokeApiResponse.data.id;
        let pokemon = {
          name: pokemonName,
          pokedexNumber: id
        }
        teamsController.addPokemon(request.user.userId, pokemon);
        response.sendStatus(201).json(pokemon);
      }).catch((error) => {
        response.sendStatus(400);
      })
  })

router.route('/pokemons/:pokeid').delete((request, response) => {
  response.status(200).send("Hello World")
})

exports.router = router;