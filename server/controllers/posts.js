import mongoose from 'mongoose';
import PostMessage from "../models/PostMessage.js";

export const getPosts = async (req, res) => {
    const {page}=req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) *LIMIT;
        const total = await PostMessage.countDocuments({});
        const post = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: post, currentPage: Number(page), numberOfPage: Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createPost = async (req, res) => {
    const post = req.body;
    // const { title, message, selectedFile, creator, tags } = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
//example posts/:id , is posts/123 
export const updatePost = async (req, res) => {
    const { id } = req.params; //{id} becomes /:id
    const { creator, title, message, tags, selectedFile } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id!")
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id }
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with that id: ${id}`)
    await PostMessage.findByIdAndRemove(id);
    return res.json({ message: 'Post deleted successfully!' })
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    //req.userId -- access from middlewere
    if (!req.userId) return res.json({ message: 'Unauthenticated!' })

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with that id: ${id}`)
    const post = await PostMessage.findById(id);
    //for like
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}