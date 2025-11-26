"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("guests", [
      {
        id: 1,
        name: "Mauala",
        type: "CPW",
        category: "Reguler",
        code: "WDK-1FBDBF62",
        admin_id: 2,
        invitation_id: 1,
        created_at: new Date("2025-11-04 23:04:14"),
        is_checked_in: 0,
        checked_in_at: null,
      },
      {
        id: 2,
        name: "Endri Kodir",
        type: "CPW",
        category: "VIP",
        code: "WDK-1FBC868E",
        admin_id: 2,
        invitation_id: 1,
        created_at: new Date("2025-11-04 23:04:14"),
        is_checked_in: 0,
        checked_in_at: null,
      },
      {
        id: 3,
        name: "Cobra Mindah",
        type: "CPP",
        category: "VIP",
        code: "WDK-1F718374",
        admin_id: 2,
        invitation_id: 1,
        created_at: new Date("2025-11-04 23:04:14"),
        is_checked_in: 0,
        checked_in_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("guests", null, {});
  },
};
