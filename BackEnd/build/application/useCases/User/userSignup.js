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
exports.userGgleSign = exports.userCheck = exports.userGgle = exports.userSignup = void 0;
const userSignup = (user, userRepository, authServiceInterface) => __awaiter(void 0, void 0, void 0, function* () {
    const Isemailexist = yield userRepository.findbyEmail(user.email);
    if (Isemailexist)
        return { status: false };
    user.password = yield authServiceInterface.bcryptPassword(user.password);
    const { _id: userId } = yield userRepository.addUser(user);
    const token = yield authServiceInterface.generateToken(userId.toString());
    const validUser = yield userRepository.findbyEmail(user.email);
    console.log(validUser);
    console.log(token, 'tkn');
    return { token, validUser };
});
exports.userSignup = userSignup;
const userGgle = (userG, userRepository, authServiceInterface) => __awaiter(void 0, void 0, void 0, function* () {
    const Isemailexist = yield userRepository.findbyEmail(userG.email);
    if (Isemailexist)
        return { status: false };
    const { _id: userId } = yield userRepository.addUserG(userG);
    const token = yield authServiceInterface.generateToken(userId.toString());
    const validUser = yield userRepository.findbyEmail(userG.email);
    console.log(token, 'tkn');
    return { token, validUser };
});
exports.userGgle = userGgle;
const userCheck = (userVlid, userRepository, authServiceInterface) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findbyEmail(userVlid.email);
    if (!user)
        return { status: false };
    if (user.google)
        return { google: true };
    if (user.status)
        return { blocked: true };
    const isPasswordCorrect = yield authServiceInterface.comparePassword(userVlid.password, user.password.toString());
    if (!isPasswordCorrect) {
        return { password: false };
    }
    else {
        const token = yield authServiceInterface.generateToken(user._id.toString());
        return { token, user };
    }
});
exports.userCheck = userCheck;
const userGgleSign = (usergSign, userRepository, authServiceInterface) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(usergSign, 'ss');
    const user = yield userRepository.findbyEmail(usergSign.email);
    if (user) {
        const token = yield authServiceInterface.generateToken(user._id.toString());
        return { status: true, user, token };
    }
});
exports.userGgleSign = userGgleSign;
