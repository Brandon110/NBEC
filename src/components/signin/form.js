import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../actions/toggle_alert';
import { NavLink, Link } from 'react-router-dom';
import AlertMsg from '../alerts/forms';
import axios from 'axios';

class SigninForm extends Component {
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

        axios.post('/activity/signin', {
            email: formValues.email,
            password: formValues.password
        })
            .then(response => {
                this.props.showAlert();
                window.scrollTo(0, 0);

                let data = response.data;
                let Alert = {};
                let alertClass = 'alert alert-';

                if (data.status === 'error') {
                    alertClass += 'info';
                }

                Alert.alertClass = alertClass;

                switch (data.msg) {
                    case 'null email':
                        Alert.msg = 'Please fill in your email';
                        return this.setState({ Alert: Alert });

                    case 'null password':
                        Alert.msg = 'Please fill in your password';
                        return this.setState({ Alert: Alert });

                    case 'incorrect email or password':
                        Alert.msg = 'Incorrect email or password, Please check your spelling';
                        return this.setState({ Alert: Alert });

                    case 'successful':
                        this.clearForm();
                        if (data.url) {
                            window.location.href = data.url;
                        }
                        else {
                            window.location.href = '/';
                        }
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

    render() {
        let formValues = this.state.formValues;
        let Alert = this.state.Alert;

        return (
            <div>
                <AlertMsg
                    Alert={Alert}
                />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='text'
                            name='email'
                            className='form-control'
                            value={formValues['email'] || ''}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Your Password</label>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='password'
                            name='password'
                            className='form-control'
                            value={formValues['password'] || ''}
                        />
                    </div>

                    <div className='d-flex justify-content-between'>
                        <button type='submit' className='main-btn'>Sign in</button>
                        <NavLink to='/signup'>Sign up</NavLink>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(SigninForm);
