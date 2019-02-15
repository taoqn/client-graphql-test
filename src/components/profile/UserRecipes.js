import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from "react-apollo";
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from "../../queries/query";

const handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
        deleteUserRecipe().then(({ data }) => {
            console.log(data);
        })
    }
}

const UserRecipes = ({ username }) => (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>
            console.log(data);
            return (
                <ul>
                    <h3>Your Recipes</h3>
                    {!data.getUserRecipes.length && (
                        <p>
                            <strong>You have not added any recipes yet</strong>
                        </p>
                    )}
                    {
                        data.getUserRecipes.map(recipe => (
                            <li className="App">
                                <Link to={`/recipe/${recipe._id}`}><h4>{recipe.name}</h4></Link>
                                <p style={{ marginBottom: "0" }}><strong>{recipe.likes}</strong></p>
                                <Mutation mutation={DELETE_USER_RECIPE} variables={{ _id: recipe._id }}
                                    refetchQueries={() => [
                                        { query: GET_ALL_RECIPES },
                                        { query: GET_CURRENT_USER }
                                    ]}
                                    update={(cache, { data: { deleteUserRecipe } }) => {
                                        const { getUserRecipes } = cache.readQuery({
                                            query: GET_USER_RECIPES,
                                            variables: { username }
                                        });
                                        cache.writeQuery({
                                            query: GET_USER_RECIPES,
                                            variables: { username },
                                            data: {
                                                getUserRecipes: getUserRecipes.filter(
                                                    recipe => recipe._id !== deleteUserRecipe.id
                                                )
                                            }
                                        })
                                    }}
                                >
                                    {(deleteUserRecipe, attrs = {}) => (
                                        <p className="delete-button" style={{ color: 'red' }}
                                            onClick={() => handleDelete(deleteUserRecipe)}
                                        >
                                            {attrs.loading ? "deleting..." : "X"}
                                        </p>
                                    )}
                                </Mutation>
                            </li>
                        ))
                    }
                </ul>
            );
        }}
    </Query>
);

export default UserRecipes;