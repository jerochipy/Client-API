// controllers/followController.js
import {
  findAllFollowTeams,
  findAllFollowPlayers,
  findAllFollowLeagues,
  followTeam,
  followPlayer,
  followLeague,
  unFollowTeam,
  unFollowPlayer,
  unFollowLeague
} from '../services/follows.js'

export class FollowController {
  static async getAllFollowTeams (req, res) {
    const id = req.user.userId
    const data = await findAllFollowTeams(id)
    return res.status(200).json(data)
  }

  static async getAllFollowPlayers (req, res) {
    const id = req.user.userId
    const data = await findAllFollowPlayers(id)
    return res.status(200).json(data)
  }

  static async getAllFollowLeagues (req, res) {
    const id = req.user.userId
    const data = await findAllFollowLeagues(id)
    return res.status(200).json(data)
  }

  static async followTeam (req, res) {
    console.log("entre22");

    const id = req.user.userId
    const { TeamId } = req.params // Cambiado para obtener el TeamId desde el cuerpo de la solicitud
    console.log(TeamId);
    console.log(id);

    try {
      const newFollow = await followTeam(id, TeamId)
      res.status(201).json(newFollow)
      console.log("entre22333");

    } catch (error) {
      console.log("entre2444");

      res.status(400).json({ error: error.message })
    }
  }

  static async followPlayer (req, res) {
    const id = req.user.userId
    const { PlayerId } = req.params
    
    try {
      const newFollow = await followPlayer(id, PlayerId)
      res.status(201).json(newFollow)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async followLeague (req, res) {
    const id = req.user.userId
    console.log(req.user)
    const { LeagueId } = req.params
    console.log('hola ' + LeagueId)
    try {
      const newFollow = await followLeague(id, LeagueId)
      console.log(newFollow + LeagueId)
      res.status(201).json(newFollow)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async unFollowTeam (req, res) {
    const id = req.user.userId
    const { TeamId } = req.params
    try {
      await unFollowTeam(id, TeamId)
      res.status(200).send('Eliminado correctamente')
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async unFollowPlayer (req, res) {
    const id = req.user.userId
    const { PlayerId } = req.params
    try {
      await unFollowPlayer(id, PlayerId)
      res.status(200).send('Eliminado correctamente')
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async unFollowLeague (req, res) {
    const id = req.user.userId
    const { LeagueId } = req.params
    try {
      await unFollowLeague(id, LeagueId)
      res.status(200).send('Eliminado correctamente')
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
