import { createLeagueService, findAllLeagues, findLeagueServiceById } from "../services/leagues.js";
export class LeagueController {
  /*static async getLeagues (req, res) {
    let data
    const id = req.query.id
    const index = JSON.parse(req.get('Index'))

    if (id !== undefined) {
      data = await LeaguesModel.getById({ id })
    } else {
      data = await LeaguesModel.getAll(index)
    }

    return res.json(data)
  }*/

  static async getAll (req,res) {
    const data = await findAllLeagues()
    return res.status(200).json(data)
  }

  static async create (req, res) {
    console.log("entre");
    console.log(req.body)
    const newLeague = await createLeagueService(req.body);
    
    res.status(201).json(newLeague)
    
  }

  static async getById (req, res) {
    const { id } = req.params
    const league = await findLeagueServiceById(id);
    if (league) return res.json(league)
    res.status(404).json({ message: 'League not found' })
  }

}
