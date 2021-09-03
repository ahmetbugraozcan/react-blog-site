import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


// @observer
// @inject("UserStore")
export default class FollowModal extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            modalType: this.props.modalType || null,
            followers: this.props.followers || [],
            followedUsers: this.props.followedUsers || [],
            currentUser: this.props.currentUser || null
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {

            this.closeModal();
        }
    }

    closeModal() {
        this.props.onClose();
    }

    render() {
        return (
            <div className='modal'>
                <div ref={this.setWrapperRef} className='follow-modal-content'>
                    <div className="follow-modal-header">
                        <div className='header-with-icon'>
                            <h2>{`${this.props.header}`}</h2>
                        </div>
                        <span onClick={() => {
                            this.closeModal();
                        }} className="close">&times;</span>
                    </div>
                    <div className="follow-modal-body">
                        {this.props.modalType == 'followers' && this.state.followers && this.state.followers.length > 0 ? this.state.followers.map((user, i) => (
                            <div key={user.follower._id} style={{ width: "100%" }}>
                                {
                                    <Link to={`/user/${user.follower.username}`} className='follow-modal-user-card'>
                                        <img className='follow-modal-user-card-avatar' src={`${user.follower.profilePhotoUrl}`}></img>
                                        <div className='follow-modal-user-card-row-body'>
                                            <div className='follow-modal-user-name-column'>
                                                <h3 className='follow-modal-user-name-text'>{`${user.follower.name}`}</h3>
                                                <h5 className='follow-modal-user-username-text'>{`@${user.follower.username}`}</h5>
                                            </div>
                                        </div>
                                    </Link>}
                            </div>
                        )) : this.props.modalType == 'followers' &&
                        <div className='follow-modal-user-not-following-anyone'>Bu kişinin takipçisi yok</div>

                        }
                        {this.props.modalType == 'followedUsers' && this.state.followedUsers && this.state.followedUsers.length > 0 ? this.state.followedUsers.map((user, i) => (
                            <div key={user._id} style={{ width: "100%" }}>
                                {
                                    <Link to={`/user/${user.username}`} className='follow-modal-user-card'>
                                        <img className='follow-modal-user-card-avatar' src={`${user.profilePhotoUrl}`}></img>
                                        <div className='follow-modal-user-card-row-body'>
                                            <div className='follow-modal-user-name-column'>
                                                <h3 className='follow-modal-user-name-text'>{`${user.name}`}</h3>
                                                <h5 className='follow-modal-user-username-text'>{`@${user.username}`}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                }
                            </div>

                        )) : this.props.modalType == 'followedUsers' &&
                        <div className='follow-modal-user-not-following-anyone'>Bu kişi kimseyi takip etmiyor</div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
FollowModal.propTypes = {
    onClose: PropTypes.func
}



{/* <Button className='follow-modal-user-follow-button'>
                                            isFollowing != null && isFollowing ? `Takibi Bırak` :
                                            <p style={{ color: 'white', fontWeight: '600' }}>{"Takip Et"}</p>
                                        </Button> */}