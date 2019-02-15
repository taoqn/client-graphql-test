import React from 'react';
import RecipeItem from "../recipe/RecipeItem";

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`
}

const UserInfo = ({ session }) => (
    <div className="App">
        <h3>User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
        <ul>
            <h3>{session.getCurrentUser.username}'s Favorites</h3>
            {session.getCurrentUser.favorites.map(favorite => <RecipeItem key={favorite._id} {...favorite} />)}
            {!session.getCurrentUser.favorites.length && (
                <p>
                    <strong>You have no favorites currently. Go add some !</strong>
                </p>
            )}
        </ul>
    </div>
);

export default UserInfo;