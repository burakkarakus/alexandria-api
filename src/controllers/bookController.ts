import { Request, Response } from 'express';
import { Book } from '../models/book';
import { BorrowedBook } from '../models/borrowedBook';
import { Sequelize } from 'sequelize';
import redis from '../config/redis';

export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.findAll();
    res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
    try {
        const bookId = parseInt(req.params.id);
        if (isNaN(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        // "Book viewing should be
        // considered as a process much more frequent than borrowing and returning."
        const cachedBook = await redis.get(`bookCache:${bookId}`);
        if (cachedBook) {
            res.setHeader('X-Cache-Status', 'H');
            return res.json(JSON.parse(cachedBook));
        }

        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const ratingResult: any = await BorrowedBook.findOne({
            where: { bookId },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('score')), 'averageScore']],
            raw: true,
        });

        const averageScore = ratingResult?.averageScore ? parseFloat(ratingResult?.averageScore) : null;

        const bookData = book.toJSON();
        bookData.averageScore = averageScore;
        await redis.set(`bookCache:${bookId}`, JSON.stringify(bookData), 'EX', 300);
        res.setHeader('X-Cache-Status', 'M');
        res.json(bookData);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createBook = async (req: Request, res: Response) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
};