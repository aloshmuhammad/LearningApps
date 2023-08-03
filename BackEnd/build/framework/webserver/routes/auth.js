"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authcontroller_1 = __importDefault(require("../../../Adapters/controllers/Authcontroller"));
const AuthRepo_1 = require("../../database/mongodb/repositories/AuthRepo");
const authRepo_1 = require("../../../application/repositories/authRepo");
const AuthService_1 = require("../../service/AuthService");
const authInterface_1 = require("../../../application/services/authInterface");
const AdminRepoImpl_1 = require("../../database/mongodb/repositories/AdminRepoImpl");
const adminRepoInter_1 = require("../../../application/repositories/adminRepoInter");
const TutorRepImpl_1 = require("../../database/mongodb/repositories/TutorRepImpl");
const tutorRepo_1 = require("../../../application/repositories/tutorRepo");
const Authreg = () => {
    const router = express_1.default.Router();
    const controller = (0, Authcontroller_1.default)(AuthRepo_1.userRepositoryMongo, authRepo_1.authInter, AuthService_1.authService, authInterface_1.authInterface, adminRepoInter_1.adminRepoInter, AdminRepoImpl_1.adminRepoImpl, TutorRepImpl_1.tutorrepoimpl, tutorRepo_1.tutorrepointer);
    router.post('/usersignup', controller.registerUser);
    router.post('/googlesignup', controller.googlesignup);
    router.post('/userlogin', controller.userLogin);
    router.post('/googleSignin', controller.googleSignin);
    router.post('/admin-login', controller.adminSignin);
    router.post('/tutor-login', controller.tutorSignin);
    return router;
};
exports.default = Authreg;
