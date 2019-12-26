
const axios = require('axios');
// Defining methods for the userController
module.exports = {

  findOne: function (req, res) {
    try {
      //check if the required fields are empty

      if (req.body.email.trim() === "" || req.body.username.trim() === "") {
        res.status(400).end("E-mail and/or username must be informed!");
      }
    } catch (e) {
      res.status(500).end("email and username fields must be passed!");
    }


    /// find the user by its email
    const userFoundByEmail = req.body.users.filter((user) => {
      return user.email === req.body.email
    })
   
    if (userFoundByEmail) {
      //compare the username sent with the username availble
      if (userFoundByEmail[0].username === req.body.username) {
        // usernames match
        req.session.loggedin = true;
        req.session.UserId = userFoundByEmail[0].id;
        req.session.UserName = userFoundByEmail[0].username;


        res.status(200).send({ userId: userFoundByEmail[0].id, userName: userFoundByEmail[0].username });
      } else {
        // Passwords don't match
        res.status(400).end("Incorrect Username and/or email");
      }
    } else {
      res.status(400).end("User was not found!");
    }

  },

  logOut: function (req, res) {
    req.session.destroy(err => {
      if (err) {
        console.log("Error destroying session:");
        console.log(err);
      } else {
        res.status(200).end("User was signed out successfully!");
      }
    });
  }
};
