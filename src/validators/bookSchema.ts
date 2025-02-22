import { generateJoiSchema } from './schemaGenerator';
import { Book } from '../models/book';
import Joi from 'joi';

export const createBookSchema = generateJoiSchema(Book);

export const bookIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

