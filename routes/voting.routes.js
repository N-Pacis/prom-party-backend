import express from 'express'
import { createVote, getVotesByCoupleId, getVotesByCouples } from '../controllers/voting.controller.js';
import { validateVoting } from '../validators/voting.validator.js';
const router = express.Router()

router.get("/votes/by-couples",getVotesByCouples)

router.get("/votes/couples/:id", getVotesByCoupleId)

router.post("/vote",validateVoting,createVote)

export default router;