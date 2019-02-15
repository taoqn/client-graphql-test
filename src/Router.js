import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Navbar from './components/Navbar';
import AddRecipe from './components/recipe/AddRecipe';
import RecipePage from './components/recipe/RecipePage';
import Search from './components/recipe/Search';
import Profile from './components/profile/Profile';

const Router = ({ refetch, session }) => (
    <BrowserRouter>
        <Fragment>
            <Navbar session={session} />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/search" component={Search} />
                <Route path="/signin" render={() => <Signin refetch={refetch} />} />
                <Route path="/signup" render={() => <Signup refetch={refetch} />} />
                <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
                <Route path="/recipe/:_id" component={RecipePage} />
                <Route path="/profile" render={() => <Profile session={session} />} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);

export default Router;