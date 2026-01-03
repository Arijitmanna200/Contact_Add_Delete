import mongoose from "mongoose";
import { type } from "os";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,

        },
        phone: {
            type: Number,
            required: true,

        },
        message: {
            type: String,

        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        collection: "contacts",
        timestamps: true
    }
)

export default mongoose.model('Contact', contactSchema)