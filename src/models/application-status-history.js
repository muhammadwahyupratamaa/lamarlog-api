import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { STATUSES } from './job-application.js';

class ApplicationStatusHistory extends Model {}
ApplicationStatusHistory.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, applicationId: { type: DataTypes.UUID, allowNull: false, field: 'application_id' },
  oldStatus: { type: DataTypes.ENUM(...STATUSES), field: 'old_status' }, newStatus: { type: DataTypes.ENUM(...STATUSES), allowNull: false, field: 'new_status' }, note: DataTypes.TEXT,
}, { sequelize, modelName: 'ApplicationStatusHistory', tableName: 'application_status_histories', underscored: true, updatedAt: false });
export default ApplicationStatusHistory;
