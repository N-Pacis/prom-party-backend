import { config } from 'dotenv';
config({path:'./.env'});

export default function (req, res, next){
    if(!req.header('Authorization')) return res.status(401).send("Access Denied! You are not authorized")
    const token = req.header('Authorization').trim()
    if(!token || token != process.env.AUTHORIZATION_KEY) return res.status(401).send("Access Denied! You are not authorized")
    try{
        next()
    }
    catch(ex){  
        res.status(400).send("Invalid Key")
    }
}