import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import {connectDb} from "./config/db.js";
import Routes from './routes/index.js'
dotenv.config();
const app = express();

const PORT = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL, // React app URL (adjust if different)
  credentials: true,  // if you want to send cookies or auth headers
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(Routes);


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
})