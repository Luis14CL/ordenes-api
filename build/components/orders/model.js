"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
const ModelSchema = new mongoose_1.Schema({
    name: String,
    average_price: Number,
});
exports.Model = (0, mongoose_1.model)('Model', ModelSchema);
const BrandSchema = new mongoose_1.Schema({
    name: String,
    average_price: {
        type: Number,
        default: 0
    },
    models: [{ type: ModelSchema, ref: exports.Model }]
}, {
    collection: 'brands',
    versionKey: false,
});
exports.default = connections.db.model('BrandModel', BrandSchema);
//# sourceMappingURL=model.js.map