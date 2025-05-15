import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const typeDefs = `
  enum TaskStatus {
    TODO
    IN_PROGRESS
    COMPLETED
  }

  enum TaskPriority {
    LOW
    MEDIUM
    HIGH
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    dueDate: String!
  }

  input CreateTaskInput {
    title: String!
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    dueDate: String!
  }

  input UpdateTaskInput {
    title: String!
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    dueDate: String!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

const tasks = [
  {
    id: '1',
    title: 'Setup GraphQL Server',
    description: 'Create and configure Apollo Server',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2024-03-15',
  },
  {
    id: '2',
    title: 'Create React App',
    description: 'Set up frontend with Apollo Client',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2024-03-16',
  },
];

const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find((task) => task.id === id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = {
        id: String(tasks.length + 1),
        ...input,
      };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_, { id, input }) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      const updatedTask = {
        ...tasks[taskIndex],
        ...input,
      };
      tasks[taskIndex] = updatedTask;
      return updatedTask;
    },
    deleteTask: (_, { id }) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return false;
      tasks.splice(taskIndex, 1);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
app.use('/graphql', expressMiddleware(server));

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
