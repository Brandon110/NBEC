import React, { Component } from 'react';
import Goal from './goal';
import ProfileImg from './profile_img';
import BirthDate from './birth_date';
import AlertMsg from '../../alerts/forms';
import AdvancedSettings from '../advanced_settings'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../../actions/fetch_user';
import { showAlert } from '../../../actions/toggle_alert';
import axios from 'axios';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            Alert: null
        };
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    onChange(e) {
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;

        this.setState({ formValues });
    }

    handleSubmit(e) {
        e.preventDefault();
        let formValues = this.state.formValues;

        axios.post('/activity/update-profile', {
            profileImg: formValues.profileImg,
            birthDate: formValues.birthDate,
            goal: formValues.goal
        }).then(response => {
            this.props.showAlert();
            window.scrollTo(0, 0);
            this.clearForm();
            this.props.fetchUser();

            let data = response.data;
            let Alert = {};
            let alertClass = 'alert alert-';

            if (data.status === 'error') {
                alertClass += 'info';
            }
            else if (data.status === 'success') {
                alertClass += 'success';
            }

            Alert.alertClass = alertClass;

            switch (data.msg) {
                case 'invalid img':
                    Alert.msg = 'This doesn\'t look like a valid image url'
                    return this.setState({ Alert: Alert });

                case 'successful':
                    Alert.msg = 'You successfully updated your profile!';
                    return this.setState({ Alert: Alert });
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
        let user = this.props.user;
        let formValues = this.state.formValues;
        let Alert = this.state.Alert;

        return (
            <main className='pt-4 pb-4'>
                <div className='container white-background shadow'>
                    <div className='form-wrapper'>
                        <AlertMsg
                            Alert={Alert}
                        />
                        <form onSubmit={this.handleSubmit.bind(this)} className='mb-5'>
                            <ProfileImg
                                formValues={formValues}
                                user={user}
                                onChange={this.onChange.bind(this)}
                            />

                            <BirthDate
                                formValues={formValues}
                                user={user}
                                onChange={this.onChange.bind(this)}
                            />

                            <Goal
                                formValues={formValues}
                                user={user}
                                onChange={this.onChange.bind(this)}
                            />

                            <button type='submit' className='btn btn-primary'>Save</button>
                        </form>

                        <hr />

                        <AdvancedSettings user={user} />
                    </div>
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
    return bindActionCreators({ fetchUser, showAlert }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
