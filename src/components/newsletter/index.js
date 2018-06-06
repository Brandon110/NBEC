import React, { Component } from 'react';
import Form from './subscribe';
import './newsletter.css';

class NewsLetter extends Component {
    render() {
        return (
            <main>
                <div className='newsletter-description-wrapper grey-border-bottom'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <i className="fas fa-envelope-square"></i>
                        <div className='mt-3'>
                            <p className='text-center'>
                                Sign up to NBEC mailing list to receive regular emails regarding new environmental diiscussions and more!
            </p>
                        </div>
                    </div>
                </div>
                <Form />
            </main>
        )
    }
}

export default NewsLetter;