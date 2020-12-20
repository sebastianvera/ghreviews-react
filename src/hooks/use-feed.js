import { useState, useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';

const MAX_REVIEWS = 20;

const FEED_PUBLIC_SUBSCRIPTION = gql`
  subscription PublicFeed {
    feed {
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

function useFeed() {
  const { data, loading, error } = useSubscription(FEED_PUBLIC_SUBSCRIPTION);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (!data || !data.feed || data.feed.newReviews.length === 0) return;

    setReviews((reviews) => [...data.feed.newReviews, ...reviews].slice(0, MAX_REVIEWS));
  }, [data]);

  const total = data?.feed?.total ?? 0;
  return { data: { reviews, total }, loading, error };
}

export default useFeed;
