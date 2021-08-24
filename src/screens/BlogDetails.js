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

const BlogDetails = inject("UserStore")(observer((props) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [editorContent, setEditorContent] = useState(null);

    useEffect(() => {
        BlogService.getBlog(id).then((res) => {
            {
                if (res) {
                    var blogRes = JSON.parse(res);
                    blogRes.isLiked = false;
                    blogRes.likes.forEach(like => {
                        if (like.likerID == props.UserStore.user?._id) {
                            console.log("BEĞENMİŞSİN");
                            blogRes.isLiked = true;
                        }
                    })
                    setBlog(blogRes);
                    console.log("BLOG İLK DEĞER : ", blogRes)
                    // console.log("DATAMIZ : " , blogRes.content)
                    var raw = convertFromRaw(blogRes.content)
                    var editorContent = stateToHTML(raw);
                    // console.log(editorContent);
                    setEditorContent(editorContent)
                    setIsPending(false);
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
                } else if (res == '200') {
                    setBlog({ ...blog, isLiked: true });
                }
            } else {
                //giriş yapması falan gerekiyor işte buraları ona göre ayarlayalım
                alert("Bir hata oluştu...")

            }
        }).catch(e => {
            alert("Bir hata oluştu...")

        });
    }


    return (
        <div className="blog-detail-page">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (

                <div className='blog-detail-wrapper-top'>
                    <div className="blog-detail-page-content-wrapper">
                        <img src={`${blog.image}`} alt="blog-image" className="blog-detail-image" />

                        <div className='blog-detail-content'>{ReactHtmlParser(editorContent)}</div>
                    </div>
                    {<img onClick={() => { likeBlog(blog._id) }} className='like-icon' src={blog.isLiked ? heart : emptyheart} alt="like-icon" />}

                </div>

            )}


        </div>
    );
}));

export default BlogDetails;