"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true]
    },
    name: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    course: {
        type: String,
        required: [true]
    },
    status: {
        type: Boolean,
        required: [true]
    }
});
const Tutor = (0, mongoose_1.model)('tutor', tutorSchema);
exports.default = Tutor;
