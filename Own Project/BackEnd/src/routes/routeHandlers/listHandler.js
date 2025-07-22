import ListModel from '../../database/models/listModel.js'

// @desc    Create a new list
// @route   POST /api/lists/create_list
// @access  Private
const createList = async (req, res) => {
    try {
        console.log('    Creating a new list...'.yellow)

        const { topic, first, second, third } = req.body || {}

        // Check for missing data
        if (!topic || !first || !second || !third) {
            const missingFields = []
            if (!topic) missingFields.push('topic')
            if (!first) missingFields.push('first')
            if (!second) missingFields.push('second')
            if (!third) missingFields.push('third')
            console.log(`        New list not created, missing data (${missingFields.join(', ')})\n`.red)
            return res.status(400).json({ errorMessage: `New list not created, missing data (${missingFields.join(', ')})` })
        }

        // Create a new list
        const newList = await ListModel.create({
            userId: req.user.id,
            topic, first, second, third
        })

        const list = newList.toObject()
        delete list.userId

        console.log(`        Successfully created a new list\n`.green)
        res.status(201).json({
            successMessage: 'Successfully created a new list',
            list,
        })
    } catch (error) {
        console.log('        An unexpected server error occurred\n'.red)
        console.log(error)
        res.status(500).json({ errorMessage: 'An unexpected server error occurred' })
    }
}

// @desc    Get all lists
// @route   GET /api/lists/get_lists
// @access  Private
const getLists = async (req, res) => {
    try {
        console.log('    Getting all lists...'.yellow)

        // Get lists
        const lists = await ListModel.find({ userId: req.user.id })

        console.log(`        Successfully got all lists\n`.green)
        res.status(200).json(lists)
    } catch (error) {
        console.log('        An unexpected server error occurred\n'.red)
        console.log(error)
        res.status(500).json({ errorMessage: 'An unexpected server error occurred' })
    }
}

// @desc    Delete a list
// @route   DELETE /api/lists/delete_list/:id
// @access  Private
const deleteList = async (req, res) => {
    try {
        console.log('    Deleting a list...'.yellow)

        const listId = req.params.id

        // Check if list exists
        const list = await findList(listId)
        if (!list) {
            console.log('        List not deleted, not found\n'.red)
            return res.status(404).json({ errorMessage: 'List not deleted, not found' })
        }

        // Check if logged in user id and list user id match
        if (list.userId.toString() !== req.user.id) {
            console.log('        List not deleted, user id does not match\n'.red)
            return res.status(403).json({ errorMessage: 'List not deleted, user id does not match' })
        }

        // Delete the list
        await list.deleteOne()

        console.log(`        Successfully deleted a list\n`.green)
        res.status(200).json({ successMessage: 'Successfully deleted a list' })
    } catch (error) {
        console.log('        An unexpected server error occurred\n'.red)
        console.log(error)
        res.status(500).json({ errorMessage: 'An unexpected server error occurred' })
    }
}

const findList = async (listId) => {
    try {
        return await ListModel.findById(listId)
    } catch (error) {
        return null
    }
}

export { getLists, createList, deleteList }

// EOF
