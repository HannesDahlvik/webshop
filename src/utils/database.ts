import mongoose from 'mongoose'

const connection: any = {}

const dbConnect = async () => {
    if (connection.isConnected) return

    const options: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    const db: any = await mongoose.connect(process.env.MONGO_URI, options)

    connection.isConnected = db.connection.readyState
}

export default dbConnect
