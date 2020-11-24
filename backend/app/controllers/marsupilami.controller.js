const db = require("../models");
const Marsupilami = db.marsupios;

// Créer et sauvegarde un Marsupilami en base
exports.create = (req, res) => {
  // On s'assure que la demande est valide
  if (!req.body.login) {
    res.status(400).send({ message: "Content can not be empty! " + req.body.login });
    return;
  }

  // Si c'est le cas, on crée un nouvel objet Marsupilami avec les éléments donnés
  const marsupilami = new Marsupilami({
    age: req.body.age,
    family: req.body.family,
    race: req.body.race,
    food: req.body.food,
    login: req.body.login,
    password: req.body.password,
    friends: req.body.friends
  });

  // On sauvegarde le Marsupilami en base
  marsupilami
    .save(marsupilami)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Marsupilami."
      });
    });
};

// Renvoi tous les marsupilamis de la BDD
exports.findAll = (req, res) => {
  Marsupilami.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving marsupios."
      });
    });
};

// Renvoi un Marsupilami selon un id donné
exports.findOne = (req, res) => {
  const id = req.params.id;

  Marsupilami.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Marsupilami with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Marsupilami with id=" + id });
    });
};

// Renvoi un Marsupilami selon un login donné
exports.findOneByLogin = (req, res) => {
  const loginP = req.params.login;

  Marsupilami.find({ login: loginP })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Marsupilami with login " + loginP });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Marsupilami with login=" + loginP });
    });
};

// Met à jour un Marsupilami en base
exports.update = (req, res) => {
  // On s'assure que la demande contient bien des éléments à mettre à jour
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  // On cherche et met à jour le marsupilami ayant l'id donné
  Marsupilami.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Marsupilami with id=${id}. Maybe Marsupilami was not found!`
        });
      } else res.send({ message: "Marsupilami was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Marsupilami with id=" + id
      });
    });
};

// Supprime un ami de la liste d'amis d'un Marsu
exports.deleteFriendsToMarsu = (req, res) => {
   const id = req.params.id;
   const friendBody = req.body;
  // On cherche le marsupilami par id donné
  Marsupilami.findByIdAndUpdate(
        id,
        // On retire (pull) de la liste, l'id de l'ami du Marsu donné
        { $pull : {friends: friendBody._id}},
        )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Marsupilami with id=${id}. Maybe Marsupilami was not found!`
        });
      } else {
        res.send({
          message: "Marsupilami was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Marsupilami with id=" + id
      });
    });
};
// Ajoute un ami à la liste d'amis d'un Marsu
exports.addFriendsToMarsu = (req, res) => {
    const id = req.params.id;
    const friendBody = req.body;
    // On cherche le marsupilami par id donné
    Marsupilami.findByIdAndUpdate(
        id,
        // On ajoute (push) dans la liste, l'id de l'ami du Marsu donné
        { $push : {friends: friendBody._id}},
        {new: true,useFindAndModify: false}
        )
        .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Marsupilami with id=${id}. Maybe Marsupilami was not found!`
                });
              } else res.send({ message: "Marsupilami was updated successfully." });
        })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Marsupilami with id=" + id
              });
            });
}
// Récupère la liste d'ami d'un Marsu
exports.findAllFriendsByMarsuId = (req, res) => {
    const id = req.params.id;
    // Récupère un Marsu par l'id donné et peuple (mongoose.populate) sa liste d'amis qu'on renvoit
    Marsupilami.findById(id).populate('friends')
     .then(data => {
          res.send(data);
     })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving marsupios."
          });
        });
}
// FindAllFriends
// addFriend
// deleteFriend