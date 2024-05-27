import path from 'path';
import { sync } from 'glob';
import { loadSchemaSync } from '@graphql-tools/load';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadFilesSync } from '@graphql-tools/load-files';
import { buildSubgraphSchema } from "@apollo/subgraph";

// Load and merge all type definitions into a single schema
const typeDefs = mergeTypeDefs(
    loadSchemaSync('./**/graphql/**/schema/**/*.graphql', { loaders: [new GraphQLFileLoader()] })
);

// Load and merge all resolver files into a single resolver object
const resolvers: any = mergeResolvers(
  loadFilesSync('./**/graphql/**/resolvers/**/*.ts', { ignoreIndex: true })
);

// Map each file to an object containing the transformer and name
const directiveTransformers = sync(`./**/graphql/**/directives/**/!(index).ts`).map(file => {
    const name = path.basename(file, '.ts');
    const transformer = require(path.resolve(file)).default;
    return { transformer, name };
});

// Create an executable GraphQL schema
let schema = buildSubgraphSchema({ typeDefs, resolvers });

// Apply directive transformers to the schema
directiveTransformers.forEach(({ transformer, name }) => {
    schema = transformer(schema, name);
});

export { schema };
