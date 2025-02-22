import { Router } from 'express';
import { getUsers, createUser } from '../controllers/userController';
import { borrowBook, getUserWithBorrowedBooks, returnBook } from '../controllers/borrowController';
import { validateRequest } from '../middleware/validateRequest';
import { userIdSchema } from '../validators/userSchema';

const router = Router();

router.get('/', getUsers);
router.get('/:id', validateRequest(userIdSchema), getUserWithBorrowedBooks);
router.post('/', createUser);
router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:bookId', returnBook);

export default router;