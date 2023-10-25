const Joi = require("joi");

const createCow = {
  body: Joi.object().keys({
    id_sapi: Joi.string().required(),
    kaki: Joi.string().required(),
    mulut: Joi.string().required(),
    suhu: Joi.string().required(),
    status: Joi.string().required().valid("sehat", "sakit"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCow = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string().email(),
      password: Joi.string(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

module.exports = {
  createCow,
  getUsers,
  getCow,
  updateUser,
  deleteUser,
};
