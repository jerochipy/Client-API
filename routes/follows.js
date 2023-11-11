import { Router } from 'express'
import { FollowController } from '../controllers/follow.js'
import { verifyToken } from "../validators/authJwt.js";

export const followRouter = Router()

followRouter.get('/teams', verifyToken, FollowController.getAllFollowTeams)

followRouter.get('/players', verifyToken, FollowController.getAllFollowPlayers)

followRouter.get('/leagues', verifyToken, FollowController.getAllFollowLeagues)

followRouter.post('/teams/:TeamId', verifyToken, FollowController.followTeam)

followRouter.post('/players/:PlayerId', verifyToken, FollowController.followPlayer)

followRouter.post('/leagues/:LeagueId', verifyToken, FollowController.followLeague)

followRouter.delete('/teams/:id', verifyToken, FollowController.unFollowTeam);

followRouter.delete('/players/:id', verifyToken, FollowController.unFollowPlayer);

followRouter.delete('/leagues/:id', verifyToken, FollowController.unFollowLeague);
