import React, { Component } from 'react';
import {PuffLoader} from 'react-spinners';
import Keycloak from 'keycloak-js';
import Header from './header';


class Authentication extends Component {

    state = {
        keycloak: null,
        authenticated: false
    }

    componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init(
            {
                onLoad: 'login-required'
            }
        ).then(
            authenticated => {
                this.setState(
                    {
                        keycloak: keycloak,
                        authenticated: authenticated
                    }
                )
            }
        )
    }

    logout = () => {
        this.state.keycloak.logout();
        this.setState(
            {
                ...this.state,
                authenticated: false
            }
        )
    };

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                return (
                    <>
                        <Header logout={this.logout}/>
                        {this.props.children}
                    </>
                )
            }
            return null
        }
        return (
            <div className="App-icon">
                <PuffLoader color="teal" size={100}/>
                <br/>
                Authenticating
            </div>
        );
    }
}

export default Authentication;
