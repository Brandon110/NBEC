import React, { Component } from 'react';
import ChangePasswordForm from './change_password';
import DeactivateAccount from './deactivate_account';

class SettingsPage extends Component {
    render() {
        let user = this.props.user;

        return (
                <div>
                    <h5 className='text-center'>Advanced Settings</h5>

                    <div className='mt-5 mb-5'>
                        <ChangePasswordForm />
                    </div>
                     
                     <hr/>

                    <div className='mt-5'>
                        <DeactivateAccount user={user} />
                    </div>
                </div>
        )
    }
}

export default SettingsPage;