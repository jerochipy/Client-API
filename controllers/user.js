import { validateUser, validatePartialUser } from '../app/users.js'
import { createUserService, findUserServiceById, updateUserService, deleteUserService, loginService } from '../services/users.js'
import { UserModel } from '../models/user.js'
export class UserController {
  static async getAll (req, res) {
    const { username } = req.query

    if (username) {
      const user = await UserModel.getByUsername({ username })
      if (user) return res.json(user)
      console.log(username)
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(await UserModel.getAll())
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await findUserServiceById(id)
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  static async create (req, res) {
    const result = validateUser(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await createUserService(result.data)
    res.status(201).json(newUser)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialUser(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updateUser = await updateUserService(id, result.data)
    if (updateUser === false) return res.status(404).json({ message: 'User not found' })

    res.status(201).json(updateUser)
  }

  static async delete (req, res) {
    const { id } = req.params
    await deleteUserService(id)
    res.status(200).send('Ha sido Eliminado Correctamente')
  }

  static async login (req, res) {
    console.log(req.body)
    try {
      const data = await loginService(req.body)

      if (!data) {
        res.send({ res: 'email o contraseña invalidos' })
      } else {
        res.send({ res: 'logueado correctamente', token: data })
      }
    } catch (msg) {
      console.log(msg)
      return res.status(400).send('Error')
    }
  }
}
