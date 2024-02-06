// Environments variables declared here
/* eslint-disable node/no-process-env */

export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 0),
  MongoUri: (process.env.MONGODB_URI ?? ''),
} as { NodeEnv: string, Port: number, MongoUri: string }
