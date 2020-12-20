import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router';
import Feed from '../components/Feed';
import useFeedByUsername from '../hooks/use-feed-by-username';

import useGithubUser, { NotFoundError } from '../hooks/use-github-user';

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($content: String!, $username: String!, $avatarUrl: String!) {
    createReview(
      reviewInput: { content: $content, githubUsername: $username, githubAvatarURL: $avatarUrl }
    ) {
      id
      content
      githubUsername
      githubAvatarURL
      createdAt
    }
  }
`;

function ReviewPage() {
  const { username } = useParams();
  const { data: user, error } = useGithubUser(username);
  const [addReview] = useMutation(CREATE_REVIEW_MUTATION);
  const { data, loading: reviewsLoading } = useFeedByUsername(username);
  const loading = user === undefined && !error;
  const [newReview, setNewReview] = useState('');

  if (loading) return <div className="flex items-center justify-center">Loading...</div>;
  if (error === NotFoundError)
    return <div className="flex items-center justify-center">User Not Found</div>;

  const reviewsTotal = data.reviews.length;
  const handleOnChange = (e) => {
    if (String(e.target.value).length > 140) return;

    setNewReview(e.target.value);
  };
  const handleSubmit = () => {
    if (newReview.length === 0 || !user) return;

    addReview({ variables: { content: newReview, username, avatarUrl: user.avatar_url } });
    setNewReview('');
  };
  const charactersInfo =
    newReview.length === 0 ? 'Max 140 characters' : `${140 - newReview.length} characters left`;

  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col items-center p-6">
        <img src={user.avatar_url} className="w-32 h-32 rounded-full" alt={username} />
        <h2 className="font-medium text-gray-700">{username}</h2>
        <ul className="flex flex-wrap justify-center sm:flex-nowrap space-x-3">
          <li className="align-middle">
            <span className="mr-2 text-xs font-semibold tracking-wider uppercase">Followers</span>
            <span className="text-sm font-medium text-purple-700">{user.followers}</span>
          </li>
          <li className="align-middle">
            <span className="mr-2 text-xs font-semibold tracking-wider uppercase">Following</span>
            <span className="text-sm font-medium text-purple-700">{user.following}</span>
          </li>
          <li className="align-middle">
            <span className="mr-2 text-xs font-semibold tracking-wider uppercase">Reviews</span>
            <span className="text-sm font-medium text-purple-700">
              {!reviewsLoading && reviewsTotal}
            </span>
          </li>
        </ul>
      </header>
      <div className="flex flex-col w-full">
        <div className="flex items-baseline justify-between text-xs">
          <label htmlFor="review" className="block font-medium text-gray-900">
            New Review
          </label>
          <div className="text-gray-500">{charactersInfo}</div>
        </div>
        <textarea
          className="block h-24 p-2 border rounded outline-none border-1 focus:border-purple-500"
          id="review"
          value={newReview}
          onChange={handleOnChange}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && (e.metaKey || e.ctrlKey) && username.length !== 0) {
              handleSubmit();
            }
          }}
        />
        <div className="self-end mt-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-2 font-medium text-white bg-purple-500 rounded outline-none hover:bg-purple-400"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Reviews</h3>
        <div className="space-y-5">
          <Feed loading={reviewsLoading} reviews={data.reviews} />
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
