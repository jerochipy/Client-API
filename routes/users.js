import { Router } from 'express'
import { UserController } from '../controllers/user.js'
import { verifyToken } from "../validators/authJwt.js";


export const usersRouter = Router()

usersRouter.get('/', verifyToken, UserController.getAll)

usersRouter.get('/:id', verifyToken, UserController.getById)

usersRouter.post('/', UserController.create)

usersRouter.post('/login', UserController.login)

usersRouter.patch('/:id', verifyToken, UserController.update)

usersRouter.delete('/:id', verifyToken, UserController.delete)