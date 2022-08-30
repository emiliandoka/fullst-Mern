import dotenv from 'dotenv';
dotenv.config();
import express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import getSoftware from './routes/getSoftware.js';

const app = express();
const port = process.env.port || '3002';
const mongoUrl = `mongodb+srv://dashboarddb:${process.env.MONGO_PASS}@cluster0.yhd7ptz.mongodb.net/?retryWrites=true&w=majority`;
app.use((express.json({ limit: "30mb", extended: true})))
app.use((express.urlencoded({ limit: "30mb", extended: true})))
app.use(cors());
app.use('/softwares', getSoftware);


app.get('/', (req, res)=>{
  res.send(process.env.MONGO_USERNAME)
})



app.listen(port, () => {
  mongoose.connect(mongoUrl).then((mongoRes)=>{
  }).catch((errr)=>{
    console.log(errr.message);
  })
})