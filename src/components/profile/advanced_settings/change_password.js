import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../../actions/toggle_alert';
import AlertMsg from '../../alerts/forms';
import axios from 'axios';

class ChangePassword extends Component {
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
        const formValues = this.state.formValues;

        axios.post('/activity/change-password', {
            password: formValues.password,
            newPassword: formValues.new_password
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
                case 'incorrect password':
                    Alert.msg = 'This password does not match your current password';
                    return this.setState({ Alert });

                case 'null password':
                    Alert.msg = 'Please fill in your password';
                    return this.setState({ Alert });

                case 'null new password':
                    Alert.msg = 'Please fill in your new password';
                    return this.setState({ Alert });

                case 'successful':
                    Alert.msg = 'You have successfully changed your password';
                    this.clearForm();
                    return this.setState({ Alert });
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

    render() {
        let formValues = this.state.formValues;
        let Alert = this.state.Alert;

        return (
            <div>
                <AlertMsg Alert={Alert} />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                        <label htmlFor='password'>Current Password</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='password'
                            name='password'
                            className='form-control'
                            value={formValues['password'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='new_password'>New Password</label>
                        <input onChange={this.onChange.bind(this)}
                            type='password'
                            name='new_password'
                            className='form-control'
                            value={formValues['new_password'] || ''}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Update password</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChangePassword);
