const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const { Album, Artist, Review, User } = require('../db/models/index');

const AlbumType = require('./TypeDefs/AlbumType');
const ArtistType = require('./TypeDefs/ArtistType');
const ReviewType = require('./TypeDefs/ReviewType');
const UserType = require('./TypeDefs/UserType');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryTable',
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { uid: { type: GraphQLString } },
      resolve(parent, args) {
        let parameters = {
          where: {},
        };

        if (args.uid) {
          parameters['where']['uid'] = args.uid;
        }

        return User.findAll(parameters).then((data) => {
          return data.map((user) => {
            console.log(user.dataValues);
            return user.dataValues;
          });
        });
      },
    },
    getAllArtists: {
      type: new GraphQLList(ArtistType),
      args: { name: { type: new GraphQLList(GraphQLString) } },
      resolve(parent, args) {
        let parameters = {
          where: {},
        };

        if (args.name) {
          parameters['where']['spreadsheetName'] = {
            [Op.in]: args.name,
          };
        }

        return Artist.findAll(parameters).then((data) => {
          return data.map((artist) => {
            return artist.dataValues;
          });
        });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          name: args.name,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });