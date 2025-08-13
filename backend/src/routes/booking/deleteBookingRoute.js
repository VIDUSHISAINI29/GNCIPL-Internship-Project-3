import {Router} from "express";
import { deleteBooking } from "../../controllers/booking/deleteBookingController.js";

const router = Router();

router.delete('/:id', deleteBooking);

export default router;