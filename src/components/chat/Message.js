import React from 'react';

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {this.props.message.content}
            </div>
        );
    }
}

export default Message;
