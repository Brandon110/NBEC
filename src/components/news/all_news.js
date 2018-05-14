import React, { Component } from 'react';
import axios from 'axios';

class AllNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allNews: null
        }
    }

    componentDidMount() {
        this.fetchAllNews();
    }

    fetchAllNews() {
        axios.get('/all-news').then(function (response) {
            this.setState({ allNews: response.data });
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    render() {
        let allNews = this.state.allNews;

        return (
            <div className='card-columns mt-5'>
                {
                    allNews ?
                        allNews.articles.map((article, index) => {
                            return (
                                <div className='card' key={index}>
                                    <img className='card-img-top' src={article.urlToImage} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{article.title}</h5>
                                        <p className='card-text'>{article.description}</p>
                                        <a
                                            href={article.url}
                                            target='__blank'>
                                            View
             </a>
                                    </div>
                                    <div className='card-footer'>
                                        <p className='card-text'><small className='text-muted'>{article.publishedAt}</small></p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        ''
                }
            </div>
        )
    }
}

export default AllNews;
