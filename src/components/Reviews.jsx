import { useTransition, config, animated } from 'react-spring';

import Review from './Review';

const Reviews = ({ items }) => {
  const transitions = useTransition(items, (review) => review.id, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(-25%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: { opacity: 0, height: 0 },
  });
  return (
    <div className="space-y-5">
      {transitions.map(
        ({ props, item: { id, githubUsername, content, createdAt, githubAvatarURL } }) => (
          <animated.div key={id} style={props}>
            <Review
              id={id}
              username={githubUsername}
              review={content}
              timestamp={createdAt}
              avatar={githubAvatarURL}
            />
          </animated.div>
        ),
      )}
    </div>
  );
};

export default Reviews;
