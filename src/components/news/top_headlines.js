import React, { Component } from 'react';
import axios from 'axios';

class Headlines extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topHeadlines: null,
            index: 0
        }
    }

    componentDidMount() {
        this.fetchTopHeadlines();
    }

    fetchTopHeadlines() {
        axios.get('/top-headlines').then(function (response) {
            this.setState({ topHeadlines: response.data })
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    incrementIndex(e) {
        let articles = this.state.topHeadlines.articles;
        let arrayLength = articles.length;
        let index = this.state.index;

        if (index + 1 < arrayLength) {
            this.setState({ index: index + 1 });
        }
    }

    decrementIndex(e) {
        let index = this.state.index;

        if (index !== 0) {
            this.setState({ index: index - 1 });
        }
    }

    renderHeadlines() {
        let topHeadlines = this.state.topHeadlines;
        let index = this.state.index;

        if (topHeadlines.articles.length !== 0) {
            return (
                <div className='white-background p-3 border'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img className='headline-img' src={topHeadlines.articles[index].urlToImage} />
                        </div>
                        <div className='col-md-8'>
                            <h5>{topHeadlines.articles[index].title}</h5>
                            <article>{topHeadlines.articles[index].description}</article>
                            <p>{topHeadlines.articles[index].author}</p>
                            <a
                                href={topHeadlines.articles[index].url}
                                target='__blank'>
                                View Article
            </a>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button
                            disabled={index === 0}
                            onClick={(e) => this.decrementIndex(e)}
                            className='btn headline-navigation-btn transparent-btn'>
                            Previous
            </button>
                        <button
                            disabled={index + 1 === topHeadlines.articles.length || topHeadlines.articles.length === 0}
                            onClick={(e) => this.incrementIndex(e)}
                            className='btn headline-navigation-btn transparent-btn'>
                            Next
            </button>
                    </div>
                </div>
            )
        } else {
            return <p className='text-center'>Currently no headlines to show</p>
        }
    }

    render() {
        let topHeadlines = this.state.topHeadlines;
        let index = this.state.index;

        return (topHeadlines ? this.renderHeadlines() : '')
    }
}

export default Headlines;
