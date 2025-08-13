import {Router} from "express";
import { getEventById } from "../../controllers/event/getEventController.js";

const router = Router();

router.get('/:id', getEventById);

export default router;