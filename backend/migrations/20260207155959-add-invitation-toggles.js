"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("invitations", "show_groom_parent", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "show_bride_parent", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "same_date", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "same_date_add", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "show_extra_event", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn("invitations", "custom_music", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "show_bank", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "use_story", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "show_logo", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "cover_mobile", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("invitations", "cover_desktop", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("invitations", "show_groom_parent");
    await queryInterface.removeColumn("invitations", "show_bride_parent");
    await queryInterface.removeColumn("invitations", "same_date");
    await queryInterface.removeColumn("invitations", "same_date_add");
    await queryInterface.removeColumn("invitations", "show_extra_event");
    await queryInterface.removeColumn("invitations", "custom_music");
    await queryInterface.removeColumn("invitations", "show_bank");
    await queryInterface.removeColumn("invitations", "use_story");
    await queryInterface.removeColumn("invitations", "show_logo");
    await queryInterface.removeColumn("invitations", "cover_mobile");
    await queryInterface.removeColumn("invitations", "cover_desktop");
  },
};
