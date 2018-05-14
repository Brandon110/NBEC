import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../actions/toggle_alert';
import { NavLink, Link } from 'react-router-dom';
import AlertMsg from '../alerts/forms';
import axios from 'axios';

class RegisterForm extends Component {
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
        let formValues = this.state.formValues;

        axios.post('/activity/signup', {
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            birthDate: formValues.birthDate,
            password: formValues.password,
            confirm_password: formValues.confirm_password
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
                    Alert.msg = 'Please fill in your email';
                    return this.setState({ Alert: Alert });

                case 'invalid email':
                    Alert.msg = 'Doesn\'t look like a valid email';
                    return this.setState({ Alert: Alert });

                case 'null firstname':
                    Alert.msg = 'Please fill in your first name';
                    return this.setState({ Alert: Alert });

                case 'null lastname':
                    Alert.msg = 'Please fill in your last name';
                    return this.setState({ Alert: Alert });

                case 'null birthdate':
                    Alert.msg = 'Please fill in your birth date';
                    return this.setState({ Alert: Alert });

                case 'null password':
                    Alert.msg = 'Please fill in your password';
                    return this.setState({ Alert: Alert });

                case 'null confirm password':
                    Alert.msg = 'Please confirm your password'
                    return this.setState({ Alert: Alert });

                case 'non matching passwords':
                    Alert.msg = 'passwords do not match';
                    return this.setState({ Alert: Alert });

                case 'email exists':
                    Alert.msg = 'This email is already in use';
                    return this.setState({ Alert: Alert });

                case 'successful':
                    this.clearForm();
                    Alert.msg = 'You successfully signed up!'
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
            })
        });
    }

    hideAlert() {
        this.setState({ showAlert: false });
    }

    render() {
        let Alert = this.state.Alert;
        let formValues = this.state.formValues;

        return (
            <div>
                <AlertMsg
                    Alert={Alert}
                />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='text'
                            name='email'
                            className='form-control'
                            value={formValues['email'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='text'
                            name='firstName'
                            className='form-control'
                            value={formValues['firstName'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='text'
                            name='lastName'
                            className='form-control'
                            value={formValues['lastName'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='birthDate'>Birth Date</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='date'
                            name='birthDate'
                            className='form-control'
                            value={formValues['birthDate'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Choose Password</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='password'
                            name='password'
                            className='form-control'
                            value={formValues['password'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='confirm_password'>Confirm Password</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='password'
                            name='confirm_password'
                            className='form-control'
                            value={formValues['confirm_password'] || ''}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Sign up</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterForm);
