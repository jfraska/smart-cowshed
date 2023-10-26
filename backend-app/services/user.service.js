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

const getUserByParam = async (param) => {
  return User.findAndCountAll(param);
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.username && (await getUserByUsername(updateBody.username))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  await User.update(updateBody, {
    where: { id: userId },
  });

  return updateBody;
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getUserByParam,
  updateUserById,
};
