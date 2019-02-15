import React from 'react';
import { Mutation } from 'react-apollo'
import withSession from "../../withSession";
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries/query";

class LikeRecipe extends React.Component {

    state = {
        username: ''
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            const { username, favorites } = this.props.session.getCurrentUser;
            const { _id } = this.props;
            this.setState({
                liked: favorites.findIndex(favorites => favorites._id === _id) > -1,
                username
            });
        }
    }

    handleClick = (likeRecipe, unlikeRecipe) => {
        this.setState(prevState => ({ liked: !prevState.liked }), () => this.handleLike(likeRecipe, unlikeRecipe));
    };

    handleLike = (likeRecipe, unlikeRecipe) => {
        if (this.state.liked) {
            likeRecipe().then(async ({ data }) => await this.props.refetch());
        } else {
            unlikeRecipe().then(async ({ data }) => await this.props.refetch());
        }
    };

    updateLike = (cache, { data: { likeRecipe } }) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
            }
        })
    }

    updateUnLike = (cache, { data: { unlikeRecipe } }) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
            }
        })
    }

    render() {
        const { liked, username } = this.state;
        const { _id } = this.props;
        return (
            <Mutation mutation={UNLIKE_RECIPE} variables={{ _id, username }} update={this.updateUnLike}>
                {unlikeRecipe => (
                    <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }} update={this.updateLike}>
                        {likeRecipe => (
                            username && (
                                <button onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                                    {liked ? 'Unlike' : 'Like'}
                                </button>
                            )
                        )}
                    </Mutation>
                )}
            </Mutation>
        );
    }
}

export default withSession(LikeRecipe);