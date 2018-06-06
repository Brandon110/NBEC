import React, { Component } from 'react';
import Headlines from './top_headlines';
import AllNews from './all_news';
import './news.css';

class NewsPage extends Component {
    render() {
        return (
            <main>
                <div className='container-fluid mt-5 mb-5'>
                    <div className='box-title'>
                        <p>News and Articles</p>
                    </div>
                    <Headlines />
                    <AllNews />
                </div>
            </main>
        )
    }
}

export default NewsPage;
