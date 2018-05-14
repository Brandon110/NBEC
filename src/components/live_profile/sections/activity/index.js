import React, { Component } from 'react';
import LiveProfileInfo from '../../main/profile_info';
import LiveProfileNavigation from '../../main/profile_navigation';
import Activity from './activity';
import Alert from '../../../alerts/no_data';
import axios from 'axios';

class LiveProfilePage extends Component {
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
            return <Alert msg='Oops! something went wrong! This user may no longer exist.' />
        }
        else {
            return <div className='container mb-5'>
                <LiveProfileInfo user={user} />

                <LiveProfileNavigation user={user} />

                <Activity user={user} />
            </div>
        }
    }

    render() {
        return (
            <main>
                {this.renderProfile()}
            </main>
        )
    }
}

export default LiveProfilePage;
