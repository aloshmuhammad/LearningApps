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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const tutorManageController = (tutorrepoImplement, tutorrepointer) => {
    const tutorMange = tutorrepointer(tutorrepoImplement());
    const tutorApply = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body, 'lo');
        if (!req.files || !req.files.certificate) {
            res.status(400).json({ error: 'No file uploaded' });
        }
        const file = req.files.certificate;
        console.log(file, 'po');
        //   console.log(file,'lok')
        aws_sdk_1.default.config.update({
            accessKeyId: 'AKIAZR6MB54QRMD5GXUB',
            secretAccessKey: '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'
        });
        const s3 = new aws_sdk_1.default.S3({ params: { Bucket: 'aloshlearn' } });
        const uploadFileToS3 = (fileData) => {
            const params = {
                Bucket: 'learnxproject',
                Key: `uploads/${fileData.name}`,
                Body: fileData.data,
                ContentType: fileData.mimetype,
            };
            return new Promise((resolve, reject) => {
                s3.upload(params, (err, data) => {
                    if (err) {
                        console.log(`Error uploading file: ${err}`);
                        reject(err);
                    }
                    else {
                        console.log(`File uploaded successfully. File location: ${data.Location}`);
                        resolve(data.Location);
                    }
                });
            });
        };
        try {
            const s3FileLocation = yield uploadFileToS3(file);
            console.log('S3 File Location:', s3FileLocation);
            // res.status(200).json({ message: 'File uploaded successfully' });
        }
        catch (error) {
            console.log('Error uploading file:', error);
            res.status(500).json({ error: 'Error uploading file to S3' });
        }
    }));
    return { tutorApply };
};
exports.default = tutorManageController;
