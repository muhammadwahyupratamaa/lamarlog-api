import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export const STATUSES = ['APPLIED', 'SCREENING', 'INTERVIEW', 'TECHNICAL_TEST', 'USER_INTERVIEW', 'OFFER', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'];
export const TERMINAL_STATUSES = ['ACCEPTED', 'REJECTED', 'WITHDRAWN'];

class JobApplication extends Model {}
JobApplication.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
  companyName: { type: DataTypes.STRING, allowNull: false, field: 'company_name' }, jobTitle: { type: DataTypes.STRING, allowNull: false, field: 'job_title' }, location: DataTypes.STRING,
  workType: { type: DataTypes.ENUM('WFO', 'WFH', 'HYBRID'), field: 'work_type' }, source: DataTypes.STRING, applicationUrl: { type: DataTypes.TEXT, field: 'application_url' }, appliedAt: { type: DataTypes.DATEONLY, allowNull: false, field: 'applied_at' },
  status: { type: DataTypes.ENUM(...STATUSES), allowNull: false, defaultValue: 'APPLIED' }, salaryRange: { type: DataTypes.STRING, field: 'salary_range' }, contactName: { type: DataTypes.STRING, field: 'contact_name' }, contactEmail: { type: DataTypes.STRING, field: 'contact_email' }, nextFollowUpAt: { type: DataTypes.DATEONLY, field: 'next_follow_up_at' }, notes: DataTypes.TEXT,
}, { sequelize, modelName: 'JobApplication', tableName: 'job_applications', underscored: true });
export default JobApplication;
