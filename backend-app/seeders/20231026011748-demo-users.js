"use strict";

const bcrypt = require("bcryptjs");
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("users", [
      {
        id: uuid.v4(),
        username: "user",
        password: bcrypt.hashSync("password1"),
        name: "User",
        no_telp: "1234567890",
        address: "Address 1",
        role: "user",
        lat: "12.345",
        lon: "45.678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        username: "admin",
        password: bcrypt.hashSync("password2"),
        name: "Admin",
        no_telp: "9876543210",
        address: "Address 2",
        role: "admin",
        lat: "34.567",
        lon: "56.789",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan data pengguna lainnya sesuai kebutuhan
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
