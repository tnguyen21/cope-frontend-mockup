export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
      id
      node_id
      createdAt
      type
      name
      index
      owner
      content
      editors
      updatedAt
    }
  }
`
export const updateNode = /* GraphQL */ `
  mutation UpdateNode(
    $input: UpdateNodeInput!
    $condition: ModelNodeConditionInput
  ) {
    updateNode(input: $input, condition: $condition) {
      id
      status
      type
      createdAt
      updatedAt
      owner
      assets {
        items {
          id
          node_id
          createdAt
          type
          name
          index
          owner
          content
          editors
          updatedAt
        }
        nextToken
      }
      assetsPr {
        items {
          id
          node_id
          createdAt
          type
          name
          index
          owner
          content
          editors
          updatedAt
        }
        nextToken
      }
      edges {
        items {
          id
          edge_id
          node_id
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`
