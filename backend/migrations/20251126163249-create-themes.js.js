"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("themes", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      thumbnail_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      preview_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("themes");
  },
};
