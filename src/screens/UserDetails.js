import { useEffect, useRef, useState } from 'react';
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
import { CloudUpload, Done, Edit, Settings } from '@material-ui/icons';
import IconButton from 'material-ui/IconButton';
import UserService from '../services/UserService';
import FollowModal from '../components/modal/FollowModal'
import SettingsModal from '../components/modal/SettingsModal'

//Detay sayfasıyla profili ayırabilirdik..
//Bu kişinin parolası gelmemesi gerekiyor kullanıcı detayları için başka bir sorgu yapabiliriz
const UserDetails = inject("UserStore")(observer((props) => {
    const history = useHistory();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isFollowedUsersModalOpen, setIsFollowedUsersModalOpen] = useState(false);
    const [isBookmarkedBlogsPending, setIsBookmarkedBlogsPending] = useState(false);
    const [isLikedBlogsPending, setIsLikedBlogsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isMyProfile, setIsMyProfile] = useState(null);
    const [likedBlogs, setLikedBlogs] = useState([])
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([])
    const [isFollowing, setIsFollowing] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [file, setFile] = useState('');
    const [isEditModeOpen, setIsEditModeOpen] = useState(false);
    const [usernameField, setUsernameField] = useState('')
    const [nameField, setNameField] = useState('')
    const inputFile = useRef(null)


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
                        user.followers.pop({ follower: follower });

                    } else if (res == '200') {
                        console.log("Takibe başladık bu kişiyi")
                        var count = followerCount + 1;
                        setFollowerCount(count)
                        setIsFollowing(true);
                        if (user) {
                            user.followers.push({ follower: follower });
                        }
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

    const closeFollowerModal = () => {
        setIsFollowerModalOpen(false)
    }

    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false)
    }

    const closeFollowedUsersModal = () => {
        setIsFollowedUsersModalOpen(false)
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
    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    useEffect(() => {
        setIsMyProfile(null);
        setIsFollowerModalOpen(false);
        setIsFollowedUsersModalOpen(false);
        setIsSettingsModalOpen(false);
        setIsPending(true)
        AuthService.getUser(username).then((res) => {
            {
                if (res) {
                    var userRes = JSON.parse(res);
                    setUser(userRes);
                    if (userRes._id == props.UserStore.user._id) {
                        setIsMyProfile(true)
                        setUsernameField(userRes.username)
                        setNameField(userRes.name)
                    }
                    else {
                        setIsMyProfile(false)
                    }
                    setIsFollowing(false);
                    userRes.followers.forEach(follower => {
                        if (follower.follower._id == props.UserStore.user._id) {
                            setIsFollowing(true);
                        }
                    })

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

    //bu işlem dbye kaydetmek için 
    //     axios.post("http://localhost:8000/image", data, { // receive two parameter endpoint url ,form data 
    // })
    // .then(res => { // then print response status
    //   console.log(res.statusText)
    // })
    const updateProfilePhoto = async (e) => {
        e.preventDefault();

        if (file) {
            let formData = new FormData();
            formData.append("photo", file);
            await UserService.updateProfilePhoto(formData, props.UserStore.user._id).then(res => {
                if (res) {
                    // props.UserStore.user.profilePhotoUrl = res;
                    var tempUser = { ...user, profilePhotoUrl: JSON.parse(res).profilePhotoUrl };
                    setUser(tempUser)
                    props.UserStore.setUser(tempUser);
                    setFile(null)
                    // console.log(user.profilePhotoUrl)
                }
                else {
                }
            })
        }
    }

    const updateUserName = async (e) => {
        e.preventDefault();

        if (props.UserStore.user.username != usernameField) {
            await UserService.updateUserName(usernameField, props.UserStore.user._id).then(res => {
                if (res) {
                    console.log("RESPONSE : ", res);
                    // props.UserStore.user.profilePhotoUrl = res;
                    var tempUser = {...user, username: res};
                    setUser(tempUser)
                    props.UserStore.setUser(tempUser);
                    setFile(null)
                    // console.log(user.profilePhotoUrl)
                }
                else {
                }
            })
        }
        else {
            console.log("Kullanıcı adları aynı değişmedi")
        }
    }

    const updateName = async (e) => {
        e.preventDefault();
        console.log("props before : ", props.UserStore.user.name)

        if (props.UserStore.user.name != nameField) {
            await UserService.updateName(nameField, props.UserStore.user._id).then(res => {
                if (res) {
                    var tempUser = {...user ,name :res};
                    setUser(tempUser)
                    // props.UserStore.user.name = res;
                    props.UserStore.setUser(tempUser);
                    setFile(null)
                    // console.log(user.profilePhotoUrl)
                }
                else {
                }
            })
        }
        else {
            console.log("İsim aynı değişmedi")
        }
    }

    const photoUpload = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const fileInput = e.target.files[0];
        setFile(fileInput)


        reader.readAsDataURL(fileInput);
        reader.onloadend = async () => {
            var base64data = reader.result;
            var blob = await (await fetch(base64data)).blob()
            const objectURL = URL.createObjectURL(blob)
            // console.log(blob)

            // UserService.uploadProfilePhoto(blob, props.UserStore.user._id)
            //bu işlem preview için
            fetch(objectURL).then(
                async (res) => {
                    var blobres = await res.blob()
                    const base64String = await convertBlobToBase64(blobres);
                    setImagePreviewUrl(base64String);
                    // console.log(blobres)
                    //deneme
                }
            );

        }
    }

    // const ImgUpload = ({
    //     onChange,
    //     src,
    // }) => {
    //     return (
    //         <label for="photo-upload" className="custom-file-upload fas">
    //             <div className="img-wrap img-upload" >
    //                 <img for="photo-upload" src={src} />
    //             </div>
    //             <input id="photo-upload" type="file" onChange={onChange} />
    //         </label>
    //     );
    // }

    return (
        <MuiThemeProvider>
            <div className='user-details-page-background'>
                <div className='user-details-page-content-wrapper'>
                    {user ? <div className='user-detail-page-body-wrapper'>
                        <div>
                            {
                                isSettingsModalOpen && !isFollowedUsersModalOpen && !isFollowerModalOpen && props.UserStore.user &&
                                <SettingsModal
                                    onClose={closeSettingsModal}
                                />
                            }
                            {
                                isFollowerModalOpen && !isFollowedUsersModalOpen && !isSettingsModalOpen && props.UserStore.user &&
                                <FollowModal
                                    modalType='followers'
                                    header='Takipçiler'
                                    onClose={closeFollowerModal}
                                    currentUser={props.UserStore.user}
                                    followers={user && user.followers}
                                />
                            }
                            {
                                isFollowedUsersModalOpen && !isFollowerModalOpen && !isSettingsModalOpen && props.UserStore.user &&
                                <FollowModal
                                    modalType='followedUsers'
                                    header='Takip edilenler'
                                    onClose={closeFollowedUsersModal}
                                    followedUsers={followedUsers && followedUsers}
                                    currentUser={props.UserStore.user}
                                />
                            }
                        </div>
                        <div className='user-detail-content-container'>
                            <div className='user-detail-content-wrapper'>
                                {
                                    user && followedUsers &&
                                    (!isEditModeOpen ?
                                        <div className='user-detail-content-body'>
                                            <div className={`user-detail-profile-photo-container`}>
                                                <img className='user-detail-profile-photo' src={user.profilePhotoUrl} />
                                                <div className="user-detail-profile-photo-overlay">
                                                    <CloudUpload className="user-detail-profile-photo-upload-icon"></CloudUpload>
                                                </div>
                                            </div>
                                            <div className='user-detail-name-container'>
                                                <h1>{user.name.substring(0, 20)}</h1>
                                                <h4>@{user.username.substring(0, 20)}</h4>
                                                <div className='user-detail-followers-row'>
                                                    <p
                                                        className='user-detail-followers-button'
                                                        onClick={() => { setIsFollowerModalOpen(true) }}
                                                    >{`${followerCount}`} <br /> Takipçi</p>
                                                    <p
                                                        className='user-detail-followers-button'
                                                        onClick={() => { setIsFollowedUsersModalOpen(true) }}
                                                    >{`${followedUsers.length}`}<br />Takip Edilen</p>
                                                </div>
                                                {/* <p>DD.MM.YYYY Tarihinde Katıldı</p> */}
                                            </div>
                                        </div> :
                                        //EDIT MODU
                                        <form id="my-form" onSubmit={async (e) => {
                                            //updateusername
                                            //updatename
                                            e.preventDefault();
                                            await updateProfilePhoto(e);
                                            await updateUserName(e);
                                            await updateName(e);
                                            setIsEditModeOpen(!isEditModeOpen);
                                            //submit method
                                        }}>
                                            <div className='user-detail-content-body'>
                                                <label htmlFor="photo-upload">
                                                    <div
                                                        className={`user-detail-profile-photo-container-edit`}
                                                        onClick={() => {
                                                            inputFile.current.click();
                                                        }}
                                                    >
                                                        <img className='user-detail-profile-photo' src={imagePreviewUrl ?? user.profilePhotoUrl} />
                                                        <div className="user-detail-profile-photo-overlay">
                                                            <CloudUpload className="user-detail-profile-photo-upload-icon"></CloudUpload>
                                                            <input type="file" id="file" ref={inputFile} style={{ display: "none" }}
                                                                onChange={(e) => { photoUpload(e) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </label>
                                                <div className='user-detail-name-container'>
                                                    <label className='user-detail-edit-mode-label' htmlFor='name'>Kullanıcı Ad-Soyad</label>
                                                    <input className='user-detail-edit-mode-input' value={nameField} onChange={(e) => { setNameField(e.target.value) }} id='name' />
                                                    <label className='user-detail-edit-mode-label' htmlFor='username'>Kullanıcı Adı</label>
                                                    <input className='user-detail-edit-mode-input' value={usernameField} onChange={(e) => { setUsernameField(e.target.value) }} id='username' />
                                                    {/* <h1>{user.name}</h1>
                                                    <h4>@{user.username}</h4> */}
                                                    {/* <div className='user-detail-followers-row'>
                                                    <p
                                                        className='user-detail-followers-button'
                                                        onClick={() => { setIsFollowerModalOpen(true) }}
                                                    >{`${followerCount}`} <br /> Takipçi</p>
                                                    <p
                                                        className='user-detail-followers-button'
                                                        onClick={() => { setIsFollowedUsersModalOpen(true) }}
                                                    >{`${followedUsers.length}`}<br />Takip Edilen</p>
                                                </div> */}
                                                    {/* <p>DD.MM.YYYY Tarihinde Katıldı</p> */}
                                                </div>
                                            </div>
                                        </form>
                                    )
                                }
                                {isMyProfile != null &&
                                    <div className='user-detail-top-right-corner'>
                                        {isMyProfile == false ? <Button className='user-detail-top-right-corner-button'
                                            onClick={() => followUser(user.username)}
                                        >
                                            <p style={{ color: 'white', fontWeight: '600' }}>{isFollowing != null && isFollowing ? `Takibi Bırak` : "Takip Et"}</p>
                                        </Button> :
                                            <div>
                                                {isEditModeOpen ?
                                                    <button
                                                        type='submit'
                                                        form='my-form'
                                                        className='user-details-button'
                                                    >
                                                        <Done />
                                                    </button>
                                                    // <IconButton
                                                    //     // onClick={() => setIsEditModeOpen(!isEditModeOpen)}
                                                    //     type='submit'
                                                    //     form='my-form'
                                                    //     children={
                                                    //         <Done />}
                                                    // />
                                                    // <Button
                                                    //     type="submit"
                                                    //     form="my-form"
                                                    //     onClick={(e) => {

                                                    //     }}

                                                    // >
                                                    //     Click me 
                                                    // </Button>
                                                    :
                                                    <IconButton
                                                        type='button'
                                                        onClick={() => setIsEditModeOpen(!isEditModeOpen)}
                                                        children={
                                                            <Edit />}
                                                    />

                                                }
                                                <IconButton
                                                    onClick={() => { setIsSettingsModalOpen(true) }}
                                                    children={<Settings />}
                                                />

                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <ImgUpload onChange={(e)=> photoUpload(e)} src={imagePreviewUrl}/> */}

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
                        {/* {
                            //kullanıcının takip ettiği kişiler... takip edilen kısmı yani
                            followedUsers && followedUsers.map(user =>
                                (user.name) )
                        } */}
                    </div> : isPending ? <div>Yükleniyor</div> : <div>KULLANICI BULUNAMADI</div>}
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