import { createTeamService, findAllTeams, findTeamServiceById } from '../services/teams.js'
import { TeamsModel } from '../models/teams.js'
export class TeamController {
  static async getAll (req, res) {
    const season = req.query.season
    const league = req.query.league
    console.log(season, league)

    if (season !== undefined) {
      if (league !== undefined) {
        return res.json(await TeamsModel.getAll({ season, league }))
      }
    }
    return res.json('Missing params! Please add').status(400)
  }
  // static async getAll (req,res) {
  //   const data = await findAllTeams()
  //   return res.status(200).json(data)
  // }

  static async create (req, res) {
    console.log('entre')
    console.log(req.body)
    const newTeam = await createTeamService(req.body)

    res.status(201).json(newTeam)
  }

  // static async getById (req, res) {
  //   const { id } = req.params
  //   const team = await findTeamServiceById(id)
  //   if (team) return res.json(team)
  //   res.status(404).json({ message: 'Team not found' })
  // }
  static async getById (req, res) {
    const id = req.params
    if (id !== undefined) {
      return res.json(await TeamsModel.getById({ id }))
    }
  }
}

// con local
/* import { TeamsModel } from '../models/teams.js'

export class TeamController {
  static async getAll (req, res) {
    const season = req.query.season
    const league = req.query.league
    console.log(season, league)

    if (season !== undefined) {
      if (league !== undefined) {
        return res.json(await TeamsModel.getAll({ season, league }))
      }
    }
    return res.json('Missing params! Please add').status(400)
  }

  static async getById (req, res) {
    const id = req.params
    if (id !== undefined) {
      return res.json(await TeamsModel.getById({ id }))
    }
  }
} */
