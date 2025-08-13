import express from "express";
import axios from "axios";
import {loginUserAuth} from "../../controllers/auth/authLoginController.js"
const router = express.Router();

// LOGIN — get access token
router.post("/login", loginUserAuth);

export default router;
