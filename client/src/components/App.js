import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from'../actions';

import Header from './Header';
import Landing from './Landing'
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// a class component to use lifecycle hook
class App extends Component{
    // can be called several times after mount
    componentDidMount(){
        this.props.fetchUser();

    }
    render(){
        return(
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header></Header>
                        <Route exact={true} path="/" component={Landing}></Route>
                        <Route exact path="/surveys" component={Dashboard}></Route>
                        <Route path="/surveys/new" component={SurveyNew}></Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}

export default connect(null,actions)(App);