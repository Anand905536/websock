import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import crypto from 'crypto';




// Getting profile details 
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, password, address } = req.body;
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json("User not found")
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
            }
        })
    } catch (err) {
        return res.send(err.massage)
    }
}

// profile picture
export const uploadProfilePicture = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json("No profile picture uploaded")
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture: req.file.path },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully",
            profilePicture: user.profilePicture,
        })
    }
    catch (err) {
        return res.send(err.message);
    }
}


// all chat user
export const allUserChat = async(req,res,next) => {
   
}

// delete specific user chat
export const deleteChat = async(req,res,next) => {

}

// all application user
export const allFriends = async(req,res,next) => {

}

