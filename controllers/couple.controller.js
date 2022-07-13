import { Couple } from "../models/couple.model.js";
import lodash from "lodash"
const {
    pick
} = lodash
import cloudinary from "../utils/cloudinary.js";

export async function getAllCouples(req, res) {
    try {
        let couples = await Couple.find()

        return res.status(200).send({
            status: 200,
            message: "ok",
            data: couples
        })
    } catch (ex) {
        res.status(400).send({
            status: 400,
            message: ex.message
        }
        )
    }
}

export async function getCoupleById(req, res) {
    try {
        let couple = await Couple.findById(req.params.id)
        if (!couple) return res.status(404).send({
            message: "Couple not found",
            status: 404
        })
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: couple
        })
    } catch (ex) {
        res.status(400).send({
            status: 400,
            message: ex.message
        }
        )
    }
}

export const uploadCoupleImage = async (req, res) => {
    var coupleImage
    var secure_url;
    var cloudinaryId;
    var docInfo = await cloudinary.uploader.upload(req.file.path)
    secure_url = docInfo.secure_url
    cloudinaryId = docInfo.public_id
    coupleImage = {
        imageUrl: secure_url,
        imageCloudinaryId: cloudinaryId
    }

    try {
        let result = await Couple.findByIdAndUpdate(req.params.id, {
            coupleImage
        })
        if (result) return res.json({ message: "successfully uploaded the couple image", status: 200 })
    } catch (error) {
        console.log(error)
        return res.json({ message: "failed to upload couple image", status: 500, error: error.message})
    }
}
export const createCouple = async (req, res) => {
    try {
        let { BoyName, GirlName } = pick(req.body, [
            'BoyName',
            'GirlName',
        ])

        let findCoupleByBoyname = await Couple.findOne({ BoyName })
        if (findCoupleByBoyname) return res.status(400).send({
            message: "Boy already registered"
        })

        let findCoupleByGirlname = await Couple.findOne({ GirlName })
        if (findCoupleByGirlname) return res.status(400).send({
            message: "Girl already registered"
        })

        let couple = new Couple({
            BoyName,
            GirlName
        })
        const time = new Date();

        couple.CreatedAt = time

        let result = await couple.save()
        return res.json({
            message: "Couple registered successfully",
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
