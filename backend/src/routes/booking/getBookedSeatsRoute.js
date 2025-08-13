// routes/booking.js
import { Router } from "express";
import { getBookedSeats } from "../../controllers/booking/getBookedSeatsController.js";
const router = Router();

router.get("/:eventId", getBookedSeats);

export default router;
