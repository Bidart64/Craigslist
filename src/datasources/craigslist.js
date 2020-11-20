const { DataSource } = require('apollo-datasource')
const craigslist = require('node-craigslist');

class CraigslistAPI extends DataSource {
  constructor() {
    super();
  }

  async searchForCars(search) {
    try {
      let ret = []
      const { maxYear, cities, hasPic, text} = search
      const client = new craigslist.Client({})
      // console.log(client)
      for (const city of cities) {
        const options = {
          hasPic: hasPic,
          category : 'cta',
          maxYear : `${maxYear}`,
          searchTitlesOnly: true,
          city: `${city}`
        };
        const results = await client.search(options, `${text}`)
        for (const result of results) {
          // console.log(result)
          // const details = await client.details(result)
          // console.log(details)
          ret.push({...result})
        }
      }
      return ret
    } catch (err) {
      throw err
    }
  }

  
}

module.exports = CraigslistAPI;
