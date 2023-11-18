import { number } from 'zod'
import { readJSON } from '../app/utils.js'
const fixtures = readJSON('../app/fixtures.json')

export class FixtureModel {
  static fixture = []
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

  static async getWithApi ({ params }) {
    const url = 'https://v3.football.api-sports.io/fixtures'
    const headers = {
      // 'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': '71e9962cf38604017c974f8be33f449b'
    }

    try {
      const response = await fetch(url + `?${params}`, { headers })
      if (response.ok) {
        const data = await response.json()
        const apiData = data.response
        fixtures.push(apiData)
        return apiData
      } else {
        console.error(`Error en la respuesta de la API: ${response.statusText}`)
        return null
      }
    } catch (error) {
      console.error(`Error al consultar la API: ${error.message}`)
      return null
    }
  }

  static async getByLeague ({ league, season}) {
    let res = this.fixture.filter(item => item.league.id == league && item.league.season == season)
    if (res.length === 0) {
      console.log('pide a la api')
      res = await this.getWithApi({ params: `leage=${league}&season${season}` })
      if (res) {
        this.fixture = this.fixture.concat(res)
      }
    }
    return res
  }

  static async getByMatchId ({ id }) {
    let res = this.fixture.filter(item => item.fixture.id == id)
    if (res.length === 0) {
      console.log('pide a la api')
      res = await this.getWithApi({ params: `id=${id}` })
      if (res) {
        this.fixture = this.fixture.concat(res)
      }
    }
    return res
  }
}
