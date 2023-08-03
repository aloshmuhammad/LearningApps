"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const express_2 = __importDefault(require("./framework/webserver/express"));
const server_1 = __importDefault(require("./framework/webserver/server"));
const connection_1 = __importDefault(require("./framework/database/mongodb/connection"));
const routes_1 = __importDefault(require("./framework/webserver/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
(0, express_2.default)(app);
//connect db
(0, connection_1.default)();
(0, routes_1.default)(app);
(0, server_1.default)(server).startServer();
