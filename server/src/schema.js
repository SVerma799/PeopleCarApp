import { gql } from "apollo-server-core";
import { find, remove } from "lodash";

const people = [
  {
    id: "1",
    firstName: "Shubham",
    lastName: "Verma",
  },
  {
    id: "2",
    firstName: "Adam",
    lastName: "Apple",
  },
  {
    id: "3",
    firstName: "Lam",
    lastName: "Tony",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Lamborghini",
    model: "Aventador",
    price: "230000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LFA",
    price: "190000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Accord",
    price: "45000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Toyota",
    model: "Supra",
    price: "660000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "F150",
    price: "90000",
    personId: "2",
  },
];

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Car {
    id: String!
    make: String!
    model: String!
    year: Int!
    price: Float!
    personId: String!
  }

  type Query {
    person(id: String!): Person
    people: [People]
    car(id: String): Car
    cars: [Car]
  }

  type Mutation {
    addPerson(id: String, firstName: String!, lastName: String!): Person

    updatePerson(id: String!, firstName: String, lastName: String): Person

    removePerson(id: String!): Person
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    person(parent, args, context, info) {
      return find(people, { id: args.id });
    },
  },

  Mutation: {
    /* Mutation functions for people */
    addPerson(root, args) {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);
      return newPerson;
    },

    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id });
      if (!removedPerson) {
        throw new Error(`Couldn't find the person with id ${args.id}`);
      }
      remove(people, { id: args.id });
      return removedPerson;
    },
  },
};

export { typeDefs, resolvers };
