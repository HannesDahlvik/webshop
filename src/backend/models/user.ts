import mongoose, { Schema, Model, model, Document } from 'mongoose'

const userSchema: Schema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: 'customer'
        },
        address: {
            type: String
        },
        phone: {
            type: String
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export interface UserDoc extends Document {
    firstname: string
    lastname: string
    email: string
    role: string
    address: string
    phone: number
    password: string
}

const User: Model<UserDoc> = model('Users', userSchema)

delete mongoose.connection.models['Users']

export default User
