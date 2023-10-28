const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const cowRoute = require("./cow.route");
const auth = require("../middlewares/auth");
const path = require("path");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/cows",
    route: cowRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/image/:filename", auth("getCows"), (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "../public/upload", filename));
});

module.exports = router;
