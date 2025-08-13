import {Router} from "express";
import { createEvent } from "../../controllers/event/createEventController.js";

const router = Router();

router.post('/', createEvent);

export default router;