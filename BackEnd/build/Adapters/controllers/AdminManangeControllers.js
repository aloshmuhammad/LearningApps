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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminSignin_1 = require("../../application/useCases/Admin/adminSignin");
const adminSignin_2 = require("../../application/useCases/Admin/adminSignin");
const adminSignin_3 = require("../../application/useCases/Admin/adminSignin");
const adminSignin_4 = require("../../application/useCases/Admin/adminSignin");
const adminSignin_5 = require("../../application/useCases/Admin/adminSignin");
const AdminManageController = (adminrepoImplement, adminrepoInter) => {
    const adminMange = adminrepoInter(adminrepoImplement());
    const userList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ListUser = yield (0, adminSignin_2.fullUsers)(adminMange);
        res.json(ListUser);
    }));
    const userBlock = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        yield (0, adminSignin_1.usersBlock)(user, adminMange);
        res.json({ status: true });
    }));
    const tutorsList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ListTutor = yield (0, adminSignin_3.fullTutors)(adminMange);
        console.log(ListTutor, 'mk');
        res.json(ListTutor);
    }));
    const tutorBlock = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body, 'kook');
        const tutor = req.body;
        yield (0, adminSignin_4.tutorsBLock)(tutor, adminMange);
        res.json({ status: true });
    }));
    const courseList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const listCourse = yield (0, adminSignin_5.listCourses)(adminMange);
        res.json(listCourse);
    }));
    return { userList, userBlock, tutorsList, tutorBlock, courseList };
};
exports.default = AdminManageController;
