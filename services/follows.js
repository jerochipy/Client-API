// services/follows.js
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const findAllFollowTeams = async (id) => {
  const data = await prisma.followTeam.findMany({
    where: {
      is_deleted: false,
      UserId: id
    },
  });
  return data;
}

export const findAllFollowPlayers = async (id) => {
  const data = await prisma.followPlayer.findMany({
    where: {
      is_deleted: false,
      UserId: id
    },
  });
  return data;
}

export const findAllFollowLeagues = async (id) => {
  const data = await prisma.followLeague.findMany({
    where: {
      is_deleted: false,
      UserId: id
    },
  });
  return data;
}

export const followTeam = async (id, TeamId) => {
    const existingEntry = await prisma.followTeam.findFirst({
      where: {
        UserId: id,
        TeamId: Number(TeamId),
      },
    });
  
    if (existingEntry) {
      const updatedEntry = await prisma.followTeam.update({
        where: { Id: existingEntry.Id },
        data: { is_deleted: false },
      });
      return updatedEntry;
    } else {
      const newEntry = await prisma.followTeam.create({
        data: {
          UserId: id,
          TeamId: Number(TeamId)
        },
      });
      return newEntry;
    }
  };
  
  export const followPlayer = async (id, PlayerId) => {
    const existingEntry = await prisma.followPlayer.findFirst({
      where: {
        UserId: id,
        PlayerId: Number(PlayerId),
        is_deleted: true,
      },
    });
  
    if (existingEntry) {
      const updatedEntry = await prisma.followPlayer.update({
        where: { Id: existingEntry.Id },
        data: { is_deleted: false },
      });
      return updatedEntry;
    } else {
      const newEntry = await prisma.followPlayer.create({
        data: {
          UserId: id,
          PlayerId: Number(PlayerId),
        },
      });
      return newEntry;
    }
  };
  
  export const followLeague = async (id, LeagueId) => {
    const existingEntry = await prisma.followLeague.findFirst({
      where: {
        UserId: id,
        LeagueId: Number(LeagueId),
        is_deleted: true,
      },
    });
  
    if (existingEntry) {
      const updatedEntry = await prisma.followLeague.update({
        where: { Id: existingEntry.Id },
        data: { is_deleted: false },
      });
      return updatedEntry;
    } else {
      const newEntry = await prisma.followLeague.create({
        data: {
          UserId: id,
          LeagueId: Number(LeagueId),
        },
      });
      return newEntry;
    }
  };
  
  export const unFollowTeam = async (id) => {
    const data = await prisma.followTeam.update({
      where: { 
        Id: Number(id)
      },
      data: {
        is_deleted: true
      }
    });
    return data;
  };
  

export const unFollowPlayer = async (id) => {
  const data = await prisma.followPlayer.update({
    where: { 
        Id: Number(id)
     },
    data: {
      is_deleted: true
    }
  });
  return data;
}

export const unFollowLeague = async (id) => {
  const data = await prisma.followLeague.update({
    where: {         
        Id: Number(id)
    },
    data: {
      is_deleted: true
    }
  });
  return data;
}
