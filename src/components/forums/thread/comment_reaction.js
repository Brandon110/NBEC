import React, { Component } from 'react';
import axios from 'axios';

class CommentReaction extends Component {
    checkIfUserLikedComment() {
        let comment = this.props.comment;
        let user = this.props.user;

        for (var i = 0; i < comment.likes.length; i++) {
            if (user.userId === comment.likes[i].userId) {
                return true;
            }
            else {
                if (i === comment.likes.length) {
                    return false;
                }
            }
        }
    }

    likeComment() {
        let thread = this.props.thread;
        let commentId = this.props.comment._id;
        let user = this.props.user;

        axios.post('/activity/like-comment', {
            threadId: thread._id,
            fullName: user.fullName,
            userId: user.userId,
            commentId: commentId
        })
            .then(response => {
                if(response.data.status === 'success') {
                    this.props.fetchThread();
                }
            })
            .catch(err => {
                return err;
            });
    }

    unlikeComment() {
        let thread = this.props.thread;
        let commentId = this.props.comment._id;
        let user = this.props.user;

        axios.post('/activity/unlike-comment', {
            threadId: thread._id,
            fullName: user.fullName,
            userId: user.userId,
            commentId: commentId
        })
            .then(response => {
                if(response.data.status === 'success') {
                    this.props.fetchThread();
                }
            })
            .catch(err => {
                return err;
            });
    }

    render() {
        return this.checkIfUserLikedComment() === true ?
            <button
                className='transparent-btn liked-btn'
                onClick={this.unlikeComment.bind(this)}>
                &#10084;
        </button>
            :
            <button
                className='transparent-btn'
                onClick={this.likeComment.bind(this)}>
                &#10084;
        </button>
    }
}

export default CommentReaction;