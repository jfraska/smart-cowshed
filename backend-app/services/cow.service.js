const httpStatus = require("http-status");
const db = require("../models");
const Cow = db.cow;
const User = db.user;
const ApiError = require("../utils/ApiError");

const createCow = async (userBody) => {
  return Cow.create(userBody);
};

const getCowsByParam = async (param) => {
  return Cow.findAndCountAll({
    ...param,
    attributes: ["id", "id_sapi", "status"],
  });
};

const getCowById = async (id) => {
  return Cow.findByPk(id, {
    attributes: [
      "id",
      "id_sapi",
      "status",
      "kaki",
      "mulut",
      "suhu",
      "status_suhu",
      "status",
      "kakiImg",
      "mulutImg",
      "createdAt",
    ],
    include: [
      {
        model: User,
        as: "puskeswan",
        attributes: ["id", "name", "no_telp", "address"],
      },
      {
        model: User,
        as: "owner",
        attributes: ["id", "address", "no_telp", "lat", "lng"],
      },
    ],
  });
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
