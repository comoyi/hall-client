import React from 'react';
import './simulator.css'
import MessageList from './MessageList';

class Simulator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            connect: null,
            messages: [],
        };

        this.messageListRef = (el) => {
            this.messageList = el;
        }

        this.messageInputRef = (el) => {
            this.messageInput = el;
        }

        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
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
        this.messageInput.focus();
    }

    componentWillUnmount() {
        this.state.connect.close();
    }

    onMessage(ev) {
        var data = ev.data;
        var packet = JSON.parse(data);
        var message = {
            "type": 1,
            "content": JSON.stringify(packet.data[0])
        };
        this.setState(preState => ({
            // messages: [...preState.messages, message],
            messages: preState.messages.concat(message),
        }));
        this.messageList.scrollTop = this.messageList.firstChild.clientHeight;
    }

    onClose(ev) {
        console.log("Connection closed");
    }

    handleMessageInputChange(e) {
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
        var data = JSON.parse(this.state.input);
        // TODO 完善消息包数据
        var packet = {
            "packageId":"",
            "clientId":"",
            "packageType":"",
            "token":"",
            "data":[
                // {"cmd":"Ping"},
                // 目前一个包一条消息
                data
            ]
        };
        this.state.connect.send(JSON.stringify(packet));
        this.setState({
            input: "",
        });
        this.messageInput.focus();
    }

    render() {
        return (
            <div>
                Simulator
                <div id="message-list" ref={this.messageListRef}>
                    <MessageList
                        messages={this.state.messages}
                    />
                </div>
                <form id="form" onSubmit={this.handleSendMessage}>
                    <input id="message" type="text" ref={this.messageInputRef} value={this.state.input} onChange={this.handleMessageInputChange} />
                    <input id="btn-send" type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default Simulator;
