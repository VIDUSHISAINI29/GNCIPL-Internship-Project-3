import {Router} from "express";
import getAllUserRoute from "./getAllUserRoute.js";
import getUserRoute from "./getUserRoute.js";
import createUserRoute from "./createUserRoute.js";
import updateUserRoute from "./updateUserRoute.js";
import deleteUserRoute from "./deleteUserRoute.js";
const router = Router();

router.use('/users-list', getAllUserRoute);
router.use('/user', getUserRoute);
router.use('/create-user', createUserRoute);
router.use('/update-user', updateUserRoute);
router.use('/delete-user', deleteUserRoute);

export default router;