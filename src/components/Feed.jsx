import Reviews from './Reviews';

function Feed({ className = '', reviews, loading = false }) {
  return (
    <div className={className}>
      <div className="w-full">
        {loading && 'Loading...'}
        <Reviews items={reviews} />
      </div>
    </div>
  );
}

export default Feed;
