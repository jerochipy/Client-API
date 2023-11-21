export class DataApi {
  static baseUrl = 'https://v3.football.api-sports.io/'
  static async getData ({ endpoint, params }) {
    const url = this.baseUrl + endpoint
    const headers = {
      // 'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': '5df9f31d6796c6fec507a3d72502182a'
    }

    try {
      const response = await fetch(url + `${params !== undefined ? '?' + params : ''}`, { headers })
      if (response.ok) {
        const data = await response.json()
        const apiData = data.response
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
}
