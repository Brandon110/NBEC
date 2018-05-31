import React, { Component } from 'react';
import axios from 'axios';

function requireLoggedIn(ComposedComponent) {
    class Authenticated extends Component {
        componentDidMount() {
            this.fetchUser();
        }

        fetchUser() {
            axios.get('/user').then(function(response) {
                    if(!response.data){
                        this.props.history.push('/signin')
                    }
                }.bind(this))
                .catch(err => {
                    return err;
                });
        }

        render() {
            return <ComposedComponent />
        }
    }

    return Authenticated;
}


export default requireLoggedIn;