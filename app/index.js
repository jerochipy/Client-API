import express, { json } from 'express'
import { usersRouter } from '../routes/users.js'
import { corsMiddleware } from '../middlewares/cors.js'
import { teamsRouter } from '../routes/teams.js'
import { followRouter } from '../routes/follows.js'
import { predictionRouter } from '../routes/predictions.js'
import { fixtureRoutes } from '../routes/fixtures.js'

const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

// Endpoints
app.use('/users', usersRouter)
app.use('/teams', teamsRouter)
app.use('/follows', followRouter)
app.use('/predictions', predictionRouter)
app.use('/fixtures', fixtureRoutes)

app.use((req, res) => {
  res.status(404).send('<h1>404 Page not found!</h1>')
})
app.listen(PORT, () => {
  console.log('server is running')
})
