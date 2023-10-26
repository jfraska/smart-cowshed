const uuid = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => uuid.v4(),
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM("admin", "user", "puskesmas", "guest"),
      defaultValue: "user",
    },
    no_telp: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.STRING,
    },
    lon: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
