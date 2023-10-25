module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM("admin", "user", "puskesmas", "guest"),
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
