import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../../actions/toggle_alert';
import AlertMsg from '../../alerts/forms';
import axios from 'axios';
import ReactQuill from 'react-quill';

class CreateThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: { text: '' },
            Alert: null
        }
    }

    handleTitleChange(e) {
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        if (value.length <= 30) {
            formValues[name] = value;

            this.setState({ formValues });
        }
        else {
            return false;
        }
    }

    handleBodyChange(value) {
        let formValues = this.state.formValues;

        formValues.text = value;

        this.setState({ formValues });
    }

    handleSubmit(e) {
        e.preventDefault();

        let formValues = this.state.formValues;

        axios.post('/activity/create-thread', {
            title: formValues.title,
            body: formValues.text,
            topic: this.props.match.params.topic
        })
            .then(response => {
                let data = response.data;
                let Alert = {};
                let alertClass = 'alert alert-';

                if (data.status === 'error') {
                    this.props.showAlert();
                    window.scrollTo(0, 0);
                    alertClass += 'info';
                }
                else if (data.status === 'success') {
                    alertClass += 'info';
                }

                Alert.alertClass = alertClass;

                switch (data.msg) {
                    case 'null title':
                        Alert.msg = 'Please choose a title for this thread';
                        return this.setState({ Alert });

                    case 'null body':
                        Alert.msg = 'Please finnish writting your thread before submitting!';
                        return this.setState({ Alert });

                    case 'exceeded character length':
                        Alert.msg = 'Title needs to be under 30 characters in length';
                        return this.setState({ Alert });

                    case 'successful':
                        this.clearForm();
                        this.props.history.push('/forums/' + this.props.match.params.topic + '/' + data.id);
                }

            })
            .catch(err => {
                return err;
            });
    }

    clearForm() {
        Object.keys(this.state.formValues).map(key => {
            this.setState({
                formValues: {
                    [key]: ''
                }
            });
        });
    }

    render() {
        let formValues = this.state.formValues;
        let Alert = this.state.Alert;

        return (
            <main>
                <div className='container-fluid'>

                    <AlertMsg Alert={Alert} />

                    <form onSubmit={this.handleSubmit.bind(this)}>

                        <div className='form-group'>
                            <label htmlFor='title'>Title of thread</label>
                            <input
                                type='text'
                                className='form-control'
                                name='title'
                                onChange={this.handleTitleChange.bind(this)}
                                value={formValues['title'] || ''}
                            />
                            <small className='text-muted'>
                                max length {formValues.title ? formValues.title.length : '0'} / 30
            </small>
                        </div>

                        <div className='form-group'>
                            <ReactQuill
                                value={formValues['text']}
                                onChange={this.handleBodyChange.bind(this)}
                            />
                        </div>

                        <button type='submit' className='btn btn-primary'>Create</button>
                    </form>

                </div>
            </main>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(CreateThread);
