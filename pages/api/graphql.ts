import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
 
const yoga = createYoga({ schema, graphiql: true, graphqlEndpoint: '/api/graphql' });

export default yoga;