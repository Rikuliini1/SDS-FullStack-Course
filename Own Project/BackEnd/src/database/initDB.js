import mongoose from 'mongoose'

const connectToDatabase = async () => {
    try {
        console.log('    Connecting to database...'.yellow)
        const dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`        MongoDB connected: ${dbConnection.connection.name}`.green)
    } catch (error) {
        console.log('        Error while connecting to database\n'.red)
        console.log(error)
        process.exit(1)
    }
}

export default connectToDatabase

// EOF
