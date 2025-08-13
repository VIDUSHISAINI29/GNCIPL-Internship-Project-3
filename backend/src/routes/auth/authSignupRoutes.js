import express from "express";
import axios from "axios";
import {createUserAuth} from "../../controllers/auth/authSignUpController.js"
const router = express.Router();

// SIGNUP — with extra fields
router.post("/signup", createUserAuth);


export default router;
