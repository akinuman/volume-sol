import { Router } from "express";
import buyRoutes from "./buyRoutes.js";

const router = Router();

router.use("/buy", buyRoutes);

export default router;
