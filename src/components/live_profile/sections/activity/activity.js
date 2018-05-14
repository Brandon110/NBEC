import React, { Component } from 'react';

class Activity extends Component {
    render() {
        let activities = this.props.user.activites;

        return (
            <ul className='list-group'>
                {
                    !activities || activities.length === 0 ?
                        <li className='list-group-item text-center'>No recent activity to show</li>
                        :
                        activities.map((activity, index) => {
                            return <li key={index} className='list-group-item'>{activity.action}</li>
                        })
                }
            </ul>
        )
    }
}

export default Activity;