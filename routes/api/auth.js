const router = require("express").Router();
const userController = require("../../controllers/userController");

// routes for userController

// Authenticate an user
router.route("/auth").post(userController.findOne);

//Log out the user
router.route("/logout").post(userController.logOut);


module.exports = router;







