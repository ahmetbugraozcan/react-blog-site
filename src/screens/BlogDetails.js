import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import BlogService from "../services/BlogService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";



const BlogDetails = inject("UserStore")(observer((props) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        BlogService.getBlog(id).then((res) => {
            {
                if (res) {
                    var blogRes = JSON.parse(res);
                    setBlog(blogRes);
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


    return (
        <div className="blog-detail-page">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (

                <div className="blog-detail-page-content-wrapper">
                    <img src={`${blog.image}`} alt="blog-image" className="blog-detail-image" />
                    <article className='blog-detail-article'>
                        <h2 className='blog-detail-header'>{blog.title}</h2>
                        <div className='blog-detail-content'>{blog.content}</div>
                        <p className='blog-detail-author'>Written by <Link to={`../user/${blog.authorID}`}>{blog.authorName}</Link></p>
                    </article>
                </div>

            )}


        </div>
    );
}));

export default BlogDetails;