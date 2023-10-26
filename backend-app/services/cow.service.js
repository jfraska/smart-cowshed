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

const deleteCowById = async (cowId) => {
  const cow = await getCowById(cowId);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, "cow not found");
  }

  await Cow.destroy({
    where: { id: cowId },
  });

  return cow;
};

module.exports = {
  createCow,
  getCowsByParam,
  getCowById,
  deleteCowById,
};
