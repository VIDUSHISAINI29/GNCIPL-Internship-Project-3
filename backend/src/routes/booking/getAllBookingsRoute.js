import {Router} from "express";
import { getAllBookings } from "../../controllers/booking/getAllBookingsController.js";

const router = Router();

router.get('/', getAllBookings);

export default router;