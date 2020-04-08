const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');

const typeDefs = gql`
  type Team {
    id: ID!
    name: String!
    league: String!
    W: Int
    D: Int
    L: Int
    Latest: String
  }

  type Query {
    getTeams: [Team]
    getTeam: Team
  }
`

const teams = [
  {
    id: "1",
    name: "Detroit City FC",
    league: "NISA",
    W: 2,
    L: 0,
    D: 0,
    Latest: "W"
  }
]

const resolvers = {
  Query: {
    getTeams: (obj, arg, context, info) => teams,
    getTeam: (obj, { id }, context, info) => {
      const filterTeam = teams.filter(t => t.id === id)
      return filterTeam[0];
    }
  },
  // Mutation: {},
  // Player: {
  //   team: (obj, arg, context, info) => {
  //     const filteredTeam = teams.filter(team => team.id == obj.team)
  //     return filteredTeam[0];
  //   }
  // },
  // Team: {
  //   players: (obj, arg, context, info) => {
  //     const filteredPlayers = players.filter(player => {
  //       return obj.players.includes(player.id)
  //     })
  //     return filteredPlayers
  //   }
  // }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  // context: ({ req }) => {
  //   const fakeUser = {
  //     userId: "hello-im-a-user"
  //   }
  //   return {
  //     ...fakeUser
  //   };
  // }
})

server.listen({
  port: process.env.PORT || 4000
}).then(({ url }) => {
  console.log(`Server started at ${url}`)
});
