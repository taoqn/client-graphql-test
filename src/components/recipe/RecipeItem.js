import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ _id, name, category, likes }) => (
    <li>
        <Link to={`/recipe/${_id}`}><h4>{name}</h4></Link>
        <p>
            <strong>{category}</strong>
        </p>
        <p style={{ marginBottom: "0"}}>
            <strong>{likes}</strong>
        </p>
    </li>
);

export default RecipeItem;