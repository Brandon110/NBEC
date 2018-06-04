import React, { Component } from 'react';
import Moment from 'react-moment';
import { NavLink, Link } from 'react-router-dom';

class Activity extends Component {
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
                                className='list-group-item'>
                                <small>
                                    <Moment format='YYYY/MM/DD'>
                                        {activity.date}
                                    </Moment>
                                </small> {' '}
                                {activity.action} {' '}
                                <NavLink to={activity.url}>{activity.title}</NavLink>
                            </li>
                        })
                }
            </ul>
        )
    }
}

export default Activity;