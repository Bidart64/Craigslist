

const resolvers = {
  Query: {
    searchForCars: (_, { search }, {dataSources}) =>
      dataSources.craigslistAPI.searchForCars(search),
      // console.log(dataSources.craigslistAPI),
  },
}

module.exports = resolvers