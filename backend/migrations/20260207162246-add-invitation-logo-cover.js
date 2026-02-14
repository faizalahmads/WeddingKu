'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('invitations', 'logo_img', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'bride_img'
    });

    await queryInterface.addColumn('invitations', 'cover_mobile_img', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'logo_img'
    });

    await queryInterface.addColumn('invitations', 'cover_desktop_img', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'cover_mobile_img'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('invitations', 'cover_desktop_img');
    await queryInterface.removeColumn('invitations', 'cover_mobile_img');
    await queryInterface.removeColumn('invitations', 'logo_img');
  }
};