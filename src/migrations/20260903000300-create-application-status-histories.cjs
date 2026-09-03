'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('application_status_histories', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      application_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'job_applications', key: 'id' }, onDelete: 'CASCADE' },
      old_status: { type: Sequelize.ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'TECHNICAL_TEST', 'USER_INTERVIEW', 'OFFER', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'), allowNull: true },
      new_status: { type: Sequelize.ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'TECHNICAL_TEST', 'USER_INTERVIEW', 'OFFER', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'), allowNull: false }, note: Sequelize.TEXT,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
    await queryInterface.addIndex('application_status_histories', ['application_id', 'created_at']);
  },
  async down(queryInterface) { await queryInterface.dropTable('application_status_histories'); },
};
