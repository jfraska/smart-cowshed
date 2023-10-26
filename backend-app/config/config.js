require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",

    server_port: process.env.PORT,
    ml_port: process.env.ML_PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
      accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",

    server_port: process.env.PORT,
    ml_port: process.env.ML_PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
      accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    },
  },
};
