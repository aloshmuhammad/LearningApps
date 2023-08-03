"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'please add a firstName']
    },
    lastName: {
        type: String,
    },
    phoneNo: {
        type: Number,
    },
    email: {
        type: String,
        required: [true, 'please add the email']
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    google: {
        type: Boolean
    },
    status: {
        type: Boolean
    }
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
