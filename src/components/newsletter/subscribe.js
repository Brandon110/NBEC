import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../actions/toggle_alert';
import AlertMsg from '../alerts/forms';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class NewsLetterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Alert: null
        }
    }

    handleSubscribe() {
        axios.get('/activity/subscribe').then(function (response) {
            this.props.showAlert();
            window.scrollTo(0, 0);

            let data = response.data;
            let Alert = {};
            let alertClass = 'alert alert-';

            if (data.status === 'error') {
                alertClass += 'info';
            }
            else if (data.status === 'success') {
                alertClass += 'success';
            }

            Alert.alertClass = alertClass;
 
            switch (data.msg) {
                case 'null user':
                    return window.location.href = '/signin';

                case 'email exists':
                    Alert.msg = 'This email is already subscribed to our newsletter';
                    return this.setState({ Alert });

                case 'successful':
                    Alert.msg = 'You have successfully signed up to our newsletter!';
                    return this.setState({ Alert });
            }

        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    render() {
        let Alert = this.state.Alert;

        return (
            <div className='white-background d-flex flex-1 align-items-center justify-content-center'>
                <AlertMsg
                    Alert={Alert}
                />
                <div className='d-flex flex-column'>
                    <button onClick={this.handleSubscribe.bind(this)} className='main-btn'>Subscribe</button>
                    <small className='text-muted text-center mt-3'>You may unsubscribe at any time.</small>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewsLetterForm);
