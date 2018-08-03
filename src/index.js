const { GraphQLServer } = require('graphql-yoga')





const resolvers = {
Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
        return context.db.query.links({}, info)
    }
},
Mutation:{
    post: (root, args, context, info) => {
        return context.db.mutation.createLink({
            data:{
                url: args.url,
                description: args.description,
            },
        }, info)
    }
},
Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
}
}

// 3 
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
      ...req,
      db: new WebGLShaderPrecisionFormat({
          typeDefs: 'src/generated/prisma.graphql',
          
      })
  })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))