import { DataApi } from './dataApi.js'

import * as cron from 'cron'

export class LeaguesModel {
  static leagues = []

  static updateLeagues () {
    // Tarea programada para ejecutarse una vez al día a la medianoche (00:00)
    this.leagues = DataApi.updatesApi({ timePattern: '05 21 * * *', endpoint: 'leagues' })
  }
  // static async getWithLeagueApi ({ league, season }) {
  //   const url = 'https://v3.football.api-sports.io/fixtures'
  //   const headers = {
  //     // 'x-rapidapi-host': 'v3.football.api-sports.io',
  //     'x-apisports-key': '71e9962cf38604017c974f8be33f449b'
  //   }

  //   try {
  //     const response = await fetch(url + `?league=${league}&season=${season}`, { headers })
  //     if (response.ok) {
  //       const data = await response.json()
  //       const apiData = data.response
  //       fixtures.push(apiData)
  //       return apiData
  //     } else {
  //       console.error(`Error en la respuesta de la API: ${response.statusText}`)
  //       return null
  //     }
  //   } catch (error) {
  //     console.error(`Error al consultar la API: ${error.message}`)
  //     return null
  //   }
  // }

  static async getAll ({ startIndex, endIndex }) {
    let res = this.leagues
    console.log(res)
    if (res.length === 0) {
      console.log('pide a la api')
      res = await DataApi.getData({ endpoint: 'leagues' })
      console.log(res)
      if (res) {
        this.leagues = this.leagues.concat(res)
      }
    }
    // return res
    return startIndex === undefined || endIndex === undefined ? res : res.slice(startIndex, endIndex)
  }

  static async getById ({ id }) {
    let res = this.leagues.filter(item => item.league.id == id)
    if (res.length === 0) {
      console.log('pide a la api')
      res = await DataApi.getData({ endpoint: 'leagues', params: `id=${id}` })
      if (res) {
        this.leagues = this.leagues.concat(res)
      }
    }
    return res
  }
}
LeaguesModel.updateLeagues()
