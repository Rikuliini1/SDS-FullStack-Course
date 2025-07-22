import mongoose from 'mongoose'

const listSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserModel'
    },
    topic: {
        type: String,
        required: [true, 'Please add a topic for listSchema']
    },
    first: {
        type: String,
        required: [true, 'Please add the first item for listSchema']
    },
    second: {
        type: String,
        required: [true, 'Please add the second item for listSchema']
    },
    third: {
        type: String,
        required: [true, 'Please add the third item for listSchema']
    }
}, {
    timestamps: true,
    collection: 'lists'
})

export default mongoose.model('ListModel', listSchema)

// EOF
