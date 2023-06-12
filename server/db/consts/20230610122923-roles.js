"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "SuperAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
