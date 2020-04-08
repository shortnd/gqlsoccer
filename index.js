const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  enum Postion {
    GOALKEEPER
    FORWARD
    DEFENDER
  }
  type Player {
    id: ID!
    name: String!
    position: Postion
    squadNumber: Int
    bio: String
  }

  type Query {
    players: [Player]
    player(id: ID): Player
  }
`

const players = [
  {
    id: 1,
    name: "Nate Stinewasher",
    position: "GOALKEEPER",
    squadNumber: 0,
    bio: "This is a bio",
  },
  {
    id: 2,
    name: "Blake Goodman",
    position: "FORWARD",
    squadNumber: 10,
    bio: "This is a bio",
  },
];

const resolvers = {
  Query: {
    players: () => players,
    player: (obj, arg, context, info) => {
      const { id } = arg;
      const foundPlayer = players.find(p => p.id == id);
      return foundPlayer;
    }
  },
}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true })

server.listen({
  port: process.env.PORT || 4000
}).then(({ url }) => {
  console.log(`Server started at ${url}`)
});
