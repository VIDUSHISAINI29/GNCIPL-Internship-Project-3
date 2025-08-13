import {Router} from "express";
import { createBooking } from "../../controllers/booking/createBookingController.js";

const router = Router();

router.post('/', createBooking);

export default router;