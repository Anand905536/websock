import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const { name, email, address, password, phoneNumber } = req.body
        if (!name || !email || !address || !password || !phoneNumber) {
            return res.status(400).json("all fields are required")
        }

        const ifExistingUser = await User.findOne({ email })
        
        if (ifExistingUser) {
            console.log("called")
            return res.status(409).json("user already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            address,
            phoneNumber,
            password: hashedPassword,
        })

        res.status(201).json({
            success: true,
            message: "user created successfully",
            status: 1,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber
            }
        })
    }
    catch (err) {
        return res.send(err.message)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json("Email or password are required")
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json("Invalid Credentials")
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(401).json("Invalid Credentials")
        }

        res.status(200).json({ message: "login successfully", status: 1 })
    } catch (err) {
        res.send(err.message)
    }
}

