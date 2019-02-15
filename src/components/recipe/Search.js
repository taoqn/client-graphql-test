import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { SEARCH_RECIPE } from "../../queries/query";
import RecipeItem from "./RecipeItem";

class Search extends React.Component {

    state = {
        searchResults: []
    }

    handleChange = ({ results }) => {
        this.setState({
            searchResults: results
        })
    };

    render() {
        const { searchResults } = this.state;
        return (
            <ApolloConsumer>
                {client => (
                    <div className="App">
                        <input type="search" placeholder="Search for Recipe"
                            onChange={async event => {
                                event.persist();
                                const { data } = await client.query({
                                    query: SEARCH_RECIPE,
                                    variables: { searchTemp: event.target.value }
                                });
                                this.handleChange(data);
                            }}
                        />
                        <ul>{searchResults.map(recipe => <RecipeItem key={recipe._id} {...recipe} />)}</ul>
                    </div>
                )};
            </ApolloConsumer>
        );
    }
};

export default Search;