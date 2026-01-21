'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('events', 'created_at', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('events', 'updated_at', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('events', 'created_at', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
    });

    await queryInterface.changeColumn('events', 'updated_at', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
    });
  }
};
