import pkg from '@prisma/client'
import fetch from 'node-fetch'

const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const findAllPlayers = async () => {
  const data = await prisma.player.findMany({
    where: {
      is_deleted: false
    }
  })
  return data
}

export const createPlayerService = async (body) => {
  console.log(body);
  const existingPlayer = await prisma.player.findUnique({
    where: {
      id: body.id
    }
  })

  if (existingPlayer) {
    console.log(`El jugador con ID ${body.id} ya existe en la base de datos, por lo tanto no fue creado.`)
    return existingPlayer
  }

  const data = await prisma.player.create({ data: body })
  return data
}

export const findPlayerServiceById = async (id) => {
  let data = await prisma.player.findUnique({
    where: {
      id: Number(id)
    }
  })
  
  return data
}