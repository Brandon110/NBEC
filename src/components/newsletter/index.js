import React, { Component } from 'react';
import Form from './form';
import './newsletter.css';

class NewsLetter extends Component {
    render() {
        return (
            <main>
                <div className='newsletter-description-wrapper'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='white-border-bottom w-50 pb-3 d-flex justify-content-center'>
                            <i className="fas fa-envelope-square"></i>
                        </div>
                        <div className='pt-3 text-center'>
                            <p className='newsletter-description w-75'>
                                Subscribe to our mailing list to receive regular emails regarding new environmental dicscussions and more!
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