import express from 'express';

import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();
//bitno..http://localhost:5000/posts za sve 
//post
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)



export default router;


