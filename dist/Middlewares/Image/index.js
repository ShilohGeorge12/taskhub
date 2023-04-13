"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const index_1 = __importDefault(require("../Error/Custom/index"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/Uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg | jpg | png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(file.originalname.toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        else {
            return cb(new index_1.default('Only jpeg, jpg, png images are allowed!'));
        }
    },
    storage: storage,
});
exports.default = upload;
