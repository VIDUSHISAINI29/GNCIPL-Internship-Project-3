import {Router} from "express";
import { updateEvent } from "../../controllers/event/updateEventController.js";

const router = Router();

router.put('/:id', updateEvent);

export default router;