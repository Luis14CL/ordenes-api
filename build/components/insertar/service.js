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
const validation_1 = require("./validation");
const service_1 = require("../getData/service");
const env_1 = require("../../config/env");
/**
 * @export
 *
 * @implements {IInsertService}
 */
const InsertService = {
    /**
     * @param {number} greater
     * @param {number} lower
     * @returns {Promise < String >}
     * @memberof InsertService
     */
    insert(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.insert({ limit, offset });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const token = yield service_1.default.getToken("YXBpX2NsaWVudDpTZWN1cmVQYXNzMjAyNCE=");
                console.log(token);
                setTimeout(() => {
                }, 1500);
                const data = yield service_1.default.getData(limit, offset, token);
                data.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                    const queryOrders = `INSERT INTO orders.orders(id_venta, fecha, plataforma, total, estado, detalle)
                VALUES ('${item.id_venta}', '${item.fecha}', '${item.plataforma}', '${item.total}', '${item.estado}', '${item.detalle[0].id_detalle}')`;
                    console.log(queryOrders);
                    const queryDetalle = `INSERT INTO orders.detalle(id_detalle, sku, cantidad, precio_unitario, subtotal, producto) 
                VALUES ('${item.detalle[0].id_detalle}', '${item.detalle[0].sku}', ${item.detalle[0].cantidad}, '${item.detalle[0].precio_unitario}', ${item.detalle[0].subtotal}, '0')`;
                    yield env_1.pool.query(queryDetalle);
                    yield env_1.pool.query(queryOrders);
                }));
                return "success";
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = InsertService;
//# sourceMappingURL=service.js.map