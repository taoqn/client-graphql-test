import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from "../../queries/query";
import { withRouter } from 'react-router-dom';
import Error from "../Error";
import withAuth from '../../withAuth';

const initialState = { name: "", category: "Breakfast", instructions: "", description: "", username: "" };

class AddRecipe extends React.Component {
    state = { ...initialState };

    componentDidMount() {
        this.setState({
            username: this.props.session.getCurrentUser.username
        });
    }

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            this.clearState();
            this.props.history.push('/');
        })
    }

    validateForm = () => {
        const { name, category, instructions, description } = this.state;
        return !name || !category || !instructions || !description;
    }

    updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        })
    }

    render() {
        const { name, category, instructions, description, username } = this.state;
        return (
            <Mutation mutation={ADD_RECIPE}
                variables={{ name, category, description, instructions, username }}
                refetchQueries={() => [
                    { query: GET_USER_RECIPES, variables: { username } }
                ]}
                update={this.updateCache}
            >
                {(addRecipe, { data, loading, error }) => {
                    return (
                        <div className="App">
                            <h2 className="App">Add Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                                <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={name} />
                                <select name="category" value={category} onChange={this.handleChange}>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Hacker">Hacker</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                                <input type="text" name="description" placeholder="Add Description"
                                    value={description} onChange={this.handleChange} />
                                <textarea name="instructions" placeholder="Add Instructions"
                                    value={instructions} onChange={this.handleChange} />
                                <button type="submit" disabled={loading || this.validateForm()}
                                    className="button-primary">Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));