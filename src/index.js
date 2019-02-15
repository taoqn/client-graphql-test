import React from "react";
import ReactDOM from 'react-dom';

import './index.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import withSession from './withSession';
import Router from './Router';

const client = new ApolloClient({
    uri: "https://react-apollo-taoqn.herokuapp.com/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    },
    onError: ({ networkError }) => {
        if (networkError) {
            console.log('Network Error', networkError);
        }
    }
});

const RootWithSession = withSession(Router);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, document.getElementById("root"));