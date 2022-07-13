import mongoose from "mongoose"
const { Schema, model }= mongoose

const coupleSchema = new Schema({
    BoyName:{
        type:String,
        required:true
    },
    GirlName:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:null
    }
})

export const Couple = model('couple',coupleSchema)
