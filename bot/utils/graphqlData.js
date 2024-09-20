/**
 * @typedef {typeof import('./graphql').Query} QueryType
 * @typedef {typeof import('./graphql').Mutation} MutationType
 *
 * @param {{ mutation: MutationType, variables: Object, query: QueryType }} data
 * @returns {string}
 */
function graphqlData(data) {
  return JSON.stringify([data]);
}

module.exports = graphqlData;
