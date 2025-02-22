import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';
import { Book } from './book';

export class BorrowedBook extends Model {}

BorrowedBook.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id',
      },
    },
    borrowedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BorrowedBook',
    timestamps: true,
  }
);