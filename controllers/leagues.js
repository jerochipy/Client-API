import { LeaguesModel } from '../models/leagues.js'
export class LeaguesController {
  static async getLeagues (req, res) {
    let data
    const id = req.query.id
    const index = JSON.parse(req.get('Index'))

    if (id !== undefined) {
      data = await LeaguesModel.getById({ id })
    } else {
      data = await LeaguesModel.getAll(index)
    }

    return res.json(data)
  }
}
