import React, { Component } from 'react';
import ChangePasswordForm from './change_password';
import DeactivateAccount from './deactivate_account';

class SettingsPage extends Component {
    render() {
        let user = this.props.user;

        return (
            <main>
                <div className='mt-5 d-flex flex-column flex-1'>
                    <h5 className='text-center'>Advanced Settings</h5>

                    <div className='mt-5'>
                        <ChangePasswordForm />
                    </div>

                    <div className='mt-auto'>
                        <DeactivateAccount user={user} />
                    </div>
                </div>
            </main>
        )
    }
}

export default SettingsPage;