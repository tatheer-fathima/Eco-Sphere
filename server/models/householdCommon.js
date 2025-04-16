import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const HouseholdCommon = sequelize.define('HouseholdCommon', {
  user_id: DataTypes.STRING,
  electricity_usage: DataTypes.FLOAT,
  water_usage: DataTypes.FLOAT,
  waste_generation: DataTypes.FLOAT,
  gas_cylinder: DataTypes.FLOAT,
}, {
  tableName: 'household_common',
  timestamps: false
});
