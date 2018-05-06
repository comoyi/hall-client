import React from 'react';
import Message from './Message';

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let lists = [];
        this.props.messages.forEach((message, index) => {
            lists.push(
                <div key={index}>
                    <Message 
                        message={message}
                    />
                </div>
            );
        });
        return (
            <div>
                {lists}
            </div>
        );
    }
}

export default MessageList;
