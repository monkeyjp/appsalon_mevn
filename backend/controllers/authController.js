import User from '../models/User.js'
import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {

    // all fields validation
    if (Object.values(req.body).includes('')) {
        const error = new Error("All fields are required")

        return res.status(400).json({
            msg: error.message
        })
    }
    // duplicate post
    const { email, name, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = new Error("User already exist")
        return res.status(400).json({
            msg: error.message
        })
    }


    // password validation
    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`The password must be at least ${MIN_PASSWORD_LENGTH} characters long.`)
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token } = result

        sendEmailVerification({
            name,
            email,
            token
        })

        res.json({
            msg: 'The user has been created successfully, please check your email.'
        })
    } catch (error) {
        console.log(error);

    }

}

const verifyAccount = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error("Invalid or expired token.")
        return res.status(401).json({
            msg: error.message
        })
    }

    // if user is valid, confirm
    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({ msg: "Account successfully confirmed." })
    } catch (error) {
        console.log(error);

    }
}

const login = async (req, res) => {
    // check user exist
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("User doesn´t exist")
        return res.status(401).json({ msg: error.message })
    }
    //check user is confirmed
    if (!user.verified) {
        const error = new Error("Your account has not been confirmed yet.")
        return res.status(401).json({ msg: error.message })
    }
    //check password
    if (await user.checkPassword(password)) {


        const token = generateJWT(user._id)



        res.json({
            msg: "User successfully authenticated.", token
        })
    } else {
        const error = new Error("Incorrect password.")
        return res.status(401).json({ msg: error.message })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    //verify if exist
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("User not found.")
        return res.status(404).json({ msg: error.message })
    }
    try {
        user.token = uniqueId()
        const result = await user.save()

        await sendEmailPasswordReset({
            name: result.name,
            email: result.email,
            token: result.token
        })

        res.json({
            msg: "We have sent an email with password reset instructions."
        })
    } catch (error) {
        console.log(error);

    }

}

const verifyPasswordResetToken = async (req, res) => {
    const { token } = req.params

    const isValidToken = await User.findOne({ token })
    if (!isValidToken) {
        const error = new Error('Invalid or expired token.')
        return res.status(400).json({ msg: error.message })
    }
    res.json({ msg: "Token is valid. You can now reset your password." })

}

const updatePassword = async (req, res) => {

    const { token } = req.params

    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error('Invalid or expired token.')
        return res.status(400).json({ msg: error.message })
    }

    const { password } = req.body
    try {
        user.token = ""
        user.password = password
        await user.save()
        res.json({
            msg: 'Password has been successfully updated.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred while updating the password.' });

    }

}

const user = async (req, res) => {
    const { user } = req
    res.json(user)

}

const admin = async (req, res) => {
    const { user } = req
    if (!user.admin) {
        const error = new Error('Action not allowed.')
        return res.status(403).json({ msg: error.message })
    }

    res.json(user)

}



export {
    register, verifyAccount, login, user, forgotPassword, verifyPasswordResetToken, updatePassword, admin
}

