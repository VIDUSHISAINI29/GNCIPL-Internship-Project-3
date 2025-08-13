import {Router} from "express";
import { updateBooking } from "../../controllers/booking/updateBookingController.js";

const router = Router();

router.put('/:id', updateBooking);

export default router;