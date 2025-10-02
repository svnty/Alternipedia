import { createYoga } from 'graphql-yoga';
import { schema } from '@/graphql/schema';
import { prisma } from '@/lib/prisma';

const yoga = createYoga({
  schema,
  graphiql: true, // playground
  context: ({ request }) => ({ prisma, request }),
});

export default yoga;