import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage: '',
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    render() {
        const { match } = this.props

        return (
            <React.Fragment>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {match.params.name}. You can manage your Todos <Link to="/todos">here</Link>
                </div>
            </React.Fragment>
        );
    }

    retrieveWelcomeMessage() {
        const { handleSuccessfulResponse, handleError } = this;
        const { match } = this.props
        HelloWorldService.executeHelloWorldPathVariableService(match.params.name)
        .then( response => handleSuccessfulResponse(response) )
        .catch( error => handleError(error) );
    }

    handleSuccessfulResponse(response) {
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {
        const { message, response } = error

        let errorMessage = '';
        if(message) {
            errorMessage += message;
        }
        if(response?.data) {
            errorMessage += response.data.message;
        }
        this.setState({ welcomeMessage: errorMessage })
    }
}

export default WelcomeComponent;