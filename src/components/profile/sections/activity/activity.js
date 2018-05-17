import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Parser from 'html-react-parser';

class Activities extends Component {
    componentDidMount() {
        this.props.fetchUser();
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
                                className='list-group-item'>
                                <small>{activity.date}</small> {' '}
                                {activity.action} {' '}
                                <NavLink to={activity.url}>{activity.title}</NavLink>
                            </li>
                        })
                }
            </ul>
        )
    }
}

export default Activities;