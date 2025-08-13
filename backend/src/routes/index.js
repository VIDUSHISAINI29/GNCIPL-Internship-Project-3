import {Router} from "express";
import userRoutes from './user/index.js'
import eventRoutes from './event/index.js'
import bookingRoutes from './booking/index.js'
import authRoutes from "./auth/index.js"
import qrRoutes from "./qr/index.js"

const router = Router();

router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', eventRoutes);
router.use('/', bookingRoutes);
router.use('/', qrRoutes);

export default router;