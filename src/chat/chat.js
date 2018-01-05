import React from 'react';
import './chat.css'

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.start();
    }

    start() {
        window.onload = function () {
            var connect;

            function appendLog(item) {
                var log = document.getElementById("log");
                log.appendChild(item);
                log.scrollTop = log.scrollTop + 100;
            }

            if (window["WebSocket"]) {
                connect = new WebSocket("ws://127.0.0.1:8080/ws");
                connect.onmessage = function (ev) {
                    var message = ev.data;
                    var item = document.createElement("div");
                    item.innerText = message;
                    appendLog(item);
                }
                connect.onclose = function (ev) {
                    var item = document.createElement("div");
                    item.innerText = "Connection closed";
                    appendLog(item);
                }
            } else {
                var item = document.createElement("div");
                item.innerText = "Your browser does not support websocket";
                appendLog(item);
            }

            document.getElementById("form").onsubmit = function () {
                var message = document.getElementById("message");
                if (!connect) {
                    return false;
                }
                if (!message.value) {
                    return false;
                }
                connect.send(message.value);
                message.value = "";
                return false;
            }
        }
    }

    render() {
        return (
            <div>
                chat
                <div id="log"></div>
                <form id="form">
                    <input id="message" type="text"/>
                    <input id="btn" type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}

export default Chat;
