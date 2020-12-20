import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';

function Review({ username, timestamp, review, avatar }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex">
        <Link to={`/${username}`} className="w-10 h-10 flex justify-center items-center">
          <img src={avatar} className="rounded-full" alt={username} />
        </Link>
        <div className="flex flex-col ml-2">
          <Link to={`/${username}`} className="w-32 font-bold text-purple-600 truncate">
            {username}
          </Link>
          <div className="text-xs font-light text-gray-700">
            <ReactTimeAgo date={new Date(timestamp)} />
          </div>
        </div>
      </div>
      <p className="mt-2 sm:ml-4 sm:mt-0">{review}</p>
    </div>
  );
}

export default Review;
