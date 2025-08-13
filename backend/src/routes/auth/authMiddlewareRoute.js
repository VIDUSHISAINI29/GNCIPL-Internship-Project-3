import express from "express";
import axios from "axios";
import { getUserBookings } from '../../controllers/booking/getUserBookingController.js';
import { verifyToken } from '../../middleware/authMiddleware.js';
const router = express.Router();

router.get('/user', verifyToken, getUserBookings);


export default router;
