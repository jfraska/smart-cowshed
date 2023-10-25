const httpStatus = require("http-status");
const db = require("../models");
const Cow = db.cow;
const ApiError = require("../utils/ApiError");

const createCow = async (userBody) => {
  return Cow.create(userBody);
};

const getCowsByParam = async (param) => {
  return Cow.findAndCountAll(param);
};

const getCowById = async (id) => {
  return Cow.findByPk(id);
};

module.exports = {
  createCow,
  getCowsByParam,
  getCowById,
};
