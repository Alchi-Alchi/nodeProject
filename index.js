import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import {validator} from "./validations/auth.js";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
const db = 'mongodb+srv://Pavel:ThIsAdMiN@atlascluster.kei9u77.mongodb.net/localServer?retryWrites=true&w=majority';
mongoose
.connect(db)
.then((res) => console.log('Connected to DB'))
.catch((error) => console.log(error));
const app = express();
app.use(express.json());
app.post('/auth', validator, async (req, res) => {
    try {
        const errors = validationResult(req);
        !errors.isEmpty() ? res.status(400).json(errors.array()) : res.json({success: true,});
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const doc = new UserModel({
            login: req.body.login,
            passwordHash,
        });
        const user = await doc.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
});
app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    };
    console.log('OK');
});