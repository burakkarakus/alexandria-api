import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Book extends Model {}

Book.init(
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
    modelName: 'Book',
    timestamps: true,
  }
);