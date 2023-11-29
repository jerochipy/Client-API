import { DataApi } from './dataApi.js'

export class TeamsModel {
  static teams = []

  static updateTeams () {
    this.teams = DataApi.updatesApi({ timePattern: '05 21 * * *', endpoint: 'teams' })
  }

  static async getAll ({ league, season }) {
    let res = this.teams.filter(item => item.team.league == league)
    if (res.length === 0) {
      console.log('pide a la api')
      res = await DataApi.getData({ endpoint: 'teams', params: `league=${league}&season=${season}` })
      if (res) {
        this.teams = this.teams.concat(res)
      }
    }
    console.log(res[0])
    return res
  }

  static async getById ({ id }) {
    let res = this.teams.find(item => item.team.id == id)
    if (res === undefined) {
      console.log('pide a la api')
      res = await DataApi.getData({ endpoint: 'teams', params: `id=${id}` })
      if (res) {
        this.leagues = this.teams.concat(res)
      }
    }
    return res
  }
}

TeamsModel.updateTeams()
