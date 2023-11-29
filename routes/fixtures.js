import { Router } from 'express'
import { FixtureController } from '../controllers/fixtures.js'

export const fixtureRoutes = Router()

fixtureRoutes.get('/', FixtureController.getByLeague)
