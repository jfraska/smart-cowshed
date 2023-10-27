const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    address: Joi.string().required(),
    no_telp: Joi.string().required(),
    role: Joi.string().valid("admin", "user", "puskeswan").default("user"),
    lat: Joi.string().when("role", {
      is: "puskeswan",
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
    lon: Joi.string().when("role", {
      is: "puskeswan",
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
