"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TutorManage_1 = __importDefault(require("../../../../Adapters/controllers/TutorManage"));
const tutorRepo_1 = require("../../../../application/repositories/tutorRepo");
const TutorRepImpl_1 = require("../../../database/mongodb/repositories/TutorRepImpl");
const tutorManage = () => {
    const router = express_1.default.Router();
    const controller = (0, TutorManage_1.default)(TutorRepImpl_1.tutorrepoimpl, tutorRepo_1.tutorrepointer);
    router.post('/tutor-form', controller.tutorApply);
    return router;
};
exports.default = tutorManage;
