import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

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

    onChange(value) {
        let thread = this.state.thread;
        thread.body = value;
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

    render() {
        let thread = this.state.thread;

        return (
            <main>
                {
                    thread ?
                        <div className='container'>
                            <h1>{thread.title}</h1>

                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className='form-group'>
                                    <ReactQuill
                                        value={thread.body}
                                        onChange={this.onChange.bind(this)}
                                        className='white-background'
                                    />
                                </div>
                                <button className='btn btn-primary' type='submit'>Save</button>
                            </form>
                        </div>
                        : false
                }
            </main>
        )
    }
}

export default EditThread;