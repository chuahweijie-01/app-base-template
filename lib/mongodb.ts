import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI')
}

// @ts-expect-error: To by-pass 'any' type declaration for global
const cached = global.mongoose || { conn: null, promise: null }

async function connectMongo() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false
        }).then(mongoose => mongoose)
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectMongo
