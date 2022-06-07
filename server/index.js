import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRouts from './routes/posts.js';
import userRoutes from './routes/user.route.js';

const app = express();
dotenv.config()


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouts);
app.use('/user', userRoutes)



const PORT = process.env.PORT

mongoose.connect(process.env.CONNECTIN_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err))


