import { gql } from '@apollo/client';

export const GET_USER_REPOS = gql`
  query GetUserRepos($username: String!, $first: Int!) {
    user(login: $username) {
      repositories(first: $first, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
          stargazerCount
          forkCount
          updatedAt
          url
          primaryLanguage {
            name
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
