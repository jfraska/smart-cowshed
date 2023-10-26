"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      name: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      no_telp: {
        type: Sequelize.STRING(20),
        defaultValue: null,
      },
      address: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      username: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      role: {
        type: Sequelize.ENUM("admin", "user", "puskewan"),
        defaultValue: "user",
      },
      lat: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      lon: {
        type: Sequelize.STRING(50),
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
