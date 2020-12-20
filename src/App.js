import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <Router>
      <main className="flex flex-col mx-auto max-w-screen-md">
        <header className="p-4 text-3xl font-medium text-black">
          <Link to="/">ghreviews</Link>
        </header>
        <section className="px-4">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/:username">
              <ReviewPage />
            </Route>
          </Switch>
        </section>
      </main>
    </Router>
  );
}

export default App;
