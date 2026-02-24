"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambah groom_bank_id
    await queryInterface.addColumn("invitations", "groom_bank_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "groom_name_bank",
      references: {
        model: "banks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Tambah bride_bank_id
    await queryInterface.addColumn("invitations", "bride_bank_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "bride_name_bank",
      references: {
        model: "banks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Tambahkan index supaya query JOIN lebih cepat
    await queryInterface.addIndex("invitations", ["groom_bank_id"]);
    await queryInterface.addIndex("invitations", ["bride_bank_id"]);
  },

  async down(queryInterface, Sequelize) {
    // Hapus index dulu
    await queryInterface.removeIndex("invitations", ["groom_bank_id"]);
    await queryInterface.removeIndex("invitations", ["bride_bank_id"]);

    // Hapus kolom
    await queryInterface.removeColumn("invitations", "groom_bank_id");
    await queryInterface.removeColumn("invitations", "bride_bank_id");
  },
};
