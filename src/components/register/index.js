import React, { Component } from 'react';
import RegisterForm from './form';

class RegisterPage extends Component {
    render() {
        return (
            <main>
                <div className='container p-3 mt-5 mb-5 white-background shadow form-wrapper'>
                    <RegisterForm />
                </div>
            </main>
        )
    }
}

export default RegisterPage;