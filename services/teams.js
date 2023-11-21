import pkg from '@prisma/client'
import fetch from 'node-fetch'

const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const findAllTeams = async () => {
  const data = await prisma.team.findMany({
    where: {
      is_deleted: false
    }
  })
  return data
}

export const createTeamService = async (body) => {
  const existingTeam = await prisma.team.findUnique({
    where: {
      id: body.id
    }
  })

  if (existingTeam) {
    console.log(`El equipo con ID ${body.id} ya existe en la base de datos, por lo tanto no fue creado.`)
    return existingTeam
  }

  const data = await prisma.team.create({ data: body })
  return data
}

export const findTeamServiceById = async (id) => {
  let data = await prisma.team.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!data) {
    data = await getTeamsApiService(id)
    if (data) {
      await createTeamService(data)
    }
  }

  return data
}

export const getTeamsApiService = async (id) => {
  const url = process.env.API_URL + `/teams?id=${id}`
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': process.env.API_KEY_URL_HEADER
  }

  try {
    const response = await fetch(url, { headers })
    if (response.ok) {
      const data = await response.json()
      const apiData = data.response[0]
      const teamData = apiData.team

      return {
        id: teamData.id,
        name: teamData.name,
        country: teamData.country,
        code: teamData.code,
        founded: teamData.founded,
        national: teamData.national,
        logo: teamData.logo,
        venueId: apiData.venue.id
      }
    } else {
      console.error(`Error en la respuesta de la API: ${response.statusText}`)
      return null
    }
  } catch (error) {
    console.error(`Error al consultar la API: ${error.message}`)
    return null
  }
}
