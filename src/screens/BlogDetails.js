import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import BlogService from "../services/BlogService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";
import emptyheart from '../assets/icons/emptyheart.svg'
import heart from '../assets/icons/heart.svg'
import { stateToHTML } from "draft-js-export-html";
import convertFromRawToDraftState from 'draft-js/lib/convertFromRawToDraftState';
import { convertFromRaw } from 'draft-js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Button, Divider } from "@material-ui/core";
import CommentService from '../services/CommentService';
import { convertDateToReadableString } from '../helpers/Utils';
import { Delete } from '@material-ui/icons';


const BlogDetails = inject("UserStore")(observer((props) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [editorContent, setEditorContent] = useState(null);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        BlogService.getBlog(id).then((res) => {
            {
                if (res) {
                    var blogRes = JSON.parse(res);
                    blogRes.isLiked = false;
                    blogRes.likes.forEach(like => {
                        if (like.likerID == props.UserStore.user?._id) {
                            blogRes.isLiked = true;
                        }
                    })
                    setBlog(blogRes);
                    console.log("BLOG İLK DEĞER : ", blogRes)
                    var raw = convertFromRaw(blogRes.content)
                    var editorContent = stateToHTML(raw);
                    setEditorContent(editorContent)
                    setIsPending(false);
                    setLikeCount(blogRes.likes.length)
                }
            }
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
        var commentValue = {
            comment: commentText,
            date: Date.now(),
            commenterID: props.UserStore.user?._id,
            commenterName: props.UserStore.user?.name,
        }
        console.log(comment)
        CommentService.sendComment(blogID, commentValue).then(res => {
            if (res) {
                blog.comments.push(commentValue)
                setBlog(blog)
            }
            else {
                console.log("YORUM EKLEME BAŞARISIZ...")
                alert("Yorum eklerken bir sorun oluştu...")
            }
        })

    }

    const likeBlog = (blogID) => {
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
        }).catch(e => {
            alert("Bir hata oluştu...")
            console.log(e);
        });
    }


    return (
        <div className="blog-detail-page">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (

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
                                            sendComment(blog._id, comment)
                                        }}>
                                            <textarea 
                                            minLength='3' 
                                            placeholder='Yorumunuzu Giriniz...' 
                                            className='blog-detail-comment-textarea'
                                            value={comment}
                                            onChange={(e) => {setComment(e.target.value)}}
                                            >
                                            </textarea>
                                            <Button className='comment-button' type='submit'><div style={{ color: 'white' }}>Yorum Yap</div></Button>
                                        </form>
                                    </div>
                                </div>
                                {blog.comments.length > 0 && blog.comments.map(comment => (
                                    <div className='blog-comment-row'>
                                        <div>
                                            <img className='blog-detail-avatar' src={`${props.UserStore.user.profilePhotoUrl}`}></img>
                                        </div>
                                        <div className='comment-content-wrapper'>
                                            <div className='comment-header-row'>
                                                <h4>{comment.commenterName}</h4>
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

            )}


        </div>
    );
}));

export default BlogDetails;