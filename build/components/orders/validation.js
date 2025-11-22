"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class BrandValidation
 * @extends Validation
 */
class BrandValidation extends validation_1.default {
    /**
     * Creates an instance of BrandValidation.
     * @memberof BrandValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IBrandModel} params
     * @returns {Joi.ValidationResult}
     * @memberof BrandValidation
     */
    createBrand(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required()
        });
        return schema.validate(params);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof BrandValidation
     */
    getModels(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });
        return schema.validate(body);
    }
    /**
     * @param {IModel} params
     * @returns {Joi.ValidationResult}
     * @memberof BrandValidation
     */
    createModel(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            average_price: Joi.number().required()
        });
        return schema.validate(params);
    }
}
exports.default = new BrandValidation();
//# sourceMappingURL=validation.js.map