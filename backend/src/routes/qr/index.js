import {Router} from "express";
import qrRoute from "./qrRoute.js";

const router = Router();

router.use('/qr', qrRoute);


export default router;