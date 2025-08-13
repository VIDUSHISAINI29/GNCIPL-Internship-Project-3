import {Router} from "express";
import { getBookingById } from "../../controllers/booking/getBookingController.js";

const router = Router();

router.get('/:id', getBookingById);

export default router;