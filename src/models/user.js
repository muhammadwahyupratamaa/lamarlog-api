import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class User extends Model {
  safe() { const { passwordHash, ...user } = this.toJSON(); return user; }
}

User.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, set(value) { this.setDataValue('email', value.toLowerCase()); } },
  passwordHash: { type: DataTypes.STRING, allowNull: false, field: 'password_hash' },
}, { sequelize, modelName: 'User', tableName: 'users', underscored: true });

export default User;
