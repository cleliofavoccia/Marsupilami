const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Indique que tout le monde (‘*’) peut accéder au serveur.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Indique les headers autorisés sur les requêtes au serveur.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Indique les méthodes autorisées sur les requêtes au serveur.
  next();
});

// Parse les requêtes de content-type : application/json
app.use(bodyParser.json());

// Parse les requêtes de content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Route test de bienvenue pour vérifier que le serveur est OK
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FavoBook application." });
});

// Connexion à la BDD (Mongo DB)
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Import des routes pour manipuler les objets Marsupilami
require("./app/routes/marsupilami.routes.js")(app);
// Import des routes pour manipuler les objets Marsupilami de type user
require('./app/routes/auth.routes')(app);

// Port d'écoute des requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});