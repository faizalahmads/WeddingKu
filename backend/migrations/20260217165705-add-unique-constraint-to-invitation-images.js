"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("invitation_images", {
      fields: ["invitation_id", "image_path"],
      type: "unique",
      name: "unique_invitation_image",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "invitation_images",
      "unique_invitation_image",
    );
  },
};
