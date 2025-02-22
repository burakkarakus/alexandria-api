import { Request, Response } from 'express';
import { BorrowedBook } from '../models/borrowedBook';
import { User } from '../models/user';
import { Book } from '../models/book';
import { ValidationError } from 'sequelize';

export const borrowBook = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const bookId = parseInt(req.params.bookId);

        if (isNaN(userId) || isNaN(bookId)) {
            return res.status(400).json({ message: 'Invalid userId or bookId' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const existingBorrow = await BorrowedBook.findOne({ where: { bookId, returnedAt: null } });
        if (existingBorrow) return res.status(400).json({ message: 'Book is already borrowed' });

        const borrowedBook = await BorrowedBook.create({ userId, bookId, borrowedAt: new Date() });
        res.status(201).json(borrowedBook);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map((err) => err.message),
            });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const returnBook = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const bookId = parseInt(req.params.bookId);
        const { score } = req.body;

        if (isNaN(userId) || isNaN(bookId)) {
            return res.status(400).json({ message: 'Invalid userId or bookId' });
        }

        const borrowedBook = await BorrowedBook.findOne({ where: { userId, bookId, returnedAt: null } });
        if (!borrowedBook) return res.status(404).json({ message: 'Borrowed record not found' });

        await borrowedBook.update({ returnedAt: new Date(), score });
        
        res.json({ message: 'Book returned successfully', borrowedBook });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map((err) => err.message),
            });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUserWithBorrowedBooks = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const borrowedBooks = await BorrowedBook.findAll({
            where: { userId },
            include: [
                {
                    model: Book,
                    attributes: ['id', 'name'],
                }
            ],
        });

        res.json({ user, borrowedBooks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
