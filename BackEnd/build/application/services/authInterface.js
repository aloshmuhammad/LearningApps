"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInterface = void 0;
const authInterface = (service) => {
    const bcryptPassword = (password) => service.bcryptPassword(password);
    const generateToken = (Id) => service.generateToken(Id);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    return {
        bcryptPassword,
        generateToken,
        comparePassword
    };
};
exports.authInterface = authInterface;
