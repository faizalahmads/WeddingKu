"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("invitations", [
      {
        id: 1,
        code: "ODA171",
        unique_code: "MI3FG6RL",
        theme_id: 2,
        admin_id: 2,
        couple_name: "Caca & Faizal",
        groom_img: "/uploads/1763401131598-groom_img.jpg",
        groom_name: "Faizal",
        groom_parent:
          "Anak ke-2 Putra dari Bapak Kardjamai dan Ibu Gustia",
        groom_sosmed: "faizal_a.s",
        groom_bank: null,
        groom_norek: null,
        bride_img: "/uploads/1763401131655-bride_img.jpg",
        bride_name: "Caca",
        bride_parent:
          "Anak ke-1 Putri dari Bapak Suwada dan Ibu Suharti",
        bride_sosmed: "nrlalvinn_",
        bride_bank: null,
        bride_norek: null,
        akad_date: null,
        resepsi_date: null,
        wedding_date: "1362-05-12",
        location: "Semoga hadir yawww",
        addition_location: null,
        maps_link: "teatae",
        addition_maps: null,
        gallery_images: null,
        deskripsi_cover: null,
        deskripsi_kasih: null,
        closing_img: null,
        closing_deskripsi: null,
        couple_img: null,
        created_at: new Date("2025-11-18 00:37:20"),
        updated_at: new Date("2025-11-26 23:15:28"),
        current_step: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("invitations", null, {});
  },
};
