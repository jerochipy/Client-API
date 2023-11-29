import * as cron from 'cron'

export class DataApi {
  static baseUrl = 'https://v3.football.api-sports.io/'
  static updatesApi ({ timePattern, endpoint, params }) {
    // Tarea programada para ejecutarse una vez al día a la medianoche (00:00)
    const job = new cron.CronJob(timePattern, async () => {
      console.log('Ejecutando la tarea diaria...')
      const res = await DataApi.getData({ endpoint, params })
      if (res) {
        return res
      }
      return res.status(500)
    })
    job.start()
    return []
  }

  static async getData ({ endpoint, params }) {
    const url = this.baseUrl + endpoint
    const headers = {
      // 'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': '67767856d9121ae7b46593a39167d9ac'
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
