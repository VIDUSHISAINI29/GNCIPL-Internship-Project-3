import {Router} from "express";
import authSignupRoute from "./authSignupRoutes.js"
import authLoginRoute from "./authLoginRoute.js"
import authMiddlewareRoute from "./authMiddlewareRoute.js"
import authRoute from "./auth.js"
const router = Router();

router.use('/auth', authSignupRoute)
router.use('/auth', authLoginRoute)
router.use('/', authRoute)
router.use('/bookings', authMiddlewareRoute)

export default router;