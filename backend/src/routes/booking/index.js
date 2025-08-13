import {Router} from "express";
import getAllBookingRoute from "./getAllBookingsRoute.js";
import getBookingRoute from "./getBookingRoute.js";
import createBookingRoute from "./createBookingRoute.js";
import updateBookingRoute from "./updateBookingRoute.js";
import deleteBookingRoute from "./deleteBookingRoute.js";
import getBookedSeatsRoute from "./getBookedSeatsRoute.js";

const router = Router();

router.use('/bookings-list', getAllBookingRoute);
router.use('/booking', getBookingRoute);
router.use('/create-booking', createBookingRoute);
router.use('/update-booking', updateBookingRoute);
router.use('/delete-booking', deleteBookingRoute);
router.use('/booked-seats', getBookedSeatsRoute);


export default router;