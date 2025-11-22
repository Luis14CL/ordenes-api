"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_1 = require("../orders/model");
const validation_1 = require("./validation");
/**
 * @export
 *
 * @implements {IModelService}
 */
const ModelService = {
    /**
     * @param {number} greater
     * @param {number} lower
     * @returns {Promise < IModel[] >}
     * @memberof ModelService
     */
    findAll(greater, lower) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lte = JSON.stringify(lower);
                let results = [];
                const query = `[
                { "$unwind": "$models" }, 
                {
                    "$match":{
                        ${greater !== undefined && lower !== undefined ? `"models.average_price" : {"$gte": ${greater}, "$lte":${lower}}` : ""}
                        ${greater === undefined && lower !== undefined ? `"models.average_price" : {"$lte":${lower}}` : ""}
                        ${greater !== undefined && lower === undefined ? `"models.average_price" : {"$gte": ${greater}}` : ""}
                    }
                },
                { "$replaceRoot": { "newRoot": "$models" } } 

            ]`;
                yield model_1.default.aggregate(JSON.parse(query)).then(docs => {
                    results = docs;
                })
                    .catch(err => {
                    console.error('Error al realizar la consulta:', err);
                });
                ;
                return results;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @param {number} average_price
     * @returns {Promise < IModel >}
     * @memberof ModelService
     */
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.update({ id, average_price: body.average_price });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const result = yield model_1.default.updateOne({
                    'models._id': new mongoose_1.Types.ObjectId(id)
                }, { $set: { 'models.$.average_price': body.average_price } });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = ModelService;
//# sourceMappingURL=service.js.map