import mongoose from 'mongoose'
import dbConfig from '../configs/db.config.mjs'

const url = dbConfig.dbUrl

const connectDB = async () => {
    console.log('🚀 ~ file: db.service.js:5 ~ url:', url)

    try {
        await mongoose.connect(url)
        console.log(`Database connected successfully`)
    } catch (error) {
        console.log(`Database didn't connect: ${error}`)
    }
}
export default connectDB
