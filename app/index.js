const express = require('express')
const app = express()
const crypto = require('node:crypto')
const users = require('./users.json')
const cors = require('cors')
const { validateUser, validatePartialUser } = require('./users')

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

app.get('/users', (req, res) => {
  const { username } = req.query
  if (username) {
    const userFiltered = users.filter(
      user => user.username === username
    )
    return res.json(userFiltered)
  }
  res.json(users)
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  const user = users.find(user => user.id === id)
  if (user) return res.json(user)

  res.status(404).json({ message: 'User not found' })
})

app.post('/users', (req, res) => {
  const result = validateUser(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newUser = {
    id: crypto.randomUUID(),
    ...result.data
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialUser(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex < 0) return res.status(404).json({ message: 'User not found' })

  const updateUser = {
    ...users[userIndex],
    ...result.data
  }

  users[userIndex] = updateUser
})

app.use((req, res) => {
  res.status(404).send('<h1>404!</h1>')
})
app.listen(PORT, () => {
  console.log('server is running')
})
