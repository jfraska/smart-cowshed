const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const getPagingData = require("../utils/helper");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const { search, page } = req.query;
  let paramQuerySQL = {
    order: [["createdAt", "DESC"]],
  };
  let limit = 10;
  let offset = 0;

  // // searching
  // if (search) {
  //   paramQuerySQL.where = {
  //     [Op.and]: [
  //       paramQuerySQL.where,
  //       {
  //         [Op.and]: [
  //           search.id_sapi
  //             ? { id_sapi: { [Op.like]: `%${search.id_sapi}%` } }
  //             : null,
  //           search.status ? { status: search.status } : null,
  //         ],
  //       },
  //     ],
  //   };
  // }

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

  let result = await userService.getUserByParam(paramQuerySQL);
  result = getPagingData(result, offset, limit);
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
  const user = await userService.updateUserById(req.user.id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
