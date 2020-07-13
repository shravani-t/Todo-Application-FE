import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'shravani',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    loginClicked() {
        // currently shravani, and password is dummy
        const {
            username, 
            password, 
        } = this.state;

        // if you use basic authentication service
        // AuthenticationService.executeBasicAuthenticationService(username, password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(username, password);
        //         this.props.history.push(`/welcome/${username}`);                   
        //     }).catch(() => {
        //         this.setState({hasLoginFailed: true, showSuccessMessage: false});
        //     });

        // if you use jwt authentication service
        AuthenticationService.executeJwtAuthenticationService(username, password)
        .then((response) => {
            AuthenticationService.registerSuccessfulLoginForJwt(username, response.data.token);
            this.props.history.push(`/welcome/${username}`);                   
        }).catch(() => {
            this.setState({hasLoginFailed: true, showSuccessMessage: false});
        });
    }

    render() {
        const {
            hasLoginFailed,
            showSuccessMessage,
            username,
            password,
        } = this.state
        const {
            handleChange,
            loginClicked
        } = this

        return(
            <div>
                <h1>Login</h1>
                <div className="container justify-content-*-between">
                    {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {showSuccessMessage && <div>Login Successful</div>}
                    <div className="form-horizontal">
                        <div className="form-group text-center">
                            <label htmlFor="username">User Name: </label>
                            <input 
                                type="text" 
                                className="form-control w-50 m-auto" 
                                name="username" 
                                value={username} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group text-center">
                            <label htmlFor="password">Password: </label>
                            <input 
                                type="password" 
                                className="form-control w-50 m-auto"
                                name="password" 
                                value={password} 
                                onChange={handleChange} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-success" 
                            onClick={loginClicked}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;