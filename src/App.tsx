import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import PastLaunches from './components/PastLaunches';
import LaunchNext from './components/LaunchNext';

import './App.scss';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <PastLaunches />
        <LaunchNext />
      </ApolloProvider>
    </div>
  );
}

export default App;
