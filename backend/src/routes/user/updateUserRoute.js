import {Router} from "express";
import { updateUser } from "../../controllers/user/updateUserController.js";

const router = Router();

router.put('/:id', updateUser);

export default router;