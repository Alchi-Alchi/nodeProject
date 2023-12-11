import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/chekAuth.js";
import {addUser, validator} from "./validations/auth.js";
import * as UserController from "./controllers/UserController.js";
import * as AddUsersController from "./controllers/AddUsersController.js";

const db = 'mongodb+srv://Pavel:ThIsAdMiN@atlascluster.kei9u77.mongodb.net/localServer?retryWrites=true&w=majority';
mongoose
.connect(db)
.then((res) => console.log('Connected to DB'))
.catch((error) => console.log(error));
const app = express();
app.use(express.json());

app.post('/auth/login', validator, UserController.login);
//app.get('/users', AddUserController.get);
app.post('/adminPage', checkAuth, addUser, AddUsersController.createUser);
//app.delete('/users', AddUserController.remove);
//app.patch('/users', AddUserController.update);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    };
    console.log('Server OK');
});