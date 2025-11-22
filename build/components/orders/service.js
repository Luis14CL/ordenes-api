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
const env_1 = require("../../config/env");
/**
 * @export
 *
 * @implements {IOrderModelService}
 */
const InsertService = {
    getData(limit, offset, plataforma, id_venta, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filtros = [];
                if (plataforma)
                    filtros.push(`o.plataforma = '${plataforma}'`);
                if (id_venta)
                    filtros.push(`o.id_venta = '${id_venta}'`);
                if (startDate)
                    filtros.push(`o.fecha >= '${startDate}'`);
                if (endDate)
                    filtros.push(`o.fecha <= '${endDate}'`);
                const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
                const query = `SELECT 
            o.id_venta,
            o.fecha,
            o.plataforma,
            o.total,
            o.estado,
            jsonb_build_object(
                'id_detalle', d.id_detalle,
                'sku', d.sku,
                'cantidad', d.cantidad,
                'precio_unitario', d.precio_unitario,
                'subtotal', d.subtotal,
                'producto', d.producto
            ) AS detalle
            FROM orders.orders o 
            INNER JOIN orders.detalle d ON o.detalle = d.id_detalle
            ${where}
            ORDER BY o.id_venta DESC
            LIMIT ${limit}
            OFFSET ${offset};`;
                const response = yield env_1.pool.query(query);
                const totalQuery = `SELECT 
                COUNT(*) AS total_registros
            FROM orders.orders o
            INNER JOIN orders.detalle d ON o.detalle = d.id_detalle
            ${where};`;
                const totalResponse = yield env_1.pool.query(totalQuery);
                return [response.rows, totalResponse.rows[0].total_registros];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = InsertService;
//# sourceMappingURL=service.js.map