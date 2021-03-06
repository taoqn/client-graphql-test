import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Error from "../Error";
import { SIGNUP_USER } from '../../queries/query';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
};

class Signup extends React.Component {

    state = { ...initialState };

    clearState = () => {
        this.setState( { ...initialState });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.signupUser.token);
            this.clearState();
            this.props.history.push('/');
        })
    }

    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state;
        return !username || !email || !password || password !== passwordConfirmation;
    }

    render() {

        const { username, email, password, passwordConfirmation } = this.state;

        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                    {(signupUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                                <input type="text" name="username" placeholder="username" value={username}
                                    onChange={this.handleChange} />
                                <input type="email" name="email" placeholder="Email Address" value={email}
                                    onChange={this.handleChange} />
                                <input type="password" name="password" placeholder="Password" value={password}
                                    onChange={this.handleChange} />
                                <input type="password" name="passwordConfirmation" placeholder="Confirm password"
                                    value={passwordConfirmation} onChange={this.handleChange} />
                                <button type="submit" className="button-primary" 
                                    disabled={loading || this.validateForm()}>Submit</button>
                                {error && <Error error={error.message} />}
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signup);