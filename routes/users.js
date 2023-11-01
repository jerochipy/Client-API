import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.create)
