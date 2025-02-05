const User = require('../../models/User');

exports.signUp = (req, res) => {
  const user = new User({...req.body});
  user
    .save()
    .then(() => res.status(200).json({message: 'Création de votre profil'}))
    .catch((error) => res.status(400).json({error}));
};

exports.login = (req, res) => {
  const user = User({...req.body});
  user;
};
