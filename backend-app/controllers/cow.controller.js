const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {
  cowService,
  modelService,
  userService,
  firebaseService,
} = require("../services");
const db = require("../models");
const Op = db.Sequelize.Op;
const { getPagingData } = require("../utils/helper");
const fs = require("fs");
const path = require("path");

const createCow = catchAsync(async (req, res) => {
  let data = req.body;
  data.userId = req.user.id;

  if (!req.files["kaki"] || !req.files["mulut"]) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image is required");
  }

  const imageKaki = req.files["kaki"][0].path;
  const imageMulut = req.files["mulut"][0].path;

  //save filename image in database
  data.kakiImg = req.files["kaki"][0].filename;
  data.mulutImg = req.files["mulut"][0].filename;

  //get predict model
  predictKaki = await modelService.getPredictModel(imageKaki);
  predictMulut = await modelService.getPredictModel(imageMulut);

  if (predictKaki == 0) data.kaki = "sakit";
  else data.kaki = "sehat";

  if (predictMulut == 1) data.mulut = "sakit";
  else data.mulut = "sehat";

  if (data.kaki == "sakit" && data.mulut == "sakit" && data.suhu >= 39.4) {
    data.status = "sakit";
  } else {
    data.status = "sehat";
  }

  //get nearest puskeswan
  nearestPuskeswan = await userService.getPuskeswanByRole(data.lat, data.lng);
  data.puskeswanId = nearestPuskeswan[0].id;

  const cow = await cowService.createCow(data);

  console.log(data.lat, data.lng);

  //push notification to puskeswan
  await firebaseService.sendNotification(
    "notif",
    "ada pasien cuyy",
    data.puskeswanId
  );

  res.status(httpStatus.CREATED).send(cow);
});

const getCows = catchAsync(async (req, res) => {
  const { search, page } = req.query;
  let paramQuerySQL = {
    order: [["createdAt", "DESC"]],
  };
  let limit = 10;
  let offset = 0;

  if (req.user.role === "user") {
    paramQuerySQL.where = { userId: req.user.id };
  } else if (req.user.role === "puskeswan") {
    paramQuerySQL.where = {
      [Op.or]: [{ puskeswanId: req.user.id }, { userId: req.user.id }],
    };
  } else {
    paramQuerySQL.where = {};
  }

  // search by id_sapi
  if (search) {
    paramQuerySQL.where = {
      [Op.and]: [
        paramQuerySQL.where,
        {
          [Op.and]: [
            search.id_sapi
              ? { id_sapi: { [Op.like]: `%${search.id_sapi}%` } }
              : null,
            search.status ? { status: search.status } : null,
          ],
        },
      ],
    };
  }

  // pagination
  if (page) {
    if (page.size) {
      limit = Number(page.size);
      paramQuerySQL.limit = limit;
    }

    if (page.number) {
      offset = Number(page.number) * limit - limit;
      paramQuerySQL.offset = offset;
    }
  } else {
    paramQuerySQL.limit = limit;
    paramQuerySQL.offset = offset;
  }

  let result = await cowService.getCowsByParam(paramQuerySQL);
  result = getPagingData(result, offset, limit);
  res.send(result);
});

const getCow = catchAsync(async (req, res) => {
  const cow = await cowService.getCowById(req.params.cowId);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
  }
  res.send(cow);
});

const deleteCow = catchAsync(async (req, res) => {
  const cow = await cowService.deleteCowById(req.params.cowId);
  const filesToDelete = [cow.kakiImg, cow.mulutImg];

  filesToDelete.forEach((fileName) => {
    const filePath = path.join(__dirname, "../public/upload", fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Gagal menghapus ${fileName}: ${err}`);
      } else {
        console.log(`${fileName} berhasil dihapus.`);
      }
    });
  });

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCow,
  getCows,
  getCow,
  deleteCow,
};
