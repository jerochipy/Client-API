import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' })

  jwt.verify(token, 'jero', (err, user) => {
    if (err) {
     
      return res.status(403).json({ error: 'Acceso denegado. Token inválido' })
    }

    req.user = user
    next()
  })
}
