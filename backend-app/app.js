const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes");
const morgan = require("./config/morgan");
const config = require("./config/config");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// database conection
const db = require("./models");

// For explotation. Database is not dropped.
db.sequelize.sync();

// v1 api routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log("Server started on: " + config.PORT);
});
