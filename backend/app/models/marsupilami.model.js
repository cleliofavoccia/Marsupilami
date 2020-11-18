// Schéma mongoose et modèle d'un Marsupilami
module.exports = mongoose => {
  const Marsupilami = mongoose.model(
    "marsupilami",
    mongoose.Schema(
      {
        age: Number,
        family: String,
        race: String,
        food: String,
        login: String,
        password: String,
        friends: [
            {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "marsupilami"
            }
        ]
      },
      { timestamps: true }
    )
  );

  return Marsupilami;
};