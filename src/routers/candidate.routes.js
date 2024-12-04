import { Router } from "express";
import { createCandidate } from "../controllers/candidate.controler.js";

const router = Router()


// routers handler
router.route('/create').post(createCandidate)

export default router