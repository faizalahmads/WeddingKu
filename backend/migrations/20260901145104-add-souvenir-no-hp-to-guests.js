"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("guests", "souvenir", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    await queryInterface.addColumn("guests", "no_hp", {
      type: Sequelize.STRING(20),
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("guests", "souvenir");
    await queryInterface.removeColumn("guests", "no_hp");
  },
};
