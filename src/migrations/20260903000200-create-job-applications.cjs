'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_applications', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      user_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      company_name: { type: Sequelize.STRING, allowNull: false }, job_title: { type: Sequelize.STRING, allowNull: false }, location: Sequelize.STRING,
      work_type: { type: Sequelize.ENUM('WFO', 'WFH', 'HYBRID'), allowNull: true }, source: Sequelize.STRING, application_url: Sequelize.TEXT,
      applied_at: { type: Sequelize.DATEONLY, allowNull: false },
      status: { type: Sequelize.ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'TECHNICAL_TEST', 'USER_INTERVIEW', 'OFFER', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'), allowNull: false, defaultValue: 'APPLIED' },
      salary_range: Sequelize.STRING, contact_name: Sequelize.STRING, contact_email: Sequelize.STRING, next_follow_up_at: Sequelize.DATEONLY, notes: Sequelize.TEXT,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }, updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
    await queryInterface.addIndex('job_applications', ['user_id', 'updated_at']);
  },
  async down(queryInterface) { await queryInterface.dropTable('job_applications'); },
};
