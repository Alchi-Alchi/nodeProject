import AddUserModel from "../models/AddUser.js";

export const createUser = async (req, res) => {
    try {
        const doc = new AddUserModel({
            login: req.body.login,
            password: req.body.password,
            user: req.userID,
        });
        const thisUser = await doc.save();
        res.json(thisUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to add user',
        });
    }
};