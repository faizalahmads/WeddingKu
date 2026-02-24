"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("invitations", "detail_location", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "location", // supaya posisinya setelah location (MySQL only)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("invitations", "detail_location");
  },
};
