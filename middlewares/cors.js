import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:1234',
  'https://client-api-dev-qjme.3.us-1.fl0.io/',
  'http://localhost:4200',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
