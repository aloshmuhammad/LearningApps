"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    Jwt_Secret: process.env.JWT_SECRET,
    Fire_BaseApi: process.env.FIRE_BASEAPI,
    Fire_BaseAuth: process.env.FIRE_BASEAUTH,
    Fire_BaseProjectId: process.env.FIRE_BASEPROJECTID,
    Fire_BaseBucket: process.env.FIRE_BASEBUCKET,
    Fire_BaseMessagingSenderId: process.env.FIRE_BASEMESSAGINGSENDERID,
    Fire_BaseAppId: process.env.FIREBASE_APPID,
    Fire_BaseMeasurementId: process.env.FIREBASEMEASUREMENTID
};
exports.default = configKeys;
