import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js'

//connect to DataBase MongoDb

const connection_URL = 'mongodb+srv://javasriptMemories:U267558uuaz@cluster0.xw14lxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const PORT = process.env.PORT || 5000;

mongoose.connect(connection_URL) 
    .then(() => app.listen(PORT, () => console.log(`Server running on port :${PORT}`)))
    .catch((error) => console.log(error.message)); 


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts',postRoutes)


