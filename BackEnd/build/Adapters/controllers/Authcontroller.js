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
const userSignup_1 = require("../../application/useCases/User/userSignup");
const userSignup_2 = require("../../application/useCases/User/userSignup");
const userSignup_3 = require("../../application/useCases/User/userSignup");
const userSignup_4 = require("../../application/useCases/User/userSignup");
const adminSignin_1 = require("../../application/useCases/Admin/adminSignin");
const tutorAuth_1 = require("../../application/useCases/tutor/tutorAuth");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Authcontroller = (authImplement, authInterface, authServiceImpl, authServiceInterface, adminRepoInter, adminRepoImpl, tutorrepimpl, tutorrepointer) => {
    const Authdb = authInterface(authImplement());
    const Authserv = authServiceInterface(authServiceImpl());
    const AuthadDb = adminRepoInter(adminRepoImpl());
    const AuthtutorDb = tutorrepointer(tutorrepimpl());
    const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const user = req.body;
        const userToken = yield (0, userSignup_1.userSignup)(user, Authdb, Authserv);
        console.log(userToken, 'lava');
        res.json({ status: 'success',
            message: 'new user registered',
            userToken
        });
    }));
    const googlesignup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userG = req.body;
        const userGoogle = yield (0, userSignup_2.userGgle)(userG, Authdb, Authserv);
        console.log(userGoogle, 'ggleey');
        res.json({ status: 'success',
            message: 'new user registered',
            userGoogle
        });
    }));
    const userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userVlid = req.body;
        const validUser = yield (0, userSignup_3.userCheck)(userVlid, Authdb, Authserv);
        res.json(validUser);
    }));
    const googleSignin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const usergSign = req.body;
        const googleUser = yield (0, userSignup_4.userGgleSign)(usergSign, Authdb, Authserv);
        console.log(googleUser, 'usses');
        res.json(googleUser);
    }));
    const adminSignin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AdminCred = req.body;
        const Admin = yield (0, adminSignin_1.adminReg)(AdminCred, AuthadDb, Authserv);
        res.json(Admin);
    }));
    const tutorSignin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = req.body;
        const tutors = yield (0, tutorAuth_1.tutorLogin)(tutor, AuthtutorDb, Authserv);
        res.json(tutors);
    }));
    return {
        registerUser,
        googlesignup,
        userLogin,
        googleSignin,
        adminSignin,
        tutorSignin
    };
};
exports.default = Authcontroller;
