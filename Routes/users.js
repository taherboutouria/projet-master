const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../schema');

router.post(
  '/register',
  [
    check('civility', 'Name is required').not().isEmpty(),
    check('fullname', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('DateOfBirth', 'Name is required').not().isEmpty(),
    check('country', 'Name is required').not().isEmpty(),
    check('phone', 'Name is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { civility, fullname, email, password, DateOfBirth, country,phone } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
          civility,
          fullname,
          email,
          password,
          DateOfBirth,
          country,
          phone,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json(user)
      }
      catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    })
    /* const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  ); */


  router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {

      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }


        const {email, password} = req.body
        // vérifier si l'utilisateur n'a pas du compte!!
        const isfound = await User.findOne({email})
        if(!isfound){
            return res.status(403).json({message:'You have to register before !!'})
        }
        // compare the password (req.body) vs password from the DB
        const isMatch = bcrypt.compareSync(password, isfound.password)
        if(!isMatch){
            return res.status(402).json({message:'Wrong password'})
        }
        //generate a token
         var token = await jwt.sign({ id: isfound._id }, process.env.SECRET,{expiresIn:'30d'});
         res.status(200).json({token,isfound})



      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  module.exports = router