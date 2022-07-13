import express from 'express'
import { createCouple, getAllCouples, getCoupleById, uploadCoupleImage } from '../controllers/couple.controller.js';
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';
import { uploadFile } from "../utils/fileUpload.utils.js";
const upload = uploadFile()

router.get("/couples",getAllCouples)

router.get("/couples/:id", getCoupleById)

router.post("/couples/:id/upload-image",upload.single("coupleImage"), uploadCoupleImage)

router.post("/couples/new",authenticate,createCouple)

export default router;