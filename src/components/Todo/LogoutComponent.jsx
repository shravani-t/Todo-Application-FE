import React, {Component} from 'react';

class LogoutComponent extends Component {
    render() {
        return(
            <React.Fragment>
                <h1>You are Logged Out</h1>
                <div className="container">
                    Thank you for using our application.
                </div>
            </React.Fragment>
        );
    }
}

export default LogoutComponent;