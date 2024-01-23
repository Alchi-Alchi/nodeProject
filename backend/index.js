import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import {checkAuth, handleValidationErrors} from "./utils/utils.js";
import {postCreateValidation, validator, registerValidator} from "./validations/auth.js";
import {UserController, PostController} from "./controllers/controllers.js";
const db = 'mongodb+srv://Pavel:ThIsAdMiN@atlascluster.kei9u77.mongodb.net/dataBlog?retryWrites=true&w=majority';
mongoose
.connect(db)
.then((res) => console.log('Connected to DB'))
.catch((error) => console.log(error));
const app = express();
const storage = multer.diskStorage({
    destination: (_, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage});
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.post('/auth/login', validator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.createPost);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getPost);
app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.updatePost);

app.listen(4400, (err) => {
    if (err) {
        return console.log(err)
    };
    console.log('Server OK');
});