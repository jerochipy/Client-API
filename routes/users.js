import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.create)

usersRouter.post('/login',UserController.login)

usersRouter.patch('/:id', UserController.update)

usersRouter.delete('/:id', UserController.delete)