import { Router } from 'express'
import { PredictionController } from '../controllers/prediction.js';
import { verifyToken } from "../validators/authJwt.js";

export const predictionRouter = Router()

predictionRouter.post('/', verifyToken, PredictionController.createPrediction);

predictionRouter.get('/:matchId', verifyToken, PredictionController.getPredictionsByMatch);

predictionRouter.get('/top/:matchId', verifyToken, PredictionController.getTopPredictionsByMatch);
