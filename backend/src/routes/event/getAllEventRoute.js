import {Router} from "express";
import { getAllEvents } from "../../controllers/event/getAllEventsController.js";

const router = Router();

router.get('/', getAllEvents);

export default router;