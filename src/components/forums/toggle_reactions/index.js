import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

class ToggleReactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    toggleReactions() {
        let show = this.state.show;

        if (show === true) {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: true });
        }
    }

    renderList() {
        let likes = this.props.likes;

        return (
            <div className='popup border'>
                <div className='text-center h-100'  style={{ backgroundColor: '#7f7fff' }}>
                    <h5 className='p-1 m-0'>Reactions</h5>
                </div>
                <ul className='list-group pt-0 mt-0'>
                    {
                        likes.map((like, index) => {
                            return <li
                                key={index}
                                style={{ backgroundColor: '#f2f2f2' }}
                                className='list-group-item text-center'>
                                <NavLink to={'/live-profile/activity/' + like.userId}>{like.name}</NavLink>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    handleClickOutside() {
        this.setState({ show: false });
    }

    render() {
        let likes = this.props.likes;
        let show = this.state.show;

        return (
            <div>
                <button
                    onClick={this.toggleReactions.bind(this)}
                    className='transparent-btn'>
                    {likes.length} likes
                </button>
                {
                    show === true ?
                        this.renderList()
                        :
                        false
                }
            </div>
        )
    }
}

export default onClickOutside(ToggleReactions);