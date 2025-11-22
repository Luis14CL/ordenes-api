"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class ModelValidation
 * @extends Validation
 */
class ModelValidation extends validation_1.default {
    /**
     * Creates an instance of ModelValidation.
     * @memberof ModelValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {{ id:string, average_price: number }} body
     * @returns {Joi.ValidationResult<{ id:string, average_price: number}>}
     * @memberof ModelValidation
     */
    update(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
            average_price: Joi.number().required()
        });
        return schema.validate(body);
    }
}
exports.default = new ModelValidation();
//# sourceMappingURL=validation.js.map