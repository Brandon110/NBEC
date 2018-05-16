import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import AlertMsg from '../../alerts/forms';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../../actions/toggle_alert';
import axios from 'axios';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            Alert: null
        }
    }

    onChange(value) {
        this.setState({ comment: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const thread = this.props.thread;
        const comment = this.state.comment;

        axios.post('/activity/add-thread-comment', {
            threadId: thread._id,
            comment: comment
        })
            .then(response => {
                this.props.showAlert();
                window.scrollTo(0, 0);

                let data = response.data;
                let Alert = {};
                let alertClass = 'alert alert-';

                if (data.status === 'error') {
                    alertClass += 'info';
                }

                Alert.alertClass = alertClass;
           
                switch (data.msg) {
                    case 'null comment':
                        Alert.msg = 'Please type your comment before submitting';
                        return this.setState({ Alert });

                    case 'successful':
                        this.clearForm();
                        this.props.fetchThread();
                }
            })
            .catch(err => {
                return err;
            })
    }

    clearForm() {
        this.setState({ comment: '' });
    }

    render() {
        let Alert = this.state.Alert;

        return (
            <div>
                <AlertMsg
                    Alert={Alert}
                />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <ReactQuill
                        value={this.state.comment}
                        onChange={this.onChange.bind(this)}
                        placeholder='add a comment...'
                        theme={null}
                        className='border white-background'
                    />
                    <button className='btn btn-primary' type='submit'>Comment</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddComment);