import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function GithubInput() {
  const [username, setUsername] = useState('');

  const history = useHistory();
  const handleSubmit = () => {
    history.push(`/${username}`);
  };

  return (
    <div className="flex flex-wrap">
      <input
        className="p-2 border rounded-l-lg outline-none border-1 focus:border-gray-500"
        placeholder="github username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'Enter' && username.length !== 0) {
            handleSubmit();
          }
        }}
      />
      <div className="">
        <button
          className="flex px-3 py-2 font-medium text-white bg-purple-500 border border-purple-500 rounded-r-lg outline-none flex-nowrap hover:bg-purple-400"
          disabled={username.length === 0}
          onClick={handleSubmit}
        >
          Add review
        </button>
      </div>
    </div>
  );
}

export default GithubInput;
