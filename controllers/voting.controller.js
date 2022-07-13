import { Couple } from "../models/couple.model.js";
import lodash from "lodash"
import { Vote } from "../models/vote.model.js";
const {
    pick
} = lodash

export async function getVotesByCouples(req, res) {
    try {
        let couples = await Couple.find()
        var votesArr = []
        for(let i=0;i<couples.length;i++){
            let votes = await Vote.find({coupleId: couples[i]._id})
            votesArr.push({
                couple: couples[i],
                votesCount: votes.length 
            })
        }
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: votesArr
        })
    } catch (ex) {
        res.status(400).send({
            status: 400,
            message: ex.message
        }
)
    }
}


export async function getVotesByCoupleId(req, res) {
    try {
        let couple = await Couple.findById(req.params.id)
        if(!couple) return res.status(404).send({
            message: "Couple not found",
            status: 404
        })

        let votes = await Vote.find({coupleId: req.params.id})
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: {
                couple,
                votesCount: votes.length
            }
        })
    } catch (ex) {
        res.status(400).send({
            status: 400,
            message: ex.message
        }
)
    }
}

export const createVote = async (req, res) => {
    try {
        let {Names, Email, coupleId} = pick(req.body, [
            'Names',
            'Email',
            'coupleId'
        ])
        
        let couple = await Couple.findById(coupleId)
        if(!couple) return res.status(404).send({
            message: "Couple not found",
            status: 404
        })

        let findVoteByEmail = await Vote.findOne({Email})
        if(findVoteByEmail) return res.status(400).send({
            message: "You have already voted"
        })

        let findVoteByNames = await Vote.findOne({Names})
        if(findVoteByNames) return res.status(400).send({
            message: "You have already voted"
        })

        let vote = new Vote({
            Names,
            Email,
            coupleId
        })
        const time = new Date();

        vote.CreatedAt = time

        let result = await vote.save()
        return res.json({
            message: "Vote registered successfully",
            status: 201,
            data: result
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: "An error occured, try again",
            status: 500,
            error: error
        })
    }
}
