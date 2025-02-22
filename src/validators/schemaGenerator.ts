import Joi from 'joi';
import { Model, ModelStatic, DataTypes } from 'sequelize';

/**
 * Generate Joi schema from Sequelize model definition
 * Ensures strict typing using `ModelStatic<Model>`
 */
export function generateJoiSchema<T extends Model>(model: ModelStatic<T>): Joi.ObjectSchema {
    const schema: any = {};
    const attributes = model.getAttributes();

    for (const key in attributes) {
        if (key === 'createdAt' || key === 'updatedAt') {
            continue;
        }

        const field = attributes[key];

        if (field.allowNull === false) {
            schema[key] = Joi.required();
        }

        if (field.type instanceof DataTypes.STRING) {
            let min = 0;
            let max = 255;

            if (field.validate?.len) {
                if (Array.isArray(field.validate.len)) {
                    min = field.validate.len[0] || 0;
                    max = field.validate.len[1] || 255;
                } else if (typeof field.validate.len === 'object' && 'args' in field.validate.len) {
                    min = field.validate.len.args[0] || 0;
                    max = field.validate.len.args[1] || 255;
                }
            }

            schema[key] = Joi.string().min(min).max(max);
        }

        if (field.type instanceof DataTypes.INTEGER) {
            schema[key] = Joi.number().integer().min(1);
        }

        if (field.type instanceof DataTypes.FLOAT) {
            schema[key] = Joi.number().precision(2);
        }
    }

    return Joi.object(schema);
}
