import GithubInput from '../components/GithubInput';

import Feed from '../components/Feed';
import useFeed from '../hooks/use-feed';

function LandingPage() {
  const {
    data: { reviews },
    loading,
  } = useFeed();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <p className="py-4 text-lg font-medium sm:text-2xl leading-10">
          Add anonymous reviews to Github Users
        </p>
        <GithubInput />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Latest Reviews</h3>
        <Feed reviews={reviews} loading={loading} />
      </div>
    </div>
  );
}

export default LandingPage;
