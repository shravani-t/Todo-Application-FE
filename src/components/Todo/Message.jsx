import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

        this.setTimer = this.setTimer.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.childern !== this.props.children) {
            this.setTimer();
            this.setState({ visible: true })
        }
    }

    componentDidMount() {
        this.setTimer();
    }

    componentWillUnmount() {
        clearTimeout(this._timer);
    }

    setTimer() {
        if(this._timer != null) {
            clearTimeout(this._timer);
        }

        this._timer = setTimeout( () => {
            this.setState({ visible: false });
            this._timer = null;
        }, this.props.delay)
    }

    render() {
        const { visible } = this.state;
        const { className, children } = this.props;
        return (
            visible ? 
                <div className={className}>{children}</div>
                : <span />
        )
    }
}

export default Message;