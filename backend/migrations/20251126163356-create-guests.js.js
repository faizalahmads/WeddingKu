"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("guests", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      name: { type: Sequelize.STRING(100) },
      type: { type: Sequelize.STRING(50) },
      category: { type: Sequelize.STRING(50) },

      code: {
        type: Sequelize.STRING(20),
        unique: true,
      },

      admin_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      invitation_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      is_checked_in: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      checked_in_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Tambah INDEX dulu
    await queryInterface.addIndex("guests", ["invitation_id"], {
      name: "fk_guest_invitation_v2",
    });

    await queryInterface.addIndex("guests", ["admin_id"], {
      name: "fk_admin",
    });

    // Tambah Foreign Key
    await queryInterface.addConstraint("guests", {
      fields: ["admin_id"],
      type: "foreign key",
      name: "fk_admin", // sama seperti di DB
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "SET NULL",
    });

    // tambahan constraint kedua pada admin (sama dengan table asli kamu)
    await queryInterface.addConstraint("guests", {
      fields: ["admin_id"],
      type: "foreign key",
      name: "fk_guests_admin",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("guests", {
      fields: ["invitation_id"],
      type: "foreign key",
      name: "fk_guest_invitation_v2",
      references: {
        table: "invitations",
        field: "id",
      },
      onDelete: "CASCADE",
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("guests");
  },
};