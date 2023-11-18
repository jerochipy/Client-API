import pkg from '@prisma/client';
import fetch from 'node-fetch';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const createPredictionService = async (body) => {
    const data = await prisma.prediction.create({ data: body });
    return data;
  }
  
  export const getPredictionsByMatchId = async (matchId) => {
    const data = await prisma.prediction.findMany({
      where: {
        matchId: matchId,
      },
    });
    return data;
  }
  