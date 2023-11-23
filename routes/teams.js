import { Router } from 'express'
import { TeamController } from '../controllers/team.js'
import { verifyToken } from '../validators/authJwt.js'

export const teamsRouter = Router()

teamsRouter.get('/', verifyToken, TeamController.getAll)

teamsRouter.get('/:id', verifyToken, TeamController.getById)

teamsRouter.post('/', verifyToken, TeamController.create)
