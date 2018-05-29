import React, { Component } from 'react';
import Parser from 'html-react-parser';
import CommentReaction from './comment_reaction';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class DisplayComments extends Component {
    render() {
        let thread = this.props.thread;
        let user = this.props.user;

        return thread.comments.length > 0 ?
            <ul className='list-group'>
                {
                    thread.comments.map((comment, index) => {
                        return <li key={index} className='list-group-item p-0 m-0 d-flex align-items-center mb-2 wrap-on-resize'>
                            <div className='d-flex flex-column align-items-center align-self-start p-1 mr-2 h-100' style={{ flexShrink: '0', background: '#f2f2f2' }}>
                                <NavLink to={'/live-profile/activity/' + comment.userId}>
                                    <small>{comment.name}</small>
                                </NavLink>
                                <small className='text-muted'>
                                    {comment.date}
                                </small>
                                <small className='text-muted'>
                                    {
                                        user && !user.laoding ?
                                            <CommentReaction
                                             thread={thread}
                                             user={user}
                                             comment={comment}
                                             fetchThread={this.props.fetchThread}
                                             />
                                            :
                                            false
                                    }
                                    likes {comment.likes.length}
                                </small>
                            </div>
                            <section className='p-1'>{Parser(comment.text)}</section>
                        </li>
                    })
                }
            </ul>
            :
            false
    }
}

export default DisplayComments;