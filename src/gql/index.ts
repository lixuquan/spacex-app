import { gql } from "@apollo/client";

// export const QUERY_PAST_LAUNCHES =  gql`
//   query QUERY_PAST_LAUNCHES {
//     launchesPast(limit: 10) {
//       id
//       mission_name
//       launch_date_local
//       launch_site {
//         site_name_long
//       }
//       links {
//         article_link
//         video_link
//       }
//       rocket {
//         rocket_name
//         rocket_type
//       }
//       launch_success
//       details
//     }
//   }
// `;
    
export const QUERY_PAST_LAUNCHES = gql`
  query QUERY_PAST_LAUNCHES($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      launch_success
      details
    }
  }
`;

export const QUERY_LAUNCHES_NEXT = gql`
  query QUERY_LAUNCHES_NEXT {
    launchNext {
      launch_date_local
      id
      launch_site {
        site_name_long
      }
      launch_success
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      details
      mission_name
    }
  }
`;