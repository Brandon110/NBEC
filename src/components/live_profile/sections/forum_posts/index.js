import React, { Component } from 'react';
import Posts from './posts';
import ProfileNav from '../../main/profile_navigation';
import ProfileInfo from '../../main/profile_info';
import Alert from '../../../alerts/no_data';
import axios from 'axios';

class ProfilePostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        axios.get('/profile/live/' + this.props.match.params.userId).then(function (response) {
            this.setState({ user: response.data });
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    renderProfile() {
        let user = this.state.user;
        if (!user) {
            return false;
        }
        else if (user.status === 'error') {
            return <Alert msg='Oops! Something went wrong! This user may no longer exist!' />
        }
        else {
            return (
                <main>
                    <div className='container mb-5'>
                        <ProfileInfo user={user} />

                        <ProfileNav user={user} />

                        <Posts posts={user.posts} />
                    </div>
                </main>
            )
        }
    }

    render() {
        return this.renderProfile();
    }
}

export default ProfilePostsPage;