/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      description
      file {
        bucket
        region
        key
      }
      flagged
      tagged
      createdAt
      updatedAt
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        file {
          bucket
          region
          key
        }
        flagged
        tagged
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
