import React, { Component } from 'react';

class BirthDate extends Component {
    onFocus(e) {
        e.target.type = 'date';
    }

    onBlur(e) {
        e.target.type = 'text'
    }

    render() {
        let formValues = this.props.formValues;
        let user = this.props.user;

        return <div className='form-group'>
            <label htmlFor='birthDate'>Date of birth</label>
            <input
                onChange={(e) => this.props.onChange(e)}
                type='date'
                name='birthDate'
                className='form-control'
                value={formValues['birthDate'] || user.birthDate || ''}
            />
        </div>
    }
}

export default BirthDate;
