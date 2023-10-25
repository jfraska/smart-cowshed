module.exports = (sequelize, Sequelize) => {
  const Cow = sequelize.define("cow", {
    id_sapi: {
      type: Sequelize.STRING,
    },
    kaki: {
      type: Sequelize.STRING,
    },
    mulut: {
      type: Sequelize.STRING,
    },
    suhu: {
      type: Sequelize.DOUBLE
    },
    status: {
      type: Sequelize.STRING
    },
  });

  Cow.associate = function(models) {
    Cow.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    })
  }

  return Cow;
};