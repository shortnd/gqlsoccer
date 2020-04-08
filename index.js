const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');

const typeDefs = gql`
`


const resolvers = {
  Query: {},
  Mutation: {},
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
