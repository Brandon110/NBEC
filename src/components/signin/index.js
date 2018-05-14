import React, { Component } from 'react';
import Form from './form';

class SigninPage extends Component {
    render() {
        return (
            <main>
                <div
                    className='container white-background shadow p-3 mt-5 form-wrapper'>
                    <Form />
                </div>
            </main>
        )
    }
}

export default SigninPage;