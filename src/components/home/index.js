import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignupForm from '../register/form';

class HomePage extends Component {
    render() {
        return (
            <div>
                <main className='white-background'>
                    <div className='pt-5 pb-5 text-center' style={{backgroundColor: '#4c4cff'}}>
                        <img src='/images/logo.png' />
                        <h1><strong>New brunswick Environmental Community</strong></h1>
                        <p><small>Local environmental community</small></p>
                    </div>

                    <div className='mt-5 mb-5'>
                        <div className='p-5 text-center border-grey-bottom'>
                            <img className='small-icon' src='/images/news.png' />
                            <p><NavLink to='/news'>News</NavLink></p>
                            <p><small className='text-muted'>Explore news relating to the environment</small></p>
                        </div>

                        <div className='p-5 text-center border-grey-bottom'>
                            <img className='small-icon' src='/images/messages.png' />
                            <p><NavLink to='/forums'>Envrionmental Discussions</NavLink></p>
                            <p><small className='text-muted'>Engage in environmnetal discussions</small></p>
                        </div>

                        <div className='p-5 text-center'>
                            <img className='small-icon' src='/images/newsletter.png'
                            />
                            <p><NavLink to='/newsletter'>Newsletter</NavLink></p>
                            <p><small className='text-muted'>Subscribe to our newsletter</small></p>
                        </div>
                    </div>
                </main>

                <div className='mb-5'>
                    <h5 className='text-center m-5'>Sign up to perticapate in the community</h5>
                    <div className='form-wrapper'>
                        <SignupForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;