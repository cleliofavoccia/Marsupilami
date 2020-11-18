const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Ouvre une URL pour s'inscrire (en checkant la non duplicité du login)
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateLogin
    ],
    controller.signup
  );
  // Ouvre une URL pour s'authentifier
  app.post("/api/auth/signin", controller.signin);
};