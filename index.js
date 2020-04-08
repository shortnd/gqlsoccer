const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');

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
    team: Team
  }

  type Team {
    id: ID!
    name: String!
    league: String!
    players: [Player]
  }

  type Query {
    players: [Player]
    player(id: ID): Player
    teams: [Team]
    team(id: ID): Team
  }

  input PlayerInput {
    id: ID
    name: String
    position: Postion
    squadNumber: Int
    bio: String
    team: TeamInput
  }

  input TeamInput {
    id: ID
    name: String
    league: String
    players: [PlayerInput]
  }

  type Mutation {
    addPlayer(player: PlayerInput): [Player]
  }
`

const teams = [
  {
    id: "1",
    name: "Detroit City FC",
    league: "NISA",
    players: ["1", "2"]
  }
]

let players = [
  {
    id: "1",
    name: "Nate Stinewasher",
    position: "GOALKEEPER",
    squadNumber: 0,
    bio: "This is a bio",
    team: "1"
  },
  {
    id: "2",
    name: "Blake Goodman",
    position: "FORWARD",
    squadNumber: 10,
    bio: "This is a bio",
    team: "1"
  },
];

const resolvers = {
  Query: {
    players: () => players,
    player: (obj, arg, context, info) => {
      const { id } = arg;
      const foundPlayer = players.find(p => p.id == id);
      return foundPlayer;
    },
    teams: () => teams,
    team: (obj, arg, context, info) => {
      const { id } = arg;
      const foundTeam = teams.find(t => t.id == id)
      return foundTeam;
    }
  },
  Mutation: {
    addPlayer: (obj, { player }, context) => {
      // Do mutation or db stuff
      const newPlayerArray = [
        ...players,
        // Add new player
        player
      ]
      // return data as expected in schema
      return newPlayerArray;
    }
  },
  Player: {
    team: (obj, arg, context, info) => {
      const filteredTeam = teams.filter(team => team.id == obj.team)
      return filteredTeam[0];
    }
  },
  Team: {
    players: (obj, arg, context, info) => {
      const filteredPlayers = players.filter(player => {
        return obj.players.includes(player.id)
      })
      return filteredPlayers
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true })

server.listen({
  port: process.env.PORT || 4000
}).then(({ url }) => {
  console.log(`Server started at ${url}`)
});
