"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("guests", "rsvp_status", {
      type: Sequelize.STRING(20),
      allowNull: true,
    });

    await queryInterface.addColumn("guests", "rsvp_guest_count", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    });

    await queryInterface.addColumn("guests", "rsvp_message", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("guests", "rsvp_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("guests", "rsvp_at");
    await queryInterface.removeColumn("guests", "rsvp_message");
    await queryInterface.removeColumn("guests", "rsvp_guest_count");
    await queryInterface.removeColumn("guests", "rsvp_status");
  },
};
