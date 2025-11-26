"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("themes", [
      {
        id: 1,
        name: "Pisang",
        thumbnail_url: "classic-theme-thumb.jpg",
        preview_url: "classic-theme-preview.jpg",
        description:
          "Tampilan undangan elegan dengan warna lembut dan layout klasik.",
      },
      {
        id: 2,
        name: "Flower Pastel",
        thumbnail_url: "classic-theme-thumb.jpg",
        preview_url: "classic-theme-preview.jpg",
        description:
          "Tampilan undangan elegan dengan warna lembut dan layout klasik.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("themes", null, {});
  },
};
