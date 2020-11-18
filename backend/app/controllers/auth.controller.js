const config = require("../config/auth.config");
const db = require("../models");
const Marsupilami = db.marsupios;

var jwt = require("jsonwebtoken"); // Import de gestion des tokens
var bcrypt = require("bcryptjs"); // Import de gestion du hashage des password

exports.signup = (req, res) => { // Méthode pour enregistrer un utilisateur
  const marsupilami = new Marsupilami({ // On créer un nouvel objet Marsupilami
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8) // On hash le password
  });

  marsupilami.save((err, marsupilami) => { //On sauvegarde le Marsupilami en base
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });

  });
}


exports.signin = (req, res) => { // Méthode pour authentifier un utilisateur
  Marsupilami.findOne({ // On cherche un Marsupilami ayant le login donné
    login: req.body.login
  })
    .exec((err, marsupilami) => {
      // On gère les différents cas d'erreurs (on trouve pas le marsu, ou autre...)
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!marsupilami) {
        return res.status(404).send({ message: "Marsupilami Not found." });
      }
      // Dans le cas contraire, on compare les passwords (hashés)
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        marsupilami.password
      );
      // Dans le cas où le password n'est pas valide, on renvoi un token vide et un message d'erreur
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // Dans le cas contraire, on renvoi un token avec un timer de 24h
      var token = jwt.sign({ id: marsupilami.id }, config.secret, {
        expiresIn: 86400
      });

      // On renvoi le tout
      res.status(200).send({
        id: marsupilami._id,
        login: marsupilami.login,
        accessToken: token
      });
    });
};