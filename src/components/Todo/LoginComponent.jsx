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

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

        /*if(username === 'shravani' && password === 'dummy') {
            AuthenticationService.registerSuccessfulLogin(username, password);
            this.props.history.push(`/welcome/${username}`);
            // this.setState({hasLoginFailed: false, showSuccessMessage: true});
        } else {
            this.setState({hasLoginFailed: true, showSuccessMessage: false});
        }*/

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

    // handleUsernameChange(event) {
    //     this.setState({username: event.target.value})
    // }

    // handlePasswordChange(event) {
    //     this.setState({password: event.target.value});
    // }
    render() {
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                    <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

export default LoginComponent;