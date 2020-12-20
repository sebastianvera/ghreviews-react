import useSWR from 'swr';

const API_URL = 'https://api.github.com/users';

export const NotFoundError = new Error('Not Found');

const notFoundUsers = new Set();

function useGithubUser(username) {
  return useSWR(
    `${API_URL}/${username}`,
    async (url) => {
      const res = await fetch(url);
      if (res.status === 404) {
        notFoundUsers.add(username);
        throw NotFoundError;
      }
      return await res.json();
    },
    { shouldRetryOnError: false },
  );
}

export default useGithubUser;
