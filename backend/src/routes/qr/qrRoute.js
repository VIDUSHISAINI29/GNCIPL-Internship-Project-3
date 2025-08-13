import {Router} from "express";
import { createQrCode } from "../../controllers/qr/qrController.js";

const router = Router();

router.get('/', createQrCode );

export default router;