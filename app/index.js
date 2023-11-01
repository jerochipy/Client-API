import express, { json } from 'express'
import { usersRouter } from '../routes/users.js'
import { corsMiddleware } from '../middlewares/cors.js'
const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

// Endpoints
app.use('/users', usersRouter)

app.use((req, res) => {
  res.status(404).send('<h1>404!</h1>')
})
app.listen(PORT, () => {
  console.log('server is running')
})
