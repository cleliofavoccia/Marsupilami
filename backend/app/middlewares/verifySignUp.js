const db = require("../models");
const Marsupilami = db.marsupios;

// On s'assure qu'il n'y a pas de duplication du login
checkDuplicateLogin = (req, res, next) => {
  // On cherche si il existe un Marsu ayant le login donné
  Marsupilami.findOne({
    login: req.body.login
  }).exec((err, marsupilami) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // Dans le cas où on le trouve, on renvoit une erreur
    if (marsupilami) {
      res.status(400).send({ message: "Failed! Login is already in use!" });
      return;
    }
      next();
    });
};

const verifySignUp = {
  checkDuplicateLogin
};

module.exports = verifySignUp;