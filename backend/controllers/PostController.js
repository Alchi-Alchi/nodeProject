import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get posts',
        });
    }
};

export const getPost = async (req, res) => {
    try {
        const postID = req.params.id;
        PostModel.findOneAndUpdate({
            _id: postID,
        }, {
            $ink: {viewsCount: 1},
        }, {
            returnDocument: 'after',
        },
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Post not found',
                });
            }
            res.json(doc);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get post',
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageURL: req.body.imageURL,
            tags: req.body.tags,
            user: req.userID,
        });
        const post = await doc.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to add post',
        });
    }
};

export const removePost = async (req, res) => {
    try {
        const postID = req.params.id;
        await PostModel.findOneAndDelete({
            _id: postID,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Post not found',
                });
            }
        });
        res.json({message: 'Success',});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postID = req.params.id;
        await PostModel.updateOne({_id: postID,}, {
            title: req.body.title,
            text: req.body.text,
            imageURL: req.body.imageURL,
            tags: req.body.tags,
            user: req.userID,
        });
        res.json({message: 'Data updated',});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
};