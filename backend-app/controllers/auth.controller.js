const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const access = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, access });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(
    username,
    password
  );
  const access = await tokenService.generateAuthTokens(user);
  res.send({ user, access });
});

const authCek = catchAsync(async (req, res) => {
  res.send(req.user);
});

module.exports = {
  register,
  login,
  authCek,
};
