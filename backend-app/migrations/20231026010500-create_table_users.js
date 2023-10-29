"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
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
      role: {
        type: Sequelize.ENUM("admin", "user", "puskeswan"),
        defaultValue: "user",
      },
      fcmToken: {
        type: Sequelize.STRING(255),
      },
      profileImg: {
        type: Sequelize.STRING(255),
        defaultValue: "default-profile.png",
      },
      lat: {
        type: Sequelize.DOUBLE,
        defaultValue: null,
      },
      lng: {
        type: Sequelize.DOUBLE,
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
