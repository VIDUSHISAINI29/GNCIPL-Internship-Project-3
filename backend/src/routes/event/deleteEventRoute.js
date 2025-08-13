import {Router} from "express";
import { deleteEvent } from "../../controllers/event/deleteEventController.js";

const router = Router();

router.delete('/:id', deleteEvent);

export default router;