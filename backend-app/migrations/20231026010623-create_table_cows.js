"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cows", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_sapi: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      suhu: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.STRING(255),
      },
      kaki: {
        type: Sequelize.STRING(50),
      },
      mulut: {
        type: Sequelize.STRING(50),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cows");
  },
};
