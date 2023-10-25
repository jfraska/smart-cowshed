const httpStatus = require("http-status");
const db = require("../models");
const User = db.user;
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

const createUser = async (userBody) => {
  if (await User.findOne({ where: { username: userBody.username } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  userBody.password = bcrypt.hashSync(userBody.password);
  return User.create(userBody);
};

const getUserByUsername = async (username) => {
  return User.findOne({ where: { username: username } });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};
