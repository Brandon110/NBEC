import React, { Component } from 'react';
import Headlines from './top_headlines';
import AllNews from './all_news';
import './news.css';

class NewsPage extends Component {
    render() {
        return (
            <main>
                <div className='container-fluid mt-5 mb-5'>
                    <div className='box-title p-3 mb-5'>
                        <p className='p-0 m-0'>News and Articles - powered by <a href='https://newsapi.org/s/google-news-api' target='__blank'>Google News Api</a></p>
                    </div>
                    <Headlines />
                    <AllNews />
                </div>
            </main>
        )
    }
}

export default NewsPage;
