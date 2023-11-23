import pkg from '@prisma/client'
import fetch from 'node-fetch'

const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const findAllLeagues = async () => {
  const data = await prisma.league.findMany({
    where: {
      is_deleted: false
    }
  })
  return data
}

export const createLeagueService = async (body) => {
  console.log(body);
  const existingLeague = await prisma.league.findUnique({
    where: {
      id: body.id
    }
  })

  if (existingLeague) {
    console.log(`La liga con ID ${body.id} ya existe en la base de datos, por lo tanto no fue creado.`)
    return existingLeague
  }

  const data = await prisma.league.create({ data: body })
  return data
}

export const findLeagueServiceById = async (id) => {
  let data = await prisma.league.findUnique({
    where: {
      id: Number(id)
    }
  })

  return data
}