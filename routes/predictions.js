import { Router } from 'express'
import { PredictionController } from '../controllers/prediction.js';
import { verifyToken } from "../validators/authJwt.js";

export const predictionRouter = Router()

predictionRouter.post('/predictions', verifyToken, PredictionController.createPrediction);

predictionRouter.get('/predictions/:matchId', verifyToken, PredictionController.getPredictionsByMatch);
