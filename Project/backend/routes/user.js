const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/User");

// Get All/Users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.error(err));
});

// Create an Account
router.post("/add_user", (req, res) => {
  const {
    userName,
    email,
    password,
    role,
    phone,
    adress,
    image,
    name

  } = req.body;

  // Test if user already exist !
  User.findOne({
    $or: [
      {
        email,
      },
      {
        userName,
      },
    ],
  }).then((user) => {
    if (user) {
      let errors = {};
      if (user.userName === userName) {
        errors.userName = "User Name already exists";
      } else {
        errors.email = "Email already exists";
      }
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        userName,
        email,
        password,
        role,
        phone,
        adress,
        image,
        name
      });

      // Code the password using bcrypt module
      bcrypt.genSalt(10, (err, salt) => { 
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then((newuser) => res.json(newuser))
            .catch((err) => console.error(err));
        });
      });
    }
  });
});

// login user!
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) res.sendStatus(404);
      else {
        bcrypt.compare(password, user.password).then((isMatched) => {
          if (isMatched) {
            const payload = {
              id: user._id,
              email: user.email,
              role: user.role,
              userName: user.userName,
              phone: user.phone,
              image: user.image,
              adress: user.adress,
              dateofcreation: user.dateofcreation,
            };
            jwt.sign(payload, "session", { expiresIn: 3600 }, (err, token) => {
              if (err) res.sendStatus(500);
              else {
                res.json({ token: token });
              }
            });
          } else res.sendStatus(400);
        });
      }
    })
    .catch((err) => res.send("Server error"));
});

// validate token
router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);
// get user by ID
router.get("/:id", (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

//delete user
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  User.findOneAndDelete({ _id: _id })
    .then((events) => res.send("success"))
    .catch((err) => console.log(err));
});

// update user
router.put("/update/:id", (req, res) => {
  const _id = req.params.id;
  let { phone, adress, password } = req.body;

  // Code the password using bcrypt module
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      password = hash;
      User.findOneAndUpdate(
        { _id },
        {
          $set: {
            phone,
            adress,
            password,
          },
        }
      )
        .then((user) => res.send("user updated"))
        .catch((err) => console.log(err));
    });
  });
});


const uploadMulter = require('../middleware/upload')
const validation = require('../middleware/validation')

router.put("/updateimage/:id",uploadMulter, validation, (req, res) => {
  const _id = req.params.id;
  let { profilePictureName } = req.body;
  let image = req.file.path
 
      User.findOneAndUpdate(
        { _id },
        {
          $set: {
          image,
          profilePictureName
          },
        }
      )
        .then((user) => res.send("user image updated",user))
        .catch((err) => console.log(err));
    });
 
module.exports = router;
