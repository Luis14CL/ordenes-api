"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express = require("express");
const http = require("http");
const insertRouter_1 = require("./insertRouter");
const orderRouter_1 = require("./orderRouter");
/**
 * @export
 * @param {express.Application} app
 */
function init(app) {
    const router = express.Router();
    /**
     * @description
     *  Forwards any requests to the /models URI to our ModelRouter
     * @constructs
     */
    app.use('/insert', insertRouter_1.default);
    /**
     * @description
     *  Forwards any requests to the /models URI to our ModelRouter
     * @constructs
     */
    app.use('/orders', orderRouter_1.default);
    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    /**
     * @constructs all routes
     */
    app.use(router);
}
exports.init = init;
//# sourceMappingURL=index.js.map