"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambah groom_name_bank
    await queryInterface.addColumn("invitations", "groom_name_bank", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "groom_norek", // posisi setelah groom_norek (MySQL only)
    });

    // Tambah bride_name_bank
    await queryInterface.addColumn("invitations", "bride_name_bank", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "bride_norek", // posisi setelah bride_norek (MySQL only)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("invitations", "groom_name_bank");
    await queryInterface.removeColumn("invitations", "bride_name_bank");
  },
};
