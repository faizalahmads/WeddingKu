'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invitation_stories", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      invitation_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "invitations",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      image_path: {
        type: Sequelize.STRING(255)
      },
      sort_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        )
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("invitation_stories");
  }
};
