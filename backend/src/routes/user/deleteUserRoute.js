import {Router} from "express";
import { deleteUser } from "../../controllers/user/deleteUserController.js";

const router = Router();

router.delete('/:id', deleteUser);

export default router;