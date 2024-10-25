import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

import './style/style.css'

const client = new ApolloClient({
  dataIdFromObject: (obj) => obj.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="/song/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
