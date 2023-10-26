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
    suhu: {
      type: Sequelize.DOUBLE,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  Cow.associate = function (models) {
    Cow.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    });
  };

  return Cow;
};
