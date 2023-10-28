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
        lng: "45.678",
        fcmToken: "4nd95jdkf95jaf5",
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
        lng: "56.789",
        fcmToken: "4nd95jdkf953457",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        username: "puskeswan1",
        password: bcrypt.hashSync("puskeswan1"),
        name: "Puskeswan 1",
        no_telp: "9876543210",
        address: "Address 1",
        role: "puskeswan",
        lat: 34.567,
        lng: 56.789,
        fcmToken: "4nd95jdkf95jdnc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        username: "puskeswan2",
        password: bcrypt.hashSync("puskeswan2"),
        name: "Puskeswan 2",
        no_telp: "9876543210",
        address: "Address 2",
        role: "puskeswan",
        lat: 35.567,
        lng: 60.789,
        fcmToken: "n4md94jdrnv8sj4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
