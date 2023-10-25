const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/cow.validation");
const userController = require("../controllers/cow.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .post(
    auth("manageCows"),
    validate(userValidation.createCow),
    upload.any("file"),
    userController.createCow
  );
// .get(
//   auth("getCows"),
//   validate(userValidation.getCows),
//   userController.getCows
// );

// router
//   .route("/:id")
//   .get(auth("getCows"), validate(userValidation.getCow), userController.getCow)
//   .patch(
//     auth("manageCows"),
//     validate(userValidation.updateCow),
//     userController.updateCow
//   )
//   .delete(
//     auth("manageCows"),
//     validate(userValidation.deleteCow),
//     userController.deleteCow
//   );

module.exports = router;
