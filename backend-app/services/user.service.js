const httpStatus = require("http-status");
const db = require("../models");
const User = db.user;
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");

const createUser = async (userBody) => {
  if (await User.findOne({ where: { username: userBody.username } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  userBody.password = bcrypt.hashSync(userBody.password);
  return User.create(userBody);
};

const getPuskeswanbyRole = async (userLat, userLng) => {
  const puskewan = await User.findAll({
    where: {
      role: "puskeswan",
    },
    attributes: [
      "id",
      "lat",
      "lng",
      [
        Sequelize.fn(
          "SQRT",
          Sequelize.literal(
            `POW(69.1 * (lat - ${userLat}), 2) + POW(69.1 * (${userLng} - lng) * COS(lat / 57.3), 2)`
          )
        ),
        "distance",
      ],
    ],
    order: Sequelize.col("distance"),
  });

  if (!puskewan) {
    throw new ApiError(httpStatus.NOT_FOUND, "Puskeswan not found");
  }

  return puskewan;
};

const getUserByUsername = async (username) => {
  return User.findOne({ where: { username: username } });
};

const getUserById = async (id) => {
  return User.findByPk(id, {
    attributes: [
      "id",
      "username",
      "name",
      "role",
      "no_telp",
      "address",
      "lat",
      "lng",
    ],
  });
};

const getUserByParam = async (param) => {
  return User.findAndCountAll({
    ...param,
    attributes: ["id", "username", "name", "role", "no_telp", "address"],
  });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
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
  getPuskeswanbyRole,
};
