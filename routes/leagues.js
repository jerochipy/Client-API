import { Router } from 'express'
import { LeaguesController } from '../controllers/leagues.js'
import { corsMiddleware } from '../middlewares/cors.js'

export const leaguesRoutes = Router()

leaguesRoutes.get('/', LeaguesController.getLeagues)
