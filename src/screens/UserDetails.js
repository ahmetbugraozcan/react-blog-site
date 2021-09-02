import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import AuthService from "../services/AuthService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";
import { Divider } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BlogService from '../services/BlogService';
import RouteConstants from '../core/constants/route/RouteConstants';
import { Button } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import IconButton from 'material-ui/IconButton';
import UserService from '../services/UserService';

//Bu kişinin parolası gelmemesi gerekiyor kullanıcı detayları için başka bir sorgu yapabiliriz
const UserDetails = inject("UserStore")(observer((props) => {
    const history = useHistory();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isBookmarkedBlogsPending, setIsBookmarkedBlogsPending] = useState(false);
    const [isLikedBlogsPending, setIsLikedBlogsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isMyProfile, setIsMyProfile] = useState(null);
    const [likedBlogs, setLikedBlogs] = useState([])
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([])
    const [isFollowing, setIsFollowing] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);

    const GoToBlog = (blogID) => {
        console.log(history)
        history.replace();

        history.push(`${RouteConstants.BLOG}/${blogID}`)
    }

    function getFollowedUsers(username) {
        UserService.getFollowedUsers(username).then(res => {
            if (res) {
                console.log(JSON.parse(res))
                setFollowedUsers(JSON.parse(res));
            }
        })
    }

    const followUser = (username) => {
        if (!isPending) {
            setIsPending(true);
            console.log("BURAYA GİRDİk")
            // var like = {
            //     blog: blogID,
            //     likerID: props.UserStore.user?._id,
            // }
            var follower = props.UserStore.user;
            UserService.followUser(username, follower).then(res => {
                if (res) {
                    if (res == '202') {
                        console.log("Takibi bıraktık bu kişiyi")
                        var count = followerCount - 1;
                        setFollowerCount(count)
                        setIsFollowing(false);

                    } else if (res == '200') {
                        console.log("Takibe başladık bu kişiyi")
                        var count = followerCount + 1;
                        setFollowerCount(count)
                        setIsFollowing(true);
                    }
                } else {
                    //giriş yapması falan gerekiyor işte buraları ona göre ayarlayalım
                    alert("Bir hata oluştu...")
                }
                setIsPending(false);
            }).catch(e => {
                setIsPending(false);
                alert("Bir hata oluştu...")
                console.log(e);

            });
        }
    }

    function getLikedBlogs(userID) {
        setIsLikedBlogsPending(true);
        BlogService.getLikedBlogs(userID).then(res => {
            if (res) {
                setLikedBlogs(JSON.parse(res));
            }
            setIsLikedBlogsPending(false);

        })
    }


    function getBookmarkedBlogs(userID) {
        setIsBookmarkedBlogsPending(true);

        BlogService.getBookmarkedBlogs(userID).then(res => {
            if (res) {
                setBookmarkedBlogs(JSON.parse(res));
            }
            setIsBookmarkedBlogsPending(false);
        })
    }

    useEffect(() => {
        console.log("buraya girdik")
        AuthService.getUser(username).then((res) => {
            {
                setIsPending(true)
                if (res) {
                    var userRes = JSON.parse(res);
                    setUser(userRes);
                    if (userRes._id == props.UserStore.user._id) {
                        setIsMyProfile(true)
                        console.log("BENİM PROFİLİM")
                    }
                    else {
                        setIsMyProfile(false)
                        console.log("BAŞKASININ PROFİLİ")
                    }
                    if (!isMyProfile) {
                        setIsFollowing(false);
                        userRes.followers.forEach(follower => {
                            if (follower.follower._id == props.UserStore.user._id) {
                                setIsFollowing(true);
                            }
                        })
                    }
                    getLikedBlogs(userRes._id);
                    getBookmarkedBlogs(userRes._id);
                    setFollowerCount(userRes.followers.length)
                    getFollowedUsers(userRes.username);
                }
            }
   
            setIsPending(false);
           
        });


    }, [username]);
    // const history = useHistory();


    return (
        <MuiThemeProvider>
            <div className='user-details-page-background'>
                <div className='user-details-page-content-wrapper'>
                    <div className='user-detail-page-body-wrapper'>
                        <div className='user-detail-content-container'>
                            <div className='user-detail-content-wrapper'>
                                {
                                    user && followedUsers && <div className='user-detail-content-body'>
                                        <img className='user-detail-profile-photo' src={user.profilePhotoUrl} />
                                        <div className='user-detail-name-container'>
                                            <h1>{user.name}</h1>
                                            <h4>@{user.username}</h4>
                                            <div className='user-detail-followers-row'>
                                                <p>{`${followerCount}`} <br /> Takipçi</p>
                                                <p>{`${followedUsers.length}`}<br />Takip Edilen</p>
                                            </div>
                                            {/* <p>DD.MM.YYYY Tarihinde Katıldı</p> */}
                                        </div>
                                    </div>
                                }

                                {isMyProfile != null &&
                                    <div className='user-detail-top-right-corner'>
                                        {isMyProfile == false ? <Button className='user-detail-top-right-corner-button'
                                            onClick={() => followUser(user.username)}
                                        >
                                            <p style={{ color: 'white', fontWeight: '600' }}>{isFollowing != null && isFollowing ? `Takibi Bırak` : "Takip Et"}</p>
                                        </Button> :
                                            <IconButton
                                                children={<Settings />}
                                            />
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='user-detail-liked-blogs-wrapper'>
                            <h3 style={{ marginBottom: '10px' }}>Beğenilen Bloglar</h3>
                            <div className='user-detail-liked-blogs'>
                                {isLikedBlogsPending ? <div></div> : likedBlogs && likedBlogs.length > 0 ? likedBlogs.map(blog => (
                                    <div key={blog._id} className="user-detail-liked-blog-card" onClick={(e) => {
                                        e.preventDefault()
                                        GoToBlog(blog._id)
                                    }}>
                                        <div className='user-detail-liked-blog-card-image-wrapper'>
                                            <img className='user-detail-liked-blog-card-image' src={blog.image} alt='blog-image' />
                                        </div>
                                        <div className='user-detail-liked-blog-card-content-wrapper'>
                                            <p className='user-detail-liked-blog-card-header'>{blog.title}</p>
                                            <div className="user-detail-liked-blog-card-container">
                                                <div className='user-detail-liked-blog-card-blog-content'>{blog.previewSubtitle
                                                }</div>
                                            </div>
                                        </div>
                                    </div>
                                )) : <div className='user-detail-not-found-text-container'>
                                    {
                                        isMyProfile != null &&
                                        <p className='user-detail-not-found-text'>{user && !isMyProfile ? `${user.username} adlı kullanıcı henüz bir blog beğenmemiş.` : `Beğendiğiniz bir blog bulunmamaktadır.`}</p>

                                    }
                                </div>
                                }
                            </div>
                        </div>
                        <div className='user-detail-liked-blogs-wrapper'>
                            <h3 style={{ marginBottom: '10px' }}>Kaydedilen Bloglar</h3>
                            <div className='user-detail-liked-blogs'>
                                {isBookmarkedBlogsPending ? <div></div> : (bookmarkedBlogs && bookmarkedBlogs.length > 0 ? bookmarkedBlogs.map(blog => (
                                    <div key={blog._id} className="user-detail-liked-blog-card" onClick={(e) => {
                                        e.preventDefault()
                                        GoToBlog(blog._id)
                                    }}>
                                        <div className='user-detail-liked-blog-card-image-wrapper'>
                                            <img className='user-detail-liked-blog-card-image' src={blog.image} alt='blog-image' />
                                        </div>
                                        <div className='user-detail-liked-blog-card-content-wrapper'>
                                            <p className='user-detail-liked-blog-card-header'>{blog.title}</p>
                                            <div className="user-detail-liked-blog-card-container">
                                                <div className='user-detail-liked-blog-card-blog-content'>{blog.previewSubtitle
                                                }</div>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                    <div className='user-detail-not-found-text-container'>
                                        {
                                            isMyProfile != null &&
                                            <p className='user-detail-not-found-text'>{user && !isMyProfile ? `${user.username} adlı kullanıcı henüz bir blog kaydetmemiş.` : `Kaydedilmiş bir blogunuz bulunmamaktadır.`}</p>

                                        }
                                    </div>)
                                }
                            </div>
                        </div>
                        {
                            //kullanıcının takip ettiği kişiler... takip edilen kısmı yani
                            followedUsers && followedUsers.map(user =>
                                (user.name) )
                        }
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
        // <div>
        //     {isPending && <div>Loading...</div>}
        //     {user && <div>{JSON.stringify(user)}</div>}
        // </div>

    );
}));

export default UserDetails;