import React, { Component } from 'react';

class NoData extends Component {
    render() {
        return (
            <main>
                <div className='container mt-5'>
                    <div className='text-center alert alert-info'>
                        <span>{this.props.msg}</span>
                    </div>
                </div>
            </main>
        )
    }
}

export default NoData