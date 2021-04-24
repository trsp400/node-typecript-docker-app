import { Router } from "express";
import { sessionsRoutes } from "./sessions.routes";

import { usersRoutes } from "./users.routes";
import { addressesRoutes } from "./addresses.routes";
import { healthRoutes } from "./health.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/addresses", addressesRoutes);
router.use("/health", healthRoutes);
router.use("/sessions", sessionsRoutes);

export default router;
