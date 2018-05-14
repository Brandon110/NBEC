import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideAlert } from '../../actions/toggle_alert';
import './alerts.css';

class AlertMsg extends Component {
    hideAlert() {
        this.props.hideAlert();
    }

    render() {
        let Alert = this.props.Alert;
        let toggleAlert = this.props.toggleAlert;

        return Alert && toggleAlert.display ?
            <div className={'alerts text-center ' + Alert.alertClass}>
                <span>{Alert.msg}</span>
                <button onClick={this.hideAlert.bind(this)} className='btn hide-alert-btn'>&#10006;</button>
            </div>
            :
            false
    }
}

const mapStateToProps = (state) => {
    return {
        toggleAlert: state.toggleAlert
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ hideAlert }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertMsg);
