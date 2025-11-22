"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "u7mvtiohu528cj",
    host: "ccu6unqr99fgui.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com",
    database: "d9uivpsf9069at",
    password: "pf4e1cc23e74c8b45d037fc8485b02b7f2a5ea8b18216778142365f09d63e1a50",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});
//# sourceMappingURL=index.js.map