import React, { Component } from 'react';
import axios from 'axios';

class ProfileImg extends Component {

    removeImg() {
        let user = this.props.user;

        axios.post('/activity/remove-profile-img', {
            email: user.email
        })
            .then(response => {
                window.location.href = '/profile/update-profile';
            })
            .catch(err => {
                return err;
            });
    }

    render() {
        let formValues = this.props.formValues;
        let user = this.props.user;

        return <div className='form-group'>
            <img className='profile-img center-img' src={user.profileImg} />
            <div className='mt-3'>
                <label htmlFor='profileImg'>Change profile image</label>
                <div className='d-flex'>
                    <input
                        onChange={(e) => this.props.onChange(e)}
                        type='text'
                        name='profileImg'
                        className='form-control'
                        value={formValues['profileImg'] || ''}
                        placeholder={user.profileImg}
                    />
                    <button type='button' onClick={this.removeImg.bind(this)} className='remove-profile-img-btn transparent-btn'>&#215;</button>
                </div>
            </div>
        </div>
    }
}

export default ProfileImg;