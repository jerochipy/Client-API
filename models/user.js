import { readJSON } from '../app/utils.js'
import { randomUUID } from 'crypto'

const users = readJSON('../app/users.json')
export class UserModel {
  static async getAll () {
    return users
  }

  static getById ({ id }) {
    const user = users.find(user => user.id === id)
    return user
  }

  static getByUsername ({ username }) {
    const user = users.find(user => user.username === username)
    return user
  }

  static async create ({ input }) {
    const newUser = {
      id: randomUUID(),
      ...input
    }
    users.push(newUser)
    return newUser
  }

  static async update ({ id, input }) {
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex < 0) return false

    const updateUser = {
      ...users[userIndex],
      ...input
    }

    users[userIndex] = updateUser

    return updateUser
  }
}
