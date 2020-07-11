import React, {Component} from 'react';
import {withRouter} from 'react-router';

class FooterComponent extends Component {
    render() {
        return(
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2020.</span>
            </footer>
        );
    }
}

export default withRouter(FooterComponent);