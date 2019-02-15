import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Error from "../Error";
import { SIGNIN_USER } from '../../queries/query';

const initialState = { username: "", password: "" };

class Signin extends React.Component {

    state = { ...initialState };

    clearState = () => {
        this.setState( { ...initialState });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event, signinUser) => {
        event.preventDefault();
        signinUser().then(async ({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    }

    validateForm = () => {
        const { username, password } = this.state;
        return !username || !password;
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="App">
                <h2 className="App">Login</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                                <input type="text" name="username" placeholder="username" value={username}
                                    onChange={this.handleChange} />
                                <input type="password" name="password" placeholder="Password" value={password}
                                    onChange={this.handleChange} />
                                <button type="submit" className="button-primary" 
                                    disabled={loading || this.validateForm()}>Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signin);