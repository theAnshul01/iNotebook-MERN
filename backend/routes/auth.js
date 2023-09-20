const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'hello$boy';   // * use of JWT Authentication 

//  * ROUTE 1: Create a user using POST "/api/auth/createuser" method. Doesn't require login
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email address').isEmail(),
  body('password', 'Password length should be greater than 4').isLength({ min: 5 }),
], async (req, res) => {

  // ! if there are errors return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // try-catch to be safe if an error occur
  try {
    // TODO: check whether the user-email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({ error: "Sorry a user already exist with this email" })
    }
    // *Create a new user

    // *Encrypting the password using bcryptjs module from npm
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})

// * ROUTE 2: Authenticate a user using: POST "/api/auth/login". No Login Required
router.post('/login', [
  body('email', 'Enter a valid Email address').isEmail(),
  body('password', 'password can\'t\' be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect login credentials/password" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Incorrect login credentials/password" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})

// * ROUTE 3: get loggedin user details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");   // ? Selecting every field except password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})
module.exports = router