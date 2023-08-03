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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCourses = exports.tutorsBLock = exports.fullTutors = exports.usersBlock = exports.fullUsers = exports.adminReg = void 0;
const adminReg = (Admin, Repository, AuthService) => __awaiter(void 0, void 0, void 0, function* () {
    const IsadminExist = yield Repository.findbyEmail(Admin.email);
    console.log(IsadminExist, 'existed');
    if (!IsadminExist)
        return { status: false };
    const adPass = IsadminExist.password;
    if (adPass === Admin.password) {
        const token = yield AuthService.generateToken(IsadminExist._id.toString());
        return {
            token, status: true
        };
    }
    else
        return { password: false };
});
exports.adminReg = adminReg;
const fullUsers = (Repository) => __awaiter(void 0, void 0, void 0, function* () {
    const Users = yield Repository.findUsers();
    return {
        Users
    };
});
exports.fullUsers = fullUsers;
const usersBlock = (user, Repository) => __awaiter(void 0, void 0, void 0, function* () {
    yield Repository.BlockUser(user.userId, user.status);
});
exports.usersBlock = usersBlock;
const fullTutors = (Repository) => __awaiter(void 0, void 0, void 0, function* () {
    const tutors = yield Repository.findTutors();
    return { tutors };
});
exports.fullTutors = fullTutors;
const tutorsBLock = (tutor, Repository) => __awaiter(void 0, void 0, void 0, function* () {
    yield Repository.BlockTutor(tutor.userId, tutor.status);
});
exports.tutorsBLock = tutorsBLock;
const listCourses = (Repository) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Repository.findCourse();
    return { course };
});
exports.listCourses = listCourses;
