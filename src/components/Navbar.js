import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Signout from './auth/Signout';

const Navbar = ({ session }) => (
    <nav>
        {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
    </nav>
);

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/recipe/add">Add Recipe</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><Signout/></li>
        </ul>
        <h2 className="App">Welcome, <b>{session.getCurrentUser.username}</b></h2>
    </Fragment>
);

const NavbarUnAuth = () => (
    <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/signin">Sign In</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
    </ul>
);

export default Navbar;