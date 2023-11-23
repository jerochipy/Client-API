export class DataApi {
  static baseUrl = 'https://v3.football.api-sports.io/'
  static async getData ({ endpoint, params }) {
    const url = this.baseUrl + endpoint
    const headers = {
      // 'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': '06ae59572ac9e4c1659ee7af8a9247c8'
    }

    try {
      const response = await fetch(url + `${params !== undefined ? '?' + params : ''}`, { headers })
      if (response.ok) {
        const data = await response.json()
        const apiData = data.response
        console.log(data)
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
