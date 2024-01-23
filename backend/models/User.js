import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarURL: String,
}, {timestamps: true,},);
export default mongoose.model('UserModel', UserSchema);