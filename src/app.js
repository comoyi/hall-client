import React from 'react';
import './index.css';
import Chat from './chat/chat'
import Nav from './nav'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import User from './user'

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/chat' component={Chat}/>
                    <Route path='/user' component={User}/>
                </Switch>
            </div>
        );
    }
}

export default App;
