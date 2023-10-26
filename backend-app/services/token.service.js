const jwt = require("jsonwebtoken");
const moment = require("moment");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(user.id, accessTokenExpires, "access");

  // const refreshTokenExpires = moment().add(
  //   config.jwt.refreshExpirationDays,
  //   "days"
  // );
  // const refreshToken = generateToken(
  //   user.id,
  //   refreshTokenExpires,
  //   tokenTypes.REFRESH
  // );
  // await saveToken(
  //   refreshToken,
  //   user.id,
  //   refreshTokenExpires,
  //   tokenTypes.REFRESH
  // );

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
    // refresh: {
    //   token: refreshToken,
    //   expires: refreshTokenExpires.toDate(),
    // },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
