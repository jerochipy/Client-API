import { createPredictionService, getPredictionsByMatchId } from "../services/predictions.js";

export class PredictionController {

  static async createPrediction (req, res) {
    const { matchId, homeScore, awayScore } = req.body;
    const userId = req.user.id; // Supongo que guardas la información del usuario en req.user

    const predictionData = {
      matchId: matchId,
      userId: userId,
      homeScore: homeScore,
      awayScore: awayScore,
    };

    const newPrediction = await createPredictionService(predictionData);
    res.status(201).json(newPrediction);
  }

  static async getPredictionsByMatch (req, res) {
    const { matchId } = req.params;
    const predictions = await getPredictionsByMatchId(matchId);
    res.status(200).json(predictions);
  }

  // Otras funciones del controlador si es necesario
}
