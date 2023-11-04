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
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      kaki: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      mulut: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      kakiImg: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      mulutImg: {
        type: Sequelize.STRING(255),
        defaultValue: null,
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
      puskeswanId: {
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
