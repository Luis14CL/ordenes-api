"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
/**
 * @constant {express.Router}
 */
const router = (0, express_1.Router)();
router.post('/', components_1.InsertComponent.insert);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=insertRouter.js.map