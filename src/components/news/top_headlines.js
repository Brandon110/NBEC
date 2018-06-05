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
        let headline = topHeadlines.articles[index];

        if (topHeadlines.length !== 0) {
            return (
                <div className="card mb-2">
                    <img className="card-img-top" src={headline.urlToImage} alt={headline.title} />
                    <div className="card-body">
                        <h5 className="card-title">{headline.title}</h5>
                        <p className="card-text">{headline.description}</p>
                        <p className="card-text"><a href={headline.url}>View</a></p>

                      <div className='text-center'>
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
