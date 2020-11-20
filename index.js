const { ApolloServer } = require('apollo-server-express')


const { createServer } = require('http')
const { json } = require('body-parser')

const express = require('express')
const fs = require('fs')
const logger = require('./src/lib/logger')
const typeDefs = fs.readFileSync("./schema.gql", "utf8")
const resolvers = require('./src/resolvers')

// Datasources
const CraigslistAPI = require('./src/datasources/craigslist')

// const store = createStore()
const port = 4000
const app = express()
const dataSources = () => ({
  craigslistAPI: new CraigslistAPI(),
})

app.use(json({
  verify: (req, _, buf) => {
    req.rawBody = buf
  }
}))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

server.applyMiddleware({ app })
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

const options = {
  port: 4000,
  host: "0.0.0.0"
}

httpServer.listen(options, () => {
  logger.debug(`server ready at http://localhost:${port}${server.graphqlPath}`)
  logger.debug(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
})

