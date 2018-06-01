import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/heading/index';
import Footer from './components/footer/footer';
import HomePage from './components/home/index';
import NewsPage from './components/news/index';
import NewsLetter from './components/newsletter/index';
import RegisterPage from './components/register/index';
import SigninPage from './components/signin/index';
import ProfileActivity from './components/profile/sections/activity';
import ProfilePosts from './components/profile/sections/forum_posts';
import EditProfile from './components/profile/edit_profile';
import LiveProfileActivity from './components/live_profile/sections/activity';
import LiveProfilePosts from './components/live_profile/sections/forum_posts';
import Topics from './components/forums/topics';
import Posts from './components/forums/posts';
import CreateThread from './components/forums/create_thread';
import EditThread from './components/forums/edit_thread';
import Thread from './components/forums/thread';
import requiredLoggedIn from './components/HOC/authentication_required';
import { BrowserRouter, Switch, Route, Link, hashHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import '../node_modules/react-quill/dist/quill.snow.css';
import './components/styles/main.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>    
<BrowserRouter history={hashHistory}>
<div>
<Header/>
<Switch>
<Route exact path='/' component={HomePage}/>
<Route path='/news' component={NewsPage}/>
<Route path='/newsletter' component={NewsLetter}/>
<Route path='/signup' component={RegisterPage}/>
<Route path='/signin' component={SigninPage}/>
<Route exact path='/profile/activity' component={requiredLoggedIn(ProfileActivity)}/>
<Route path='/profile/posts' component={requiredLoggedIn(ProfilePosts)}/>
<Route path='/profile/update-profile' component={requiredLoggedIn(EditProfile)}/>
<Route exact path='/live-profile/activity/:userId' component={LiveProfileActivity}/>
<Route path='/live-profile/posts/:userId' component={LiveProfilePosts}/>
<Route exact path='/forums' component={Topics}/>
<Route exact path='/forums/:topic' component={Posts}/>
<Route path='/create/thread/:topic' component={CreateThread}/>
<Route path='/forums/edit-thread/:id' component={EditThread}/>
<Route path='/forums/:topic/:id' component={Thread}/>
</Switch>
<Footer/>
</div>
</BrowserRouter>
</Provider>, document.getElementById('app'));
