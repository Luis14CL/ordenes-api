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
exports.exportData = exports.get = void 0;
const service_1 = require("./service");
const error_1 = require("../../config/error");
const XLSX = require("xlsx");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, offset, plataforma, id_venta, startDate, endDate } = req.body;
            const [orders, total] = yield service_1.default.getData(limit, offset, plataforma ? plataforma : '', id_venta ? id_venta : '', startDate ? startDate : '', endDate ? endDate : '');
            res.status(200).json({
                message: "ok",
                orders,
                total
            });
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.get = get;
function exportData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, offset, plataforma, id_venta, startDate, endDate } = req.body;
            const [orders, total] = yield service_1.default.getData(limit, offset, plataforma ? plataforma : '', id_venta ? id_venta : '', startDate ? startDate : '', endDate ? endDate : '');
            const worksheet = XLSX.utils.json_to_sheet(orders);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Orders Data");
            const fileBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
            res.setHeader('Content-Disposition', 'attachment; filename=orders_data.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.status(200).send(fileBuffer);
        }
        catch (error) {
            console.error("Error exporting data:", error);
            res.status(500).json({ message: "Error generating the Excel file.", error: error.message });
        }
    });
}
exports.exportData = exportData;
//# sourceMappingURL=index.js.map