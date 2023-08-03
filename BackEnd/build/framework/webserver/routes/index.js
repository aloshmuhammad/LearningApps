"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const adminMange_1 = __importDefault(require("./Admin/adminMange"));
const tutorManage_1 = __importDefault(require("./tutor/tutorManage"));
const routes = (app) => {
    app.use('/auth', (0, auth_1.default)());
    app.use('/admin', (0, adminMange_1.default)());
    app.use('/tutor', (0, tutorManage_1.default)());
};
exports.default = routes;
