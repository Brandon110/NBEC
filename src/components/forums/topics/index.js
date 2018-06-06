import React, { Component } from 'react';
import Pollution from './pollution';
import Forestry from './forestry';
import GlobalWarming from './global_warming';
import Climate from './climate';
import LocalEvents from './local_events';
import OffTopic from './off_topic';
import '../forums.css';

class Topics extends Component {
    render() {
        return (
            <main>
                <div className='container mt-5 mb-5'>

                    <div className='border'>
                        <div className='d-flex align-items-center text-center topic-section-title p-1'>
                            <div className='w-100'>
                                <span>Topics</span>
                            </div>

                            <div className='w-25 hide-on-resize'>
                                <span># of threads</span>
                            </div>

                            <div className='w-25 hide-on-resize'>
                                <span>last post</span>
                            </div>
                        </div>

                        <Pollution />

                        <Forestry />

                        <GlobalWarming />

                        <Climate />

                        <LocalEvents />

                        <OffTopic />
                    </div>
                </div>
            </main>
        )
    }
}

export default Topics;