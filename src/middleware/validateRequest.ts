import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema, type: 'body' | 'params' = 'body') => {
    return (req: Request, res: Response, next: NextFunction) => {
            req.params = Object.keys(req.params).reduce((acc, key) => {
                const value = req.params[key];
                acc[key] = isNaN(Number(value)) ? value : Number.parseInt(value);
                return acc;
            }, {} as any);

        const { error } = schema.validate(req.params, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error.",
                errors: error.details.map((detail) => detail.message),
            });
        }
        next();
    };
};
