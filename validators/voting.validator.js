import Joi from 'joi';
import _ from "lodash";

export async function validateVoting(req, res, next) {
    try {
        const schema = Joi.object({
            Names: Joi.string().required().label("Names"),
            Email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
            coupleId: Joi.string().required().label("Couple Id")
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to vote."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(errorResponse(ex)
)
    }
}