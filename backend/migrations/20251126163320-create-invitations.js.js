"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invitations", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      code: {
        type: Sequelize.STRING(10),
        allowNull: true,
        unique: true,
      },

      unique_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },

      theme_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },

      admin_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },

      couple_name: Sequelize.STRING(150),

      groom_img: Sequelize.STRING(255),
      groom_name: Sequelize.STRING(100),
      groom_parent: Sequelize.STRING(255),
      groom_sosmed: Sequelize.STRING(255),
      groom_bank: Sequelize.STRING(100),
      groom_norek: Sequelize.STRING(100),

      bride_img: Sequelize.STRING(255),
      bride_name: Sequelize.STRING(100),
      bride_parent: Sequelize.STRING(255),
      bride_sosmed: Sequelize.STRING(255),
      bride_bank: Sequelize.STRING(100),
      bride_norek: Sequelize.STRING(100),

      akad_date: Sequelize.DATEONLY,
      wedding_date: Sequelize.DATEONLY,
      addition_date: Sequelize.DATEONLY,

      location: Sequelize.STRING(255),
      addition_location: Sequelize.STRING(255),
      maps_link: Sequelize.STRING(255),
      addition_maps: Sequelize.STRING(255),

      gallery_images: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      deskripsi_cover: Sequelize.TEXT,
      deskripsi_kasih: Sequelize.TEXT,

      closing_img: Sequelize.STRING(255),
      closing_deskripsi: Sequelize.TEXT,

      couple_img: Sequelize.STRING(255),

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },

      current_step: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("invitations");
  },
};
