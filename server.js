import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import config from './configs/default.config.mjs'
import router from './routes/router.mjs'
import connectDB from './services/db.service.mjs'

const port = config.port

const app = express()
// app.use(body)

app.use(helmet())
app.options('*', cors())
app.use(morgan('combined'))

connectDB()

// app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.json())

router(app)

app.listen(port, () => console.log(`Server running on port: ${port}`))
