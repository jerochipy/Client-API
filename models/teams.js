import { DataApi } from './dataApi.js'

export class TeamsModel {
  static teams = []

  static async getAll ({ league, season }) {
    let res = this.teams
    if (res.length === 0) {
      console.log('pide a la api')
      res = await DataApi.getData({ endpoint: 'teams', params: `league=${league}&season=${season}` })
      if (res) {
        this.leagues = this.teams.concat(res)
      }
    }
    console.log(res[0])
    return res
  }

  static async getById ({ id }) {
    let res = this.leagues.filter(item => item.leagues.id == id)
    if (res.length === 0) {
      console.log('pide a la api')
      res = await DataApi.getData({ endpoint: 'teams', params: `id=${id}` })
      if (res) {
        this.leagues = this.teams.concat(res)
      }
    }
    return res
  }
}
