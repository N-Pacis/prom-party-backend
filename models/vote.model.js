import mongoose from "mongoose"
const { Schema, model }= mongoose

const voteSchema = new Schema({
    Names:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    coupleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "couple"
    },
    CreatedAt:{
        type:Date,
        default:null
    }
})

export const Vote = model('vote',voteSchema)
