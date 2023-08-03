"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true]
    },
    Description: {
        type: String,
        required: [true]
    },
    price: {
        type: Number,
        required: [true]
    },
    titleImageUrl: {
        type: String
    },
    courseVideo: {
        type: String
    }
});
const Course = (0, mongoose_1.model)('course', courseSchema);
exports.default = Course;
