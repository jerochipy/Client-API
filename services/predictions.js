import pkg from '@prisma/client'
import fetch from 'node-fetch'

const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const createPredictionService = async (body) => {
  const data = await prisma.prediction.create({ data: body })
  return data
}

export const getPredictionsByMatchId = async (matchId) => {
  const data = await prisma.prediction.findMany({
    where: {
      matchId: Number(matchId)
    }
  })
  return data
}

export const getTopPredictionsByMatchId = async (matchId) => {
  const allPredictions = await getPredictionsByMatchId(matchId)

  return calculateTopPredictions(allPredictions)
}

export const calculateTopPredictions = (allPredictions) => {
  const totalVotes = allPredictions.length

  const sortedPredictions = allPredictions.reduce((acc, prediction) => {
    const key = `${prediction.homeScore}-${prediction.awayScore}`
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const topPredictions = Object.entries(sortedPredictions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, count]) => {
      const [homeScore, awayScore] = key.split('-')
      const percentage = (count / totalVotes) * 100

      return {
        homeScore: parseInt(homeScore, 10),
        awayScore: parseInt(awayScore, 10),
        percentage: percentage.toFixed(2),
        count
      }
    })

  return {
    totalPredictions: totalVotes,
    topPredictions
  }
}
