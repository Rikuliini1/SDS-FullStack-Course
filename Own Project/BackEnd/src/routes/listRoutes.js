import express from 'express'
import authMiddleware from '../middleware/authMWare.js'
import { getLists, createList, deleteList } from './routeHandlers/listHandler.js'

const listRouter = express.Router()

listRouter.get('/get_lists', authMiddleware, getLists)
listRouter.post('/create_list', authMiddleware, createList)
listRouter.delete('/delete_list/:id', authMiddleware, deleteList)

export default listRouter

// EOF
