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
                <div className='container mt-2 mb-2'>

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


                    <p className='mt-2 text-muted'>
                        Explore topics to your interest and engage in discussions with other members relating to the
                        envrionment. Please be mindful of others feelings when posting in forums, threads must be directly
                        related to the topic you are viewing. Heated debates and discussions are allowed but name calling
                        or any direct attacks towards another indiviual is not permitted.
            </p>
                </div>
            </main>
        )
    }
}

export default Topics;