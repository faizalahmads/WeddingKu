"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      invitation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      role: {
        type: Sequelize.ENUM("super_admin", "admin"),
        defaultValue: "admin",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
