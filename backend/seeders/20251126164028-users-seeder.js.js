"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Faizal Ahmad",
        email: "faizal@example.com",
        password:
          "$2b$10$ctkEF660QuWXDTFw8TVOmOIy5Ah9jU0.yhSzI8XblGYiojEPizZni",
        invitation_id: null,
        role: "super_admin",
        created_at: new Date("2025-10-05 10:13:54"),
      },
      {
        id: 2,
        name: "Test",
        email: "test@gmail.com",
        password:
          "$2b$10$CSJV9r4EePPksMKyrQIzx.lYTuBVFxLY6v8K7AMHBKOUit2YP9g6G",
        invitation_id: 3,
        role: "admin",
        created_at: new Date("2025-10-05 10:16:06"),
      },
      {
        id: 3,
        name: "admin",
        email: "admin@gmail.com",
        password:
          "$2b$10$CRyf0qi6V/oIfAOV0ygh2.fl6fZ0YzjwYbhqACXtwfpVCGo4KJW6S",
        invitation_id: 1,
        role: "admin",
        created_at: new Date("2025-10-05 10:21:43"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
