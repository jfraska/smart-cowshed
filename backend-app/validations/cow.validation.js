const Joi = require("joi");

const createCow = {
  body: Joi.object().keys({
    id_sapi: Joi.string().required(),
    kaki: Joi.string().required(),
    mulut: Joi.string().required(),
    suhu: Joi.string().required(),
    lat: Joi.string(),
    lng: Joi.string(),
    status: Joi.string().required().valid("sehat", "sakit"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    search: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getCow = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const deleteCow = {
  params: Joi.object().keys({
    cowId: Joi.string(),
  }),
};

module.exports = {
  createCow,
  getUsers,
  getCow,
  deleteCow,
};
