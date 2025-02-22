import { User } from './user';
import { Book } from './book';
import { BorrowedBook } from './borrowedBook';

User.hasMany(BorrowedBook, { foreignKey: 'userId' });
BorrowedBook.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(BorrowedBook, { foreignKey: 'bookId' });
BorrowedBook.belongsTo(Book, { foreignKey: 'bookId' });

export { User, Book, BorrowedBook };