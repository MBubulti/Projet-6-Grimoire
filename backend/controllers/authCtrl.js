const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({email: req.body.email, password: hash});
      user
        .save()
        .then(() => res.status(201).json({message: 'Création de votre profil'}))
        .catch((error) => res.status(400).json({error}));
    })
    .catch((error) => res.status(500).json({error}));
};

exports.login = (req, res) => {
  User.findOne({email: req.body.email})
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({message: 'Identifiant ou mot de passe incorrect'});
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({message: 'Identifiant ou mot de passe incorrect'});
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({userId: user._id}, process.env.JWT_secret, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({error}));
    })
    .catch((error) => res.status(500).json({error}));
};
