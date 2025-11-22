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
const axios_1 = require("axios");
/**
 * @export
 *
 * @implements {IInsertService}
 */
const InsertService = {
    getData(limit, offset, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://pruebas-api-l4yu.onrender.com/api/orders?limit=${limit}&offset=${offset}`;
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const orders = yield axios_1.default.get(url, config);
                console.log('Órdenes:', orders.data);
                if (orders) {
                    const data = (yield orders).data.data;
                    return data;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    getToken(autenticacion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('https://pruebas-api-l4yu.onrender.com/api/auth/token', {}, {
                    auth: {
                        username: 'api_client',
                        password: 'SecurePass2024!'
                    }
                });
                const token = response.data.data.access_token;
                console.log('Token:', token);
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = InsertService;
//# sourceMappingURL=service.js.map