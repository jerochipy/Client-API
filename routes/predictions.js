import { PredictionController } from '../controllers/prediction.js';

teamsRouter.post('/predictions', verifyToken, PredictionController.createPrediction);

teamsRouter.get('/predictions/:matchId', verifyToken, PredictionController.getPredictionsByMatch);
