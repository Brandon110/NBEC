import React, { Component } from 'react';
import axios from 'axios';

class EditThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            thread: null
        }
    }

    componentDidMount() {
        this.fetchThread();
    }

    fetchThread() {
        axios.get('/thread/' + this.props.match.params.id).then(function (response) {
            this.setState({ thread: response.data });
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    onChange(e) {
        let thread = this.state.thread;
        thread.body = e.target.value;
        this.setState({ thread });
    }

    handleSubmit(e) {
        e.preventDefault();
        const thread = this.state.thread;

        axios.post('/activity/edit-thread', {
            thread: thread
        })
            .then(response => {
                if (response.data.status === 'success') {
                    this.props.history.push('/forums/' + thread.topic + '/' + thread._id);
                }
            })
            .catch(err => {
                return err;
            });
    }

    deleteThread() {
        let thread = this.state.thread;
        let answer = confirm('Would you like to delete this thread? This can\'t be undone!');

        if (answer === true) {
            axios.post('/activity/delete-thread', {
                thread: thread
            })
                .then(response => {
                    if (response.data.status === 'success') {
                        window.location.href = '/profile/posts';
                    }
                })
                .catch(err => {
                    return err;
                });
        }
        else {
            return false;
        }
    }

    render() {
        let thread = this.state.thread;

        return (
            <main>
                {
                    thread ?
                        <div className='container'>
                            <h1 className='text-center mb-3'>{thread.title}</h1>

                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className='form-group'>
                                    <textarea
                                        type='text'
                                        onChange={this.onChange.bind(this)}
                                        className='form-control'
                                        name='body'
                                        value={thread.body}>
                                    </textarea>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <button
                                        className='btn btn-primary'
                                        type='submit'>
                                        Save
                                 </button>
                                    <button
                                        onClick={this.deleteThread.bind(this)}
                                        className='btn btn-danger'>
                                        Delete
                             </button>
                                </div>
                            </form>
                        </div>
                        : false
                }
            </main>
        )
    }
}

export default EditThread;