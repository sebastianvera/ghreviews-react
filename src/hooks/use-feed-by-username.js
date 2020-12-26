import { useSubscription, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

const MAX_REVIEWS = 20;

const FEED_PRIVATE_SUBSCRIPTION = gql`
  subscription PrivateFeed($username: String!) {
    feedByUsername(username: $username) {
      total
      newReviews {
        id
        content
        githubUsername
        githubAvatarURL
        createdAt
      }
    }
  }
`;

function useFeedByUsername(username) {
  const { data, loading, error } = useSubscription(FEED_PRIVATE_SUBSCRIPTION, {
    variables: { username },
  });
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (!data || data.feedByUsername.newReviews.length === 0) return;

    setReviews((reviews) => [...data.feedByUsername.newReviews, ...reviews].slice(0, MAX_REVIEWS));
  }, [data]);

  const total = data?.feedByUsername?.total;
  return { data: { reviews, total }, loading, error };
}

export default useFeedByUsername;
