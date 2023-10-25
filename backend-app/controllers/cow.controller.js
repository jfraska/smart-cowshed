// const db = require("../models");
// const axios = require("axios");
// const FormData = require("form-data");
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const Cow = db.cow;
// const Op = db.Sequelize.Op;

// // Pagenation data
// const getPagingData = (datas, page, limit) => {
//   const { count: totalItems, rows: data } = datas;
//   const currentPage = page ? +page : 0;
//   const totalPages = Math.ceil(totalItems / limit);

//   return { data, meta: { totalItems, totalPages, currentPage } };
// };

// // Create and Save a new Cow
// exports.create = async (req, res) => {
//   // Validate request
//   if (!req.body.id_sapi) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }

//   try {
//     let status, statusKaki, statusMulut;

//     // Data yang akan di prediksi menggunakan model
//     const imageKaki = req.files[0].buffer;
//     const imageMulut = req.files[1].buffer;

//     const image1 = new FormData();
//     image1.append("file", imageKaki, { filename: "kaki.jpg" });

//     const response1 = await axios.post(
//       `http://ml_app:${config.ml_port}/predict`,
//       image1,
//       {
//         headers: {
//           ...image1.getHeaders(),
//         },
//       }
//     );

//     const image2 = new FormData();
//     image2.append("file", imageMulut, { filename: "mulut.jpg" });

//     const response2 = await axios.post(
//       `http://ml_app:${config.ml_port}/predict`,
//       image2,
//       {
//         headers: {
//           ...image2.getHeaders(),
//         },
//       }
//     );

//     if (response1.data.prediction == 0) statusKaki = "Sakit";
//     // else if (response1.data.prediction == 1) statusKaki = "Sehat";
//     else statusKaki = "Sehat";

//     if (response2.data.prediction == 2) statusMulut = "Sakit";
//     // else if (response2.data.prediction == 3) statusMulut = "Sehat";
//     else statusMulut = "Sehat";

//     console.log(req.body.suhu, statusKaki, statusMulut);

//     if (
//       statusKaki == "Tidak teridentifikasi" ||
//       statusMulut == "Tidak teridentifikasi"
//     ) {
//       res.send({
//         id_sapi: req.body.id_sapi,
//         userId: req.user.id,
//         mulut: statusMulut,
//         kaki: statusKaki,
//         status: "Tidak teridentifikasi",
//         suhu: req.body.suhu,
//       });
//     } else {
//       if (
//         response1.data.prediction == 0 &&
//         response2.data.prediction == 2 &&
//         req.body.suhu >= 39.4
//       ) {
//         status = "Sakit";
//       } else {
//         status = "Sehat";
//       }

//       // Create a Cow
//       const cow = {
//         id_sapi: req.body.id_sapi,
//         userId: req.user.id,
//         mulut: statusMulut,
//         kaki: statusKaki,
//         status: status,
//         suhu: req.body.suhu,
//       };

//       // Save Cow in the database
//       const createdCow = await Cow.create(cow);

//       res.send(createdCow);
//     }
//   } catch (error) {
//     console.error("Terjadi kesalahan:", error);
//     res.status(500).json({
//       message: error.message || "Some error occurred while creating the Cow.",
//     });
//   }
// };

// // Retrieve all Cows from the database.
// exports.findAll = (req, res) => {
//   Cow.findAll()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving Cows.",
//       });
//     });
// };

// // Retrieve all Cows from the database.
// exports.findAllByUserId = (req, res) => {
//   const id = req.user.id;
//   const { search, page } = req.query;
//   const paramQuerySQL = {
//     where: { userId: id },
//     order: [["createdAt", "DESC"]],
//   };
//   let limit = 10;
//   let offset = 0;

//   // searching by id_sapi
//   if (search) {
//     paramQuerySQL.where = {
//       [Op.and]: [
//         { userId: id },
//         {
//           [Op.and]: [
//             search.id_sapi
//               ? { id_sapi: { [Op.like]: `%${search.id_sapi}%` } }
//               : null,
//             search.status ? { status: search.status } : null,
//           ],
//         },
//       ],
//     };
//   }

//   // pagination
//   if (page) {
//     if (page.size) {
//       limit = Number(page.size);
//       paramQuerySQL.limit = limit;
//     }

//     if (page.number) {
//       offset = Number(page.number) * limit - limit;
//       paramQuerySQL.offset = offset;
//     }
//   } else {
//     paramQuerySQL.limit = limit;
//     paramQuerySQL.offset = offset;
//   }

//   Cow.findAndCountAll(paramQuerySQL)
//     .then((data) => {
//       const response = getPagingData(data, offset, limit);
//       res.send(response);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving Cows.",
//       });
//     });
// };

// // Find a single Cow with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Cow.findByPk(id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Cow with id=" + id,
//       });
//     });
// };

// // Update a Cow by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Cow.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Cow was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Cow with id=${id}. Maybe Cow was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Cow with id=" + id,
//       });
//     });
// };

// // Delete a Cow with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Cow.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Cow was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Cow with id=${id}. Maybe Cow was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Cow with id=" + id,
//       });
//     });
// };

const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { cowService, modelService } = require("../services");

const createCow = catchAsync(async (req, res) => {
  let data = req.body;

  // Data yang akan di prediksi menggunakan model
  const imageKaki = req.files[0].buffer;
  const imageMulut = req.files[1].buffer;

  predictKaki = await modelService.getPredictModel(imageKaki);
  predictMulut = await modelService.getPredictModel(imageMulut);

  if (predictKaki == 0) data.kaki = "sakit";
  else data.kaki = "sehat";

  if (predictMulut == 2) data.mulut = "sakit";
  else data.mulut = "sehat";

  if (data.kaki == "sakit" && data.mulut == "sakit" && data.suhu >= 39.4) {
    data.status = "sakit";
  } else {
    data.status = "sehat";
  }

  const cow = await cowService.createCow(data);
  res.status(httpStatus.CREATED).send(cow);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCow,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
