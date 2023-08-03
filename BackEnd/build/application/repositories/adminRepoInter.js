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
exports.adminRepoInter = void 0;
const adminRepoInter = (repositories) => {
    const findbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repositories.findbyEmail(email.toString()); });
    const findUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repositories.findUsers(); });
    const BlockUser = (userId, status) => __awaiter(void 0, void 0, void 0, function* () { return yield repositories.BlockUser(userId, status); });
    const findTutors = () => __awaiter(void 0, void 0, void 0, function* () { return yield repositories.findTutors(); });
    const BlockTutor = (userId, status) => __awaiter(void 0, void 0, void 0, function* () { return yield repositories.BlockTutor(userId, status); });
    const findCourse = () => __awaiter(void 0, void 0, void 0, function* () { return yield repositories.findCourse(); });
    return {
        findbyEmail,
        findUsers,
        BlockUser,
        findTutors,
        BlockTutor,
        findCourse
    };
};
exports.adminRepoInter = adminRepoInter;
