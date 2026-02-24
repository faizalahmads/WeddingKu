"use strict";

const bankList = [
  "Bank BCA",
  "Bank Mandiri",
  "Bank BNI",
  "Bank BRI",
  "Bank BTN",
  "Bank CIMB Niaga",
  "Bank Danamon",
  "Bank Permata",
  "Bank Panin",
  "Bank Mega",
  "Bank OCBC NISP",
  "Bank Sinarmas",
  "Bank BJB",
  "Bank Jatim",
  "Bank Jateng",
  "Bank Nagari",
  "Bank Jakarta",
  "Bank Papua",
  "Bank Muamalat",
  "Bank Syariah Indonesia (BSI)",
  "Jenius (BTPN)",
  "Bank Jago",
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const banks = bankList.map((bank) => {
      const slug = bank.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");

      return {
        name: bank,
        logo: `/uploads/banks/${slug}.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("banks", banks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("banks", {
      name: bankList,
    });
  },
};
