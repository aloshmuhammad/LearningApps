"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminManangeControllers_1 = __importDefault(require("../../../../Adapters/controllers/AdminManangeControllers"));
const AdminRepoImpl_1 = require("../../../database/mongodb/repositories/AdminRepoImpl");
const adminRepoInter_1 = require("../../../../application/repositories/adminRepoInter");
const adminManage = () => {
    const router = express_1.default.Router();
    const controller = (0, AdminManangeControllers_1.default)(AdminRepoImpl_1.adminRepoImpl, adminRepoInter_1.adminRepoInter);
    router.get('/users-list', controller.userList);
    router.post('/block-unblock', controller.userBlock);
    router.get('/tutors-list', controller.tutorsList);
    router.post('/tutor-block', controller.tutorBlock);
    router.get('/course-list', controller.courseList);
    return router;
};
exports.default = adminManage;
