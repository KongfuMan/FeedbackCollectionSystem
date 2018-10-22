// first capital letter means a component or class will be exported
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
    renderContent(){
        console.log(this.props.auth);
        switch (this.props.auth){
            case (null):
                return;
            case (false):
                return (
                    <li><a href='http://localhost:5000/auth/google'>Login with Google</a></li>
                );
            default:
                return [
                        <li key="1"><Payments /></li>,
                        <li key="2" style={{margin: '0 10px'}}>Credits:{this.props.auth.credits}</li>,
                        <li key="3"><a href='/api/logout'>Logout</a></li>
                    ]
        }
    }
    render(){
        console.log(this.props);
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily</Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

// function mapToState(state) {
//     return {auth: state.auth};
// };

// destructure state-> auth(be careful with the '{auth}'),
// then merge key value if they have same name
function mapStateToProps({auth}) {
    return {auth};
};

export default connect(mapStateToProps)(Header);