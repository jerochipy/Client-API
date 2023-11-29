import { createPlayerService, findAllPlayers, findPlayerServiceById } from "../services/players.js";

export class PlayerController {

  static async getAll (req,res) {
    const data = await findAllPlayers()
    return res.status(200).json(data)
  }

  static async create (req, res) {
    console.log(req.body)
    const newPlayer = await createPlayerService(req.body);
    
    res.status(201).json(newPlayer)
    
  }

  static async getById (req, res) {
    const { id } = req.params
    const player = await findPlayerServiceById(id);
    if (player) return res.json(player)
    res.status(404).json({ message: 'player not found' })
  }


}
