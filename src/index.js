import React from 'react';
import ReactDOM from 'react-dom';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import buildApolloClient from './client';

const HTTP_GRAPHQL_URI = process.env.REACT_APP_HTTP_GRAPHQL_URI || 'http://localhost:8080/query';
const WS_GRAPHQL_URI = process.env.REACT_APP_WS_GRAPHQL_URI || 'ws://localhost:8080/query';

TimeAgo.addDefaultLocale(en);

const client = buildApolloClient(HTTP_GRAPHQL_URI, WS_GRAPHQL_URI);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
