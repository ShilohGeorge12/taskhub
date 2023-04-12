"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const index_1 = __importDefault(require("../../Middlewares/Auth/index"));
const index_2 = require("../../Middlewares/Error/index");
const index_3 = __importDefault(require("../../Model/User/index"));
const index_4 = require("../../Validator/index");
const fs_1 = __importDefault(require("fs"));
const userRoutes = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/Uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
userRoutes.get('/admin', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
    // const hash = jwt.sign('', 'shilohgeorge18');
    const admin = await index_3.default.findOne().select('_id username email isLoggin image profilepic ');
    if (admin) {
        res.status(200).json(admin);
    }
}));
userRoutes.post('/editaccount', upload.single('image'), (0, index_2.tryCatch)(async (req, res) => {
    var _a, _b;
    const { error } = (0, index_4.validateUser)(req.body);
    if (error) {
        console.log(error);
        const errArr = [];
        error.details.map(err => errArr.push(err.message));
        res.status(400).json({ error: errArr });
    }
    else {
        const user = await index_3.default.findOne().select('_id username email isLoggin image ');
        if (req.file && user) {
            user.image = {
                data: fs_1.default.readFileSync("dist/Uploads/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)),
                contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            };
            user.username = req.body.username;
            user.email = req.body.email;
            await user.save();
            console.log(req.body);
            res.status(201)
                .json(user);
            // .json({
            //   imageUrl: `data:${req.file.mimetype};base64,${base64String}`,
            // });
        }
    }
}));
// userRoutes.post('/editaccount', upload.single('image'), tryCatch(async(req,res) => {
//   const hash = jwt.sign('', 'shilohgeorge18');
//   console.log( 'file -> ',req.file )
//   const user = await User.create({
//     username: 'Shiloh George',
//     email: 'shilohgeorge2019@gmail.com',
//     pasword: hash,
//     isloggin: false,
//     image: {
//       data: fs.readFileSync( "dist/Uploads/" + req.file?.filename ),
//       contentType: req.file?.mimetype,
//     }
//   })
//   await user.save();
//   res.status(201).json({ message: 'success' });
// }))
userRoutes.put('/login', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
}));
exports.default = userRoutes;
