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

//Bu kişinin parolası gelmemesi gerekiyor kullanıcı detayları için başka bir sorgu yapabiliriz
const UserDetails = inject("UserStore")(observer((props) => {
    const history = useHistory();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [likedBlogs, setLikedBlogs] = useState([])

    const GoToBlog = (blogID) => {
        console.log(history)
        history.replace();

        history.push(`${RouteConstants.BLOG}/${blogID}`)
    }

    function getLikedBlogs(userID) {
        BlogService.getLikedBlogs(userID).then(res => {
            if (res) {
                setLikedBlogs(JSON.parse(res));
            }
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
                    console.log("user : ", user)
                    if (userRes._id == props.UserStore.user._id) {
                        setIsMyProfile(true)
                        console.log("BENİM PROFİLİM")
                    }
                    else {
                        setIsMyProfile(false)
                        console.log("BAŞKASININ PROFİLİ")
                    }

                }
            }
            getLikedBlogs(JSON.parse(res)._id);
            setIsPending(false);
        })

    }, [username]);
    // const history = useHistory();


    return (
        <div className='user-details-page-background'>
            <div className='user-details-page-content-wrapper'>
                <div className='user-detail-page-body-wrapper'>
                    <div className='user-detail-content-container'>
                        <div className='user-detail-content-wrapper'>
                            <div className='user-detail-content-body'>
                                <img className='user-detail-profile-photo' src={props.UserStore.user.profilePhotoUrl} />
                                <div className='user-detail-name-container'>
                                    <h1>{props.UserStore.user.name}</h1>
                                    <h4>@{props.UserStore.user.username}</h4>
                                    <div className='user-detail-followers-row'>
                                        <p>10 <br /> Takipçi</p>
                                        <p>20 <br />Takip Edilen</p>
                                    </div>
                                    {/* <p>DD.MM.YYYY Tarihinde Katıldı</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='user-detail-liked-blogs'>
                        {likedBlogs && likedBlogs.map(blog => (
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
                        ))}
                    </div>
                </div>

                {/* <div className='user-detail-content-container'>
                    <div className='user-detail-content-wrapper'>
                        <div className='user-detail-content-body'>
                            <img className='user-detail-profile-photo' src={props.UserStore.user.profilePhotoUrl} />
                            <div className='user-detail-name-container'>
                                <h1>{props.UserStore.user.name}</h1>
                                <h4>@{props.UserStore.user.username}</h4>
                                <div className='user-detail-followers-row'>
                                    <p>10 <br /> Takipçi</p>
                                    <p>20 <br />Takip Edilen</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        // <div>
        //     {isPending && <div>Loading...</div>}
        //     {user && <div>{JSON.stringify(user)}</div>}
        // </div>

    );
}));

export default UserDetails;