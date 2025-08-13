import {Router} from "express";
import getAllEventRoute from "./getAllEventRoute.js";
import getEventRoute from "./getEventRoute.js";
import createEventRoute from "./createEventRoute.js";
import updateEventRoute from "./updateEventRoute.js";
import deleteEventRoute from "./deleteEventRoute.js";

const router = Router();

router.use('/events-list', getAllEventRoute);
router.use('/event', getEventRoute);
router.use('/create-event', createEventRoute);
router.use('/update-event', updateEventRoute);
router.use('/delete-event', deleteEventRoute);


export default router;