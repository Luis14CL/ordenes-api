import * as Joi from 'joi';
import Validation from '../validation';

/**
 * @export
 * @class InsertValidation
 * @extends Validation
 */
class InsertValidation extends Validation {
    /**
     * Creates an instance of InsertValidation.
     * @memberof InsertValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {{ id:string, average_price: number }} body
     * @returns {Joi.ValidationResult<{ id:string, average_price: number}>}
     * @memberof InsertValidation
     */
    insert(
        body: {
            limit: number,
            offset: number
        },
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });

        return schema.validate(body);
    }
}

export default new InsertValidation();
