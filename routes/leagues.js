import { Router } from 'express'
import { LeagueController } from '../controllers/league.js'
import { corsMiddleware } from '../middlewares/cors.js'
import { verifyToken } from '../validators/authJwt.js'

export const leagueRoutes = Router()

leagueRoutes.get('/', LeagueController.getAll)

leagueRoutes.get('/:id', verifyToken, LeagueController.getById)

leagueRoutes.post('/', verifyToken, LeagueController.create)