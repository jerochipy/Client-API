import { validateUser, validatePartialUser } from '../app/users.js'
import { UserModel } from '../models/user.js'

export class UserController {
  static async getAll (req, res) {
    const { username } = req.params
    if (username) {
      console.log('dsfsdfs')
      const user = await UserModel.getByUsername({ username })
      if (user) return res.json(user)
      res.status(404).json({ message: 'User not found' })
    }
    res.json(await UserModel.getAll())
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById({ id })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  static async create (req, res) {
    const result = validateUser(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await UserModel.create({ input: result.data })
    res.status(201).json(newUser)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialUser(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updateUser = await UserModel.update({ id, input: result.data })
    if (updateUser === false) return res.status(404).json({ message: 'User not found' })

    res.status(201).json(updateUser)
  }
}
