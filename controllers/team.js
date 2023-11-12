import { createTeamService, findAllTeams, findTeamServiceById } from "../services/teams.js";

export class TeamController {

  static async getAll (req,res) {
    const data = await findAllTeams()
    return res.status(200).json(data)
  }

  static async create (req, res) {
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newTeam = await createTeamService(result.data);
    res.status(201).json(newTeam)
  }

  static async getById (req, res) {
    const { id } = req.params
    const team = await findTeamServiceById(id);
    if (team) return res.json(team)
    res.status(404).json({ message: 'Team not found' })
  }


}