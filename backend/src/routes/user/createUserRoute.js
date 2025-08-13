import {Router} from "express";
import { createUser } from "../../controllers/user/createUserController.js";

const router = Router();

router.post('/', createUser);

export default router;