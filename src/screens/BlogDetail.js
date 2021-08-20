import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import BlogService from "../services/BlogService";

const BlogDetails = () => {
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
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.authorName}</p>
                    <div>{blog.body}</div>
                </article>
            )}


        </div>
    );
}

export default BlogDetails;