"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Rename table
    await queryInterface.renameTable("events", "invitation_events");

    // 2️⃣ Remove unused columns
    await queryInterface.removeColumn("invitation_events", "title");
    await queryInterface.removeColumn("invitation_events", "date");
    await queryInterface.removeColumn("invitation_events", "location");
    await queryInterface.removeColumn("invitation_events", "maps_link");
  },

  async down(queryInterface, Sequelize) {
    // 1️⃣ Add columns back (rollback support)
    await queryInterface.addColumn("invitation_events", "title", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("invitation_events", "date", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("invitation_events", "location", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("invitation_events", "maps_link", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // 2️⃣ Rename table back
    await queryInterface.renameTable("invitation_events", "event");
  },
};
