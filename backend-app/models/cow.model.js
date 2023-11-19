const uuid = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const Cow = sequelize.define("cow", {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => uuid.v4(),
      primaryKey: true,
    },
    id_sapi: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    kaki: {
      type: Sequelize.STRING,
    },
    mulut: {
      type: Sequelize.STRING,
    },
    kakiImg: {
      type: Sequelize.STRING,
    },
    mulutImg: {
      type: Sequelize.STRING,
    },
    suhu: {
      type: Sequelize.FLOAT,
    },
    status_suhu: {
      type: Sequelize.FLOAT,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  Cow.associate = function (models) {
    Cow.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "owner",
    });

    Cow.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "puskeswanId",
      as: "puskeswan",
    });
  };

  return Cow;
};
