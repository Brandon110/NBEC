import React, { Component } from 'react';
import axios from 'axios';

class ThreadReaction extends Component {

    checkIfUserLikedThread() {
        let thread = this.props.thread;
        let user = this.props.user;

        for (var i = 0; i < thread.likes.length; i++) {
            if (user.userId === thread.likes[i].userId) {
                return true;
            }
            else {
                if (i === thread.likes.length) {
                    return false;
                }
            }
        }
    }

    likeThread() {
        let thread = this.props.thread;
        let user = this.props.user;
  
        axios.post('/activity/like-thread', {
            threadId: thread._id,
            userId: user.userId,
            fullName: user.fullName
        })
            .then(response => {
                this.props.fetchThread();
            })
            .catch(err => {
                return err;
            });
    }

    unlikeThread() {
        let thread = this.props.thread;

        axios.post('/activity/unlike-thread', {
            threadId: thread._id
        })
            .then(response => {
                this.props.fetchThread();
            })
            .catch(err => {
                return err;
            });
    }

    render() {
        return this.checkIfUserLikedThread() === true ?
            <button
                onClick={this.unlikeThread.bind(this)}
                className='transparent-btn liked-btn'>
                &#10084;
             </button>
            :
            <button
                onClick={this.likeThread.bind(this)}
                className='transparent-btn'>
                &#10084;
             </button>
    }
}

export default ThreadReaction;