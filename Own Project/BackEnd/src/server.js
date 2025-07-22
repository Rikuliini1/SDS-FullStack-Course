import express from 'express'
import dotenv from 'dotenv'
import 'colors'
import connectToDatabase from './database/initDB.js'
import userRouter from './routes/userRoutes.js'
import listRouter from './routes/listRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 9000

async function initialize() {
    console.log('\nRun Server'.cyan)

    // init database
    await connectToDatabase()

    // init app
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // init routes
    app.use('/api/users', userRouter)
    app.use('/api/lists', listRouter)

    app.listen(PORT, () => {
        console.log(`        Server running on port ${PORT}\n`.green)
    })
}

initialize()

// EOF
