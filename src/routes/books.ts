import { Router } from 'express';
import { createBook, getBook, getBooks } from '../controllers/bookController';
import { validateRequest } from '../middleware/validateRequest';
import { bookIdSchema, createBookSchema } from '../validators/bookSchema';

const router = Router();

router.get('/', getBooks);
router.get('/:id', validateRequest(bookIdSchema), getBook);
router.post('/', validateRequest(createBookSchema), createBook);

export default router;