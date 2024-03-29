import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../../actions/fetch_user';
import Moment from 'react-moment';
import axios from 'axios';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        this.fetchPosts();
        this.props.fetchUser();
    }

    fetchPosts() {
        this._isMounted = true;

        axios.get('/posts/' + this.props.match.params.topic).then(function (response) {
            if (this._isMounted === true) {
                this.setState({ posts: response.data });
            }
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderPosts() {
        let posts = this.state.posts;

        if (!posts) {
            return false;
        }
        else if (posts.length === 0) {
            return <div className='white-background p-1 text-center border'>No posts to show</div>
        }
        else {
            return posts.map((post, index) => {
                return (
                    <div key={index} className='d-flex text-center white-background h-100'>

                        <div className='w-100 border d-flex flex-column justify-content-center p-2'>
                            <NavLink to={'/forums/' + post.topic + '/' + post._id}>{post.title}</NavLink>

                            <NavLink to={'/live-profile/activity/' + post.author.userId}>
                                <small>{post.author.name}</small>
                            </NavLink>

                            <small className='text-muted'>
                                Posted <Moment format='YYYY/MM/DD'>{post.datePosted}</Moment>
                            </small>
                            {
                                post.editDate ?
                                    <small className='text-muted'>(Edited <Moment format='YYYY/MM/DD'>{post.editDate}</Moment>)</small>
                                    :
                                    false
                            }
                        </div>

                        <div className='w-25 border d-flex flex-column justify-content-center hide-on-resize p-2'>
                            <div><small>Replies {post.comments.length}</small></div>
                        </div>

                        <div className='w-25 border d-flex flex-column justify-content-center hide-on-resize p-2'>
                            {
                                post.comments[0] ?
                                    <div>
                                        <NavLink
                                            to={'/live-profile/activity/' + post.comments[0].userId}>
                                            <small>{post.comments[0].name}</small>
                                        </NavLink>
                                        <br />
                                        <small className='text-muted'>
                                            <Moment format='YYYY/MM/DD'>{post.comments[0].date}</Moment>
                                        </small>
                                    </div>
                                    :
                                    <small>No Posts</small>
                            }
                        </div>
                    </div >
                )
            })
        }
    }

    render() {
        let user = this.props.user;

        return (
            <main>
                <div className='container mt-5 mb-5'>
                    {
                        user && !user.loading ?
                            <NavLink
                                to={'/create/thread/' + this.props.match.params.topic}>
                                Create Thread
          </NavLink>
                            :
                            ''
                    }
                    <div className='d-flex align-items-center text-center mt-1 p-1 topic-section-title'>
                        <div className='w-100'>
                            <span>Discussion</span>
                        </div>

                        <div className='w-25 hide-on-resize'>
                            <span>Replies/Views</span>
                        </div>

                        <div className='w-25 hide-on-resize'>
                            <span>last post</span>
                        </div>
                    </div>

                    {this.renderPosts()}

                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
