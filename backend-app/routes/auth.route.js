const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post("/login", validate(authValidation.login), authController.login);

router.get("/", auth("authCek"), authController.authCek);

module.exports = router;
