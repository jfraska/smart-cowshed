const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const cowValidation = require("../validations");
const cowController = require("../controllers/cow.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .get(auth("getCows"), validate(cowValidation.getCows), cowController.getCows)
  .post(
    auth("manageCows"),
    validate(cowValidation.createCow),
    upload.fields([
      { name: "kaki", maxCount: 1 },
      { name: "mulut", maxCount: 1 },
    ]),
    cowController.createCow
  );

router
  .route("/:id")
  .get(auth("getCows"), validate(cowValidation.getCow), cowController.getCow);
// .patch(
//   auth("manageCows"),
//   validate(cowValidation.updateCow),
//   cowController.updateCow
// )
// .delete(
//   auth("manageCows"),
//   validate(cowValidation.deleteCow),
//   cowController.deleteCow
// );

module.exports = router;
