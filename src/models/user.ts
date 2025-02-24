import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);