import { createLeagueService, findAllLeagues, findLeagueServiceById } from '../services/leagues.js'
import { LeaguesModel } from '../models/leagues.js'
export class LeagueController {
  /* static async getLeagues (req, res) {
    let data
    const id = req.query.id

    if (id !== undefined) {
      data = await LeaguesModel.getById({ id })
    } else {
      data = await LeaguesModel.getAll(index)
    }

    return res.json(data)
  } */

  static async getAll (req, res) {
    const index = req.get('Index')
    const data = await LeaguesModel.getAll(index !== undefined ? JSON.parse(index) : { startIndex: undefined, endIndex: undefined })
    return res.status(200).json(data)
  }

  static async create (req, res) {
    console.log('entre')
    console.log(req.body)
    const newLeague = await createLeagueService(req.body)

    res.status(201).json(newLeague)
  }

  static async getById (req, res) {
    
    const { id } = req.params
    console.log(id)
    const league = await LeaguesModel.getById(id)
    if (league) return res.json(league)
    res.status(404).json({ message: 'League not found' })
  }

  static async searchByName (req, res) {
    const name = req.query.name
    const leagues = await LeaguesModel.searchByName({ name })
    if (leagues.lenght == 0) {
      return res.json(leagues).status(404)
    }
    return res.json(leagues)
  }
}
