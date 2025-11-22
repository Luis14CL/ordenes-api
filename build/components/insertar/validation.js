"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class InsertValidation
 * @extends Validation
 */
class InsertValidation extends validation_1.default {
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
    insert(body) {
        const schema = Joi.object().keys({
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });
        return schema.validate(body);
    }
}
exports.default = new InsertValidation();
//# sourceMappingURL=validation.js.map