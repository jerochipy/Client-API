import { FixtureModel } from '../models/fixture.js'
export class FixtureController {
  static async getByLeague (req, res) {
    let data
    const league = req.query.league
    const season = req.query.season
    const id = req.query.id
    if (id !== undefined) {
      data = await FixtureModel.getByMatchId({ id })
    } else {
      data = await FixtureModel.getByLeague({ league, season })
    }
    return res.json(data)
  }
}
