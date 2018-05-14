import React, { Component } from 'react';
import axios from 'axios';

class DeactivateAccount extends Component {
    deactivateAccount() {
        let answer = confirm('Would you like to deactivate your account? This cannot be undone!');


        if (answer === false) {
            return false;
        }
        else {
            axios.post('/activity/deactivate-account', {
                email: this.props.user.email
            }).then(response => {
                if (response.data.msg === 'successful') {
                    window.location.href = '/signup';
                }
            })
                .catch(err => {
                    return err;
                });
        }
    }

    render() {
        return (
            <div className='text-center'>
                <h3 className='mb-5'>Danger Zone</h3>
                <button onClick={this.deactivateAccount.bind(this)} className='btn btn-danger'>Deactivate Account</button>
            </div>
        )
    }
}

export default DeactivateAccount;
