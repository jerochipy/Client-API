import { createPredictionService, getPredictionsByMatchId, getTopPredictionsByMatchId } from "../services/predictions.js";

export class PredictionController {

  static async createPrediction (req, res) {
    const { matchId, homeScore, awayScore } = req.body;
    const userId = req.user.userId;
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

  static async getTopPredictionsByMatch (req, res) {
    const { matchId } = req.params;
    const topPredictions = await getTopPredictionsByMatchId(matchId);
    res.status(200).json(topPredictions);
  }
  
}
