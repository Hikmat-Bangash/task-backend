// server.js
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ParentRoute from './routes/Parent.route.js';

import morgan from 'morgan'
import childRoute from './routes/Child.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
// MongoDB connection
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database Connected Successfuly.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors())
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/parent', ParentRoute);
app.use("/api/v1/child", childRoute);

app.listen(port, () => {
    console.log(`server is listening at: ${port}`)
  })