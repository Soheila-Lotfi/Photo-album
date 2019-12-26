const router = require("express").Router();
const userRoutes = require("./auth.js");

// routes
router.use("/user", userRoutes);


module.exports = router;
