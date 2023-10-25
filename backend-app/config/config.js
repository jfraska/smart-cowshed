require("dotenv").config();

module.exports = {
  DB_USER: process.env.MYSQL_USER,
  DB_PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
  HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ML_PORT: process.env.ML_DOCKER_PORT,
  dialect: "mysql",
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};
