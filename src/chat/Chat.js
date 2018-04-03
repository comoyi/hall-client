import React from 'react';
import './chat.css'
import MessageList from './MessageList';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            connect: null,
            messages: [],
        };
    }

    componentDidMount() {
        if (!window["WebSocket"]) {
            alert("Your browser does not support websocket");
            return;
        }
        var server = new WebSocket("ws://127.0.0.1:8080/ws");
        server.onmessage = (ev) => {this.onMessage(ev)};
        server.onclose = () => {this.onClose()};
        this.setState({
            connect: server,
        });
    }

    onMessage(ev) {
        var data = ev.data;
        var message = JSON.parse(data);
        this.setState(preState => ({
            messages: [...preState.messages, message],
        }));
    }

    onClose(ev) {
        alert("Connection closed");
    }

    handleChange(e) {
        this.setState({
            input: e.target.value,
        });
    }

    handleSendMessage(e) {
        e.preventDefault();
        if (!this.state.connect) {
            return false;
        }
        if (!this.state.input) {
            return false;
        }
        var message = {
            'type': 1,
            'content': this.state.input,
        };
        this.state.connect.send(JSON.stringify(message));
        this.setState({
            input: "",
        });
    }

    render() {
        return (
            <div>
                Chat
                <div>
                    <MessageList
                        messages={this.state.messages}
                    />
                </div>
                <form id="form" onSubmit={(e) => this.handleSendMessage(e)}>
                    <input id="message" type="text" value={this.state.input} onChange={(e) => this.handleChange(e)} />
                    <input id="btn" type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default Chat;
