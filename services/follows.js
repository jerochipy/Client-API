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
  console.log(data);

  const teamInfoArray = await Promise.all(data.map(async (followedTeam) => {
    const teamId = followedTeam.TeamId;
    const teamInfo = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });
    return teamInfo;
  }));

  console.log(teamInfoArray);

  return teamInfoArray;
}

export const findAllFollowPlayers = async (id) => {
  const data = await prisma.followPlayer.findMany({
    where: {
      is_deleted: false,
      UserId: id
    },
  });

  const playerInfoArray = await Promise.all(data.map(async (followedPlayer) => {
    const playerId = followedPlayer.PlayerId;
    const playerInfo = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
    });
    return playerInfo;
  }));

  return playerInfoArray;
}

export const findAllFollowLeagues = async (id) => {
  const data = await prisma.followLeague.findMany({
    where: {
      is_deleted: false,
      UserId: id
    },
  });

  const leagueInfoArray = await Promise.all(data.map(async (followedLeague) => {
    const leagueId = followedLeague.LeagueId;

    const leagueInfo = await prisma.league.findUnique({
      where: {
        id: leagueId,
      },
    });
    return leagueInfo;
  }));

  return leagueInfoArray;
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
  
  export const unFollowTeam = async (id, TeamId) => {
    const data = await prisma.followTeam.updateMany({
      where: {
        UserId: Number(id),
        TeamId: Number(TeamId),
      },
      data: {
        is_deleted: true,
      },
    });
    return data;
  };
  
  
  

export const unFollowPlayer = async (id, PlayerId) => {
  const data = await prisma.followPlayer.updateMany({
    where: { 
        UserId: Number(id),
        PlayerId: Number(PlayerId),
     },
    data: {
      is_deleted: true
    }
  });
  return data;
}

export const unFollowLeague = async (id, LeagueId) => {
  const data = await prisma.followLeague.updateMany({
    where: {         
      UserId: Number(id),
      LeagueId: Number(LeagueId),
    },
    data: {
      is_deleted: true
    }
  });
  return data;
}
