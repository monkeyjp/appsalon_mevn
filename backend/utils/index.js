import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { format } from "date-fns"


function validateObjectId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id is not valid")
        return res.status(400).json({
            msg: error.message
        })
    }
}

function handleNotFoundError(res, message) {
    const error = new Error(message)
    return res.status(404).json({
        msg: error.message
    })
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)


const generateJWT = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    return token

}

function formatDate(date) {
    return format(date, 'PPPP')
}

export {
    validateObjectId, handleNotFoundError, uniqueId, generateJWT, formatDate
}