const User = require('../models/User');

exports.signup = (req, res) => {
  const user = new User({...req.body});
  user
    .save()
    .then(() => res.status(200).json({message: 'Création de votre profil'}))
    .catch((error) => res.status(400).json({error}));
};
