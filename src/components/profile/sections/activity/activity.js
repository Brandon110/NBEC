import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import Parser from 'html-react-parser';

class Activities extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    removeActivity(id) {
        axios.post('/activity/remove-activity', {
            id
        })
            .then(response => {
                if (response.data.status === 'success') {
                    this.props.fetchUser();
                }
            })
            .catch(err => {
                return err;
            })
    }

    render() {
        let activities = this.props.user.activity;

        return (
            <ul className='list-group'>
                {
                    !activities || activities.length === 0 ?
                        <li className='list-group-item text-center'>No recent activity to show</li>
                        :
                        activities.map((activity, index) => {
                            return <li key={index}
                                className='list-group-item activity-wrapper'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <small>{activity.date}</small> {' '}
                                        {activity.action} {' '}
                                        <NavLink to={activity.url}>{activity.title}</NavLink>
                                    </div>
                                    <button
                                        className='transparent-btn remove-activity-btn'
                                        onClick={() => this.removeActivity(activity._id)}>&#128465;</button>
                                </div>
                            </li>
                        })
                }
            </ul>
        )
    }
}

export default Activities;