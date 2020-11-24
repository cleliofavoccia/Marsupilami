module.exports = app => {
  const marsupios = require("../controllers/marsupilami.controller.js");

  var router = require("express").Router();

  // Ouvre une URL pour : créer un nouveau Marsu
  router.post("/", marsupios.create);

  // Ouvre une URL pour :  Retourne tous les Marsus de la base
  router.get("/", marsupios.findAll);

  // Ouvre une URL pour :  Retourne un unique Marsu selon un id donné
  router.get("/:id", marsupios.findOne);

  // Ouvre une URL pour :  Retourne un unique Marsu selon un login donné
  router.get("/login/:login", marsupios.findOneByLogin);

  // Ouvre une URL pour :  Met à jour un Marsu de l'id donné
  router.put("/:id", marsupios.update);

  // Ouvre une URL pour :  Récupère tous les amis d'un Marsu de l'id donné
  router.get("/friends/all/:id", marsupios.findAllFriendsByMarsuId)

  // Ouvre une URL pour :  Ajoute un ami à la liste d'amis d'un Marsu à l'id donné
  router.put("/friends/add/:id", marsupios.addFriendsToMarsu)

  // Ouvre une URL pour :  Supprime un ami de la liste d'amis d'un Marsu à l'id donné
  router.put("/friends/delete/:id", marsupios.deleteFriendsToMarsu)
  // Chemin url de base des routes ci-présentes
  app.use('/api/marsupios', router);
};