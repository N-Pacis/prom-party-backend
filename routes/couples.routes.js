import express from 'express'
import { createCouple, getAllCouples, getCoupleById } from '../controllers/couple.controller.js';
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';

router.get("/couples",getAllCouples)

router.get("/couples/:id", getCoupleById)

router.post("/couples/new",authenticate,createCouple)

export default router;