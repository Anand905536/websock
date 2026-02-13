import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        uniqueCode: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        visibility: {
            type: Number,
            deafult: 1
        }
    }, { timestamps: true }
)

const user = mongoose.model("user", userSchema)
export default user;


