import { validateUser, validatePartialUser } from '../app/users.js'
import { createUserService, findAllUsers, findUserServiceById, updateUserService, deleteUserService, loginService } from '../services/users.js'

export class UserController {
  static async getAll (req, res) {
    const data = await findAllUsers()
    return res.status(200).json(data)
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

  static async login(req, res) {
    try {
      const data = await loginService(req.body);

      if (!data) {
        res.status(401).json({ error: "Email o contraseña inválidos" });
      } else {
        res.status(200).json({
          message: "Logueado correctamente",
          token: data.token,
          user: {
            email: data.email,
            username: data.username,
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
