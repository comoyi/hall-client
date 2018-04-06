import React from 'react';
import './index.css';
import Chat from './components/chat/Chat'
import Nav from './components/nav/Nav'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import User from './components/user/User'

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/chat' component={Chat}/>
                    <Route path='/user' component={User}/>
                    <Route component={Chat}/>
                </Switch>
            </div>
        );
    }
}

export default App;
