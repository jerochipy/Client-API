import { Router } from 'express'
import { PlayerController } from '../controllers/player.js'
import { verifyToken } from '../validators/authJwt.js'

export const playerRoutes = Router()

playerRoutes.get('/', verifyToken, PlayerController.getAll)

playerRoutes.get('/:id', verifyToken, PlayerController.getById)

playerRoutes.post('/', verifyToken, PlayerController.create)
