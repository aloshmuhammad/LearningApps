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
exports.adminRepoImpl = void 0;
const adminSchema_1 = __importDefault(require("../model/adminSchema"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const tutorSchema_1 = __importDefault(require("../model/tutorSchema"));
const courseSchema_1 = __importDefault(require("../model/courseSchema"));
const adminRepoImpl = () => {
    const findbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield adminSchema_1.default.findOne({ email });
        return admin;
    });
    const findUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.default.find();
        return user;
    });
    const BlockUser = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield userSchema_1.default.updateOne({ _id: userId }, { $set: { status: !status } });
    });
    const findTutors = () => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = yield tutorSchema_1.default.find();
        return tutor;
    });
    const BlockTutor = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield tutorSchema_1.default.updateOne({ _id: userId }, { $set: { status: !status } });
    });
    const findCourse = () => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseSchema_1.default.find({});
        return course;
    });
    return { findbyEmail, findUsers, BlockUser, findTutors, BlockTutor, findCourse };
};
exports.adminRepoImpl = adminRepoImpl;
