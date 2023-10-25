const httpStatus = require("http-status");
const db = require("../models");
const Cow = db.cow;
const ApiError = require("../utils/ApiError");

const createCow = async (userBody) => {
  return Cow.create(userBody);
};

const getUserByUsername = async (username) => {
  return User.findOne({ where: { username: username } });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

module.exports = {
  createCow,
  getUserByUsername,
  getUserById,
};
