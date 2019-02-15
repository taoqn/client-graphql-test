import React from 'react';
import './App.css';
import RecipeItem from './recipe/RecipeItem';
import { GET_ALL_RECIPES } from "../queries/query";
import { Query } from "react-apollo";

const App = () => (
    <Query query={GET_ALL_RECIPES}>
        {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>
            return (
                <ul>
                    {
                        data.getAllRecipes.map(recipe =>
                            <RecipeItem key={recipe._id} {...recipe} />
                        )
                    }
                </ul>
            );
        }}
    </Query>
);

export default App;