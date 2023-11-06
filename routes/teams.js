import { Router } from 'express'
import { TeamController } from '../controllers/team.js'

export const teamsRouter = Router()

teamsRouter.get('/', TeamController.getAll)

teamsRouter.get('/:id', TeamController.getById)

teamsRouter.post('/', TeamController.create)

