import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
    dbUrl: process.env.DB_URL,
}

export default dbConfig
