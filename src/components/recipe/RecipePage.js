import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { GET_RECIPE } from "../../queries/query";
import LikeRecipe from "./LikeRecipe";

const RecipePage = ({ match }) => {
    const { _id } = match.params;
    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading</div>
                if (error) return <div>Error</div>
                return (
                    <div className="App">
                        <h2>{data.getRecipe.name}</h2>
                        <p><strong>Category:</strong> {data.getRecipe.name}</p>
                        <p><strong>Description:</strong> {data.getRecipe.description}</p>
                        <p><strong>Instructions:</strong> {data.getRecipe.instructions}</p>
                        <p><strong>Created Date:</strong> {data.getRecipe.createdDate}</p>
                        <p><strong>Likes:</strong> {data.getRecipe.likes}</p>
                        <LikeRecipe _id={_id}/>
                    </div>
                );
            }}
        </Query>
    )
};

export default withRouter(RecipePage);