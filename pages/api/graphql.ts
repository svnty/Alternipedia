import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
 
const yoga = createYoga({ schema, graphiql: true, graphqlEndpoint: '/api/graphql' });

const server = createServer(yoga);
 
server.listen(3001, () => {
  console.info('Server is running on http://localhost:3001/graphql')
});