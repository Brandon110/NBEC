import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../actions/toggle_alert';
import AlertMsg from '../alerts/forms';
import axios from 'axios';

class NewsLetterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {},
            Alert: null
        }
    }

    onChange(e) {
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;

        this.setState({ formValues });
    }

    handleSubmit(e) {
        e.preventDefault();
        let email = this.state.formValues.email;

        axios.post('/activity/subscribe', {
            email: email
        }).then(response => {
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
                case 'null email':
                    Alert.msg = 'Please fill in your email before submitting';
                    this.inputEmail.focus();
                    return this.setState({ Alert: Alert });

                case 'invalid email':
                    Alert.msg = 'Doesn\'t look like a valid email';
                    this.inputEmail.focus();
                    return this.setState({ Alert: Alert });

                case 'email exists':
                    Alert.msg = 'This email is already subscribed to our newsletter';
                    this.inputEmail.focus();
                    return this.setState({ Alert: Alert });

                case 'successful':
                    this.clearForm();
                    Alert.msg = 'Successfully signed up to our newsletter!';
                    this.inputEmail.blur();
                    return this.setState({ Alert: Alert });
            }
        })
            .catch(err => {
                return err;
            });
    }

    clearForm() {
        Object.keys(this.state.formValues).map(key => {
            this.setState({
                formValues: {
                    [key]: ''
                }
            });
        });
    }

    hideAlert() {
        this.setState({ showAlert: false });
    }

    render() {
        let formValues = this.state.formValues;
        let Alert = this.state.Alert;

        return (
            <div className='white-background d-flex flex-1 flex-column justify-content-center'>
                <AlertMsg
                    Alert={Alert}
                />
                <form onSubmit={this.handleSubmit.bind(this)} className='d-flex justify-content-center align-items-center flex-wrap'>
                    <div>
                        <input
                            onChange={this.onChange.bind(this)}
                            name='email'
                            type='text'
                            className='form-control'
                            placeholder='your email'
                            value={formValues['email'] || ''}
                            ref={(input) => { this.inputEmail = input; }}
                        />
                    </div>
                    <button type='submit' className='btn btn-default align-self-start'>Subscribe</button>
                </form>
                <small className='text-muted text-center mt-3'>You may unsescribe at any time.</small>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewsLetterForm);
