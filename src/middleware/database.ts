import mongoose from 'mongoose'

const connection: any = {}

const dbConnect = async () => {
    if (connection.isConnected) return

    const db = await mongoose.connect(process.env.MONGO_URI)
    connection.isConnected = db.connection.readyState
}

export default dbConnect
