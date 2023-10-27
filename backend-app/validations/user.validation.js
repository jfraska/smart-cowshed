const Joi = require("joi");
const { password } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    address: Joi.string().required(),
    no_telp: Joi.string().required(),
    lat: Joi.string(),
    lng: Joi.string(),
    role: Joi.string().required().valid("user", "admin", "puskeswan"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    search: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const updateUser = {
  body: Joi.object()
    .keys({
      username: Joi.string(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      address: Joi.string(),
      no_telp: Joi.string(),
      lat: Joi.string(),
      lng: Joi.string(),
      role: Joi.string().valid("user", "admin", "puskeswan"),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
