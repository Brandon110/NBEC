import React, { Component } from 'react';
import Parser from 'html-react-parser';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class DisplayComments extends Component {
    render() {
        let comments = this.props.comments;

        return comments.length > 0 ?
            <ul className='list-group'>
                {
                    comments.map((comment, index) => {
                        return <li key={index} className='list-group-item p-0 m-0 d-flex align-items-center mb-2 wrap-on-resize'>
                            <div className='d-flex flex-column align-items-center align-self-start p-1 mr-2 h-100' style={{flexShrink: '0', background: '#f2f2f2'}}>
                                <NavLink to={'/live-profile/activity/'+comment.userId}><small>{comment.name}</small></NavLink>
                            </div>
                            <section className='p-1'>{Parser(comment.text)}</section>
                            <small className='text-muted'>{comment.date}</small>
                        </li>
                    })
                }
            </ul>
            :
            false
    }
}

export default DisplayComments;