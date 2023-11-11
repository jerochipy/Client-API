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
  } from "../services/follows.js";
  
  export class FollowController {
  
    static async getAllFollowTeams(req, res) {
      const id = req.user.Id;
      const data = await findAllFollowTeams(id);
      return res.status(200).json(data);
    }
  
    static async getAllFollowPlayers(req, res) {
      const id = req.user.Id;
      const data = await findAllFollowPlayers(id);
      return res.status(200).json(data);
    }
  
    static async getAllFollowLeagues(req, res) {
      const id = req.user.Id;
      const data = await findAllFollowLeagues(id);
      return res.status(200).json(data);
    }
  
    static async followTeam(req, res) {
        const id = req.user.userId;
        const { TeamId } = req.params; // Cambiado para obtener el TeamId desde el cuerpo de la solicitud

        try {
          const newFollow = await followTeam(id, TeamId);
          res.status(201).json(newFollow);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    }

    static async followPlayer(req, res) {
      const id = req.user.Id;
      const { PlayerId } = req.params;
      try {
        const newFollow = await followPlayer(id, PlayerId);
        res.status(201).json(newFollow);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    static async followLeague(req, res) {
      const id = req.user.Id;
      const { LeagueId } = req.params;
      try {
        const newFollow = await followLeague(id, LeagueId);
        res.status(201).json(newFollow);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    static async unFollowTeam(req, res) {
      const { id } = req.params;
      try {
        await unFollowTeam(id);
        res.status(200).send("Eliminado correctamente");
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    static async unFollowPlayer(req, res) {
      const { id } = req.params;
      try {
        await unFollowPlayer(id);
        res.status(200).send("Eliminado correctamente");
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    static async unFollowLeague(req, res) {
      const { id } = req.params;
      try {
        await unFollowLeague(id);
        res.status(200).send("Eliminado correctamente");
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  