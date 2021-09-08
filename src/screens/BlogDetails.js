import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import BlogService from "../services/BlogService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";
import emptyheart from '../assets/icons/emptyheart.svg'
import heart from '../assets/icons/heart.svg'
import ribbon from '../assets/icons/ribbon.svg'
import bookmark from '../assets/icons/bookmark.svg'
import { stateToHTML } from "draft-js-export-html";
import convertFromRawToDraftState from 'draft-js/lib/convertFromRawToDraftState';
import { convertFromRaw } from 'draft-js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Button, Divider } from "@material-ui/core";
import CommentService from '../services/CommentService';
import { convertDateToReadableString } from '../helpers/Utils';


const BlogDetails = inject("UserStore")(observer((props) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [editorContent, setEditorContent] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isMyBlog, setIsMyBlog] = useState(null);
    const [isFollowingBlogAuthor, setIsFollowingBlogAuthor] = useState(null);

    //böyle düzgün çalışmıyor. Bir kez blogu kaydedince user bilgilerini de 
    //kaydetmişiz ama hep eski bilgiler. o yüzden blogu getirince id ile userı da getirmemiz gerekiyor.
    useEffect(() => {
        setLoading(true);
        BlogService.getBlog(id).then((res) => {
            {
                if (res) {
                    var blogRes = JSON.parse(res);
                    blogRes.isLiked = false;
                    blogRes.isBookmarked = false;
                    blogRes.likes.forEach(like => {
                        //filter kullanılabilir
                        if (like.likerID == props.UserStore.user?._id) {
                            blogRes.isLiked = true;
                        }
                    })
                    blogRes.bookmarkedUserIDs.forEach(bookmarkedUserID => {
                        console.log(bookmarkedUserID)
                        //filter kullanılabilir
                        if (bookmarkedUserID == props.UserStore.user?._id) {
                            blogRes.isBookmarked = true;
                            console.log("BURAYA GİRDİK")
                        }
                    })
                    
                    // blogRes.author.followers.forEach(follower => {
                    //     console.log("follower : " , follower);
                    // })
                    setBlog(blogRes);
                    console.log("BLOG İLK DEĞER : ", blogRes)
                    var raw = convertFromRaw(blogRes.content)
                    var editorContent = stateToHTML(raw);
                    setEditorContent(editorContent)
                    setIsPending(false);
                    setLikeCount(blogRes.likes.length)
                    setBookmarkCount(blogRes.bookmarkedUserIDs.length)
                }
            }
            setLoading(false);
        }
        )


        // fetch("/blog/").then(
        //     res => setState(res.data)
        // )
    }, []);
    //  const { data:blog, error, isPending} = useFetch("http://localhost:9000/blog/" + id);
    const history = useHistory();
    //  const handleClick = () => {
    //     fetch('http://localhost:9000/blog/' + blog.id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.push('/');
    //     });
    //  }

    const sendComment = (blogID, commentText) => {
        if (!loading) {
            setLoading(true);

            var commentValue = {
                comment: commentText,
                date: Date.now(),
                commenter: props.UserStore.user
            }
            CommentService.sendComment(blogID, commentValue).then(res => {
                if (res) {
                    blog.comments.push(commentValue)
                    setBlog(blog)
                }
                else {
                    console.log("YORUM EKLEME BAŞARISIZ...")
                    alert("Yorum eklerken bir sorun oluştu...")
                }
                setLoading(false);
            })
        }


    }

    const likeBlog = (blogID) => {
        if (!loading) {
            setLoading(true);
            var like = {
                blog: blogID,
                likerID: props.UserStore.user?._id,
            }
            BlogService.likeBlog(like, blogID).then(res => {
                if (res) {
                    //setblogda bi gariplik var gibi ama çalışıyor şimdilik 
                    if (res == '202') {
                        setBlog({ ...blog, isLiked: false })
                        var count = likeCount - 1;
                        setLikeCount(count)
                    } else if (res == '200') {
                        setBlog({ ...blog, isLiked: true });
                        var count = likeCount + 1;
                        setLikeCount(count)
                        // setLikeCount(likeCount++)
                    }
                } else {
                    //giriş yapması falan gerekiyor işte buraları ona göre ayarlayalım
                    alert("Bir hata oluştu...")
                }
                setLoading(false);
            }).catch(e => {
                setLoading(false);
                alert("Bir hata oluştu...")
                console.log(e);

            });
        }
    }

    const bookmarkBlog = (blogID) => {
        if (!loading) {
            var bookmark = {
                blog: blog,
                bookmarkedUserID: props.UserStore.user?._id,
            }
            setLoading(true);
            BlogService.bookmarkBlog(bookmark, blogID).then(res => {
                if (res) {
                    if (res == '202') {
                        var count = bookmarkCount - 1;
                        setBlog({ ...blog, isBookmarked: false })
                        setBookmarkCount(count)
                    } else if (res == '200') {
                        setBlog({ ...blog, isBookmarked: true });
                        var count = bookmarkCount + 1;
                        setBookmarkCount(count)
                    }
                } else {
                    //giriş yapması falan gerekiyor işte buraları ona göre ayarlayalım
                    alert("Bir hata oluştu...")
                }
                setLoading(false);
            }).catch(e => {
                setLoading(false);
                alert("Bir hata oluştu...")
                console.log(e);
            })
        };
    }


    return (
        <div className="blog-detail-page">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (

                <div className='blog-detail-row'>
                    <Link to={`../user/${blog.author.username}`} className='blog-user-sticky'>
                        <img className='blog-detail-user-card-avatar' src={`${blog.author.profilePhotoUrl}`}></img>
                        <div className='blog-detail-name-field'>
                            <h2 className='blog-detail-name'>{`${blog.author.name}`}</h2>
                            <h4 className='blog-detail-username'>{`@${blog.author.username}`}</h4>
                        </div>
                        {/* <div className='sticky-user-card-column'>
                            <h3>{`Yazar`}</h3>
                            <div>{`${blog.author.username}`}</div>
                            <div>{`${blog.author.email}`}</div>
                        </div> */}
                    </Link>
                    <div className='blog-detail-wrapper-top'>
                        <div className='blog-detail-page-body'>
                            <div className="blog-detail-page-content-wrapper">
                                <img src={`${blog.image}`} alt="blog-image" className="blog-detail-image" />

                                <div className='blog-detail-content'>{ReactHtmlParser(editorContent)}</div>
                                <Divider style={{ marginTop: '20px' }} />
                                <div className='blog-detail-bottom'>
                                    <div className='like-count-row'>
                                        <p style={{ paddingRight: '5px' }}>{likeCount}</p>
                                        {<img onClick={() => { likeBlog(blog._id) }} className='blog-detail-like-icon' src={blog.isLiked ? heart : emptyheart} alt="like-icon" />}
                                    </div>

                                    <div className='like-count-row'>
                                        <p style={{ paddingRight: '5px' }}>{bookmarkCount}</p>
                                        {<img onClick={() => { bookmarkBlog(blog._id) }} className='blog-detail-like-icon' src={blog.isBookmarked ? bookmark : ribbon} alt="like-icon" />}
                                    </div>

                                </div>
                            </div>
                            <div className='blog-detail-comments-wrapper'>
                                <div>
                                    <h2 className='comments-header'>{`Yorumlar (${blog.comments.length})`}</h2>
                                    <div className='blog-form-row'>
                                        <div>
                                            <img className='blog-detail-avatar' src={`${props.UserStore.user.profilePhotoUrl}`}></img>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <form className='comment-form' onSubmit={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                sendComment(blog._id, comment)
                                            }}>
                                                <textarea
                                                    minLength='3'
                                                    placeholder='Yorumunuzu Giriniz...'
                                                    className='blog-detail-comment-textarea'
                                                    value={comment}
                                                    onChange={(e) => { setComment(e.target.value) }}
                                                >
                                                </textarea>
                                                <Button className='comment-button' type='submit'><div style={{ color: 'white' }}>Yorum Yap</div></Button>
                                            </form>
                                        </div>
                                    </div>
                                    {blog.comments.length > 0 && blog.comments.map(comment => (
                                        <div key={`${comment._id}`} className='blog-comment-row'>
                                            <div>
                                                <img className='blog-detail-avatar' src={`${comment.commenter.profilePhotoUrl}`}></img>
                                            </div>
                                            <div className='comment-content-wrapper'>
                                                <div className='comment-header-row'>
                                                    <Link to={`../user/${comment.commenter.username}`}>
                                                        <h4 className='blog-detail-commenter-name'>{comment.commenter.name}</h4>
                                                    </Link>
                                                    <h5 style={{ color: 'gray' }}>{convertDateToReadableString(comment.date)}</h5>
                                                </div>
                                                <p className='comment-content'>{comment.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}


        </div>
    );
}));

export default BlogDetails;