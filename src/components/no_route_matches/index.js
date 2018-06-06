import React, { Component } from 'react';

class NoRoute extends Component {
    render() {
        return (
            <main>
                <div className='container'>
                    <div className='alert alert-info text-center'>
                        <span>This page doesn't seem to exist</span>
                    </div>
                </div>
            </main>
        )
    }
}

export default NoRoute;