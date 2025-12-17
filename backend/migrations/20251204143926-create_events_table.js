'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Fungsi 'up' digunakan untuk menjalankan migrasi (membuat tabel)
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      // Kolom ID Utama
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      // Kolom Foreign Key ke Tabel Undangan (invitations)
      invitation_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        // Mendefinisikan Foreign Key
        references: {
          model: 'invitations', // Nama tabel induk yang sudah ada
          key: 'id'
        },
        // Aksi yang dilakukan saat undangan induk dihapus (disarankan)
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      // Detail Acara
      type: {
        type: Sequelize.STRING(50), // Contoh nilai: 'Akad', 'Resepsi', 'Tambahan'
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255), // Judul acara, wajib diisi jika type='Tambahan'
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY, // Hanya menyimpan tanggal (YYYY-MM-DD)
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME, // Hanya menyimpan jam (HH:MM:SS)
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME, // Hanya menyimpan jam (HH:MM:SS)
        allowNull: false,
      },

      // Lokasi
      location: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      maps_link: {
        type: Sequelize.TEXT, // Untuk link panjang atau embed map
        allowNull: true,
      },

      // Kolom Waktu Standar (Timestamps)
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};