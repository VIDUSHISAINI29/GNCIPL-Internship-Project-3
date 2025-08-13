import {Router} from "express";
import { getUserById } from "../../controllers/user/getUserController.js";

const router = Router();

router.get('/:id', getUserById);

export default router;