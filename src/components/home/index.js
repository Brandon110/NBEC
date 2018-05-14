import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignupForm from '../register/form';
import './home.css';

class HomePage extends Component {
    render() {
        return (
            <main>
                <div className='homepage-title-wrapper'>
                    <div className='p-3'>
                        <i style={{ fontSize: '150px' }} className='fab fa-envira'></i>
                    </div>
                    <h1><strong>New brunswick Envrionmental Community</strong></h1>
                    <p>~connect with your environment</p>
                </div>

                <div className='p-5 white-background'>
                    <div className='pb-5 pt-5 text-center border-grey-bottom'>
                        <img
                            className='small-icon'
                            src='http://i49.photobucket.com/albums/f254/gboyyy1/MetroUI-Windows8-News_zpsbwcns9gu.png~original'
                        />
                        <p><NavLink to='/news'>News</NavLink></p>
                        <p><small className='text-muted'>Explore news relating to the environment</small></p>
                    </div>

                    <div className='p-5 text-center border-grey-bottom'>
                        <img className='small-icon' src='http://i49.photobucket.com/albums/f254/gboyyy1/messages_zpsml9wrpfh.png~original'
                        />
                        <p><NavLink to='/forums'>Envrionmental Discussions</NavLink></p>
                        <p><small className='text-muted'>Engage in environmnetal discussions</small></p>
                    </div>


                    <div className='p-5 text-center'>
                        <img className='small-icon' src='http://i49.photobucket.com/albums/f254/gboyyy1/letter_zpsvdemcgxy.png~original'
                        />
                        <p><NavLink to='/newsletter'>Newsletter</NavLink></p>
                        <p><small className='text-muted'>Subscribe to our newsletter</small></p>
                    </div>
                </div>

                <div className='pb-5 mt-5'>
                    <h5 className='text-center p-5'>Sign up to perticapate in the community</h5>
                    <div className='form-wrapper'>
                        <SignupForm />
                    </div>
                </div>
            </main>
        )
    }
}

export default HomePage;