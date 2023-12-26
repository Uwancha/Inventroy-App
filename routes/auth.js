const express = require('express');
const router = express.Router();
const passport = require('../passport')

const userController = require('../controllers/userController')

//router.get("/signup", userController.getsignUp);
//router.post("/signup", userController.signUp);

router.get("/login", userController.getLogin);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}))

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

module.exports = router