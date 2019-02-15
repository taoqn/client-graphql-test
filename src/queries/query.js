import gql from "graphql-tag";
import { recipeFragments } from "./fragment";

/* Recipe Mutations */
export const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            _id
            name
            category
        }
    }
`;

export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

export const ADD_RECIPE = gql`
    mutation($name: String!, $description: String!, $category: String!, $instructions: String!, $username: String) {
        addRecipe(name: $name, description: $description, category: $category, instructions: $instructions, username: $username) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

export const DELETE_USER_RECIPE = gql`
    mutation($_id: ID!) {
        deleteUserRecipe(_id: $_id) {
            _id
        }
    }
`;

export const SEARCH_RECIPE = gql`
    query($searchTemp: String) {
        searchRecipes(searchTemp: $searchTemp) {
            _id
            name
            likes
            category
        }
    }
`;

/* Recipes Query */
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            joinDate
            email
            favorites {
                _id
                name
            }
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;

export const GET_USER_RECIPES = gql`
    query($username: String!) {
        getUserRecipes(username: $username) {
            _id
            name
            likes
        }
    }
`;

export const LIKE_RECIPE = gql`
    mutation($_id: ID!, $username: String!) {
        likeRecipe(_id: $_id, username: $username) { 
            ...LikeRecipe
        }
    }
    ${recipeFragments.like}
`;

export const UNLIKE_RECIPE = gql`
    mutation($_id: ID!, $username: String!) {
        unlikeRecipe(_id: $_id, username: $username) { 
            ...LikeRecipe 
        }
    }
    ${recipeFragments.like}
`;