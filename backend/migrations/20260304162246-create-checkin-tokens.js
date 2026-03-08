"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("checkin_tokens", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      invitation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      expired_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("checkin_tokens");
  },
};
