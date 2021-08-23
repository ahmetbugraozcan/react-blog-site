import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import BlogService from "../services/BlogService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";
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
                    setBlog(blogRes);
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


    return (
        <div className="blog-detail-page">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (

                <div className="blog-detail-page-content-wrapper">
                    <img src={`${blog.image}`} alt="blog-image" className="blog-detail-image" />

                    <div className='blog-detail-content'>{ReactHtmlParser(editorContent)}</div>
                </div>

            )}


        </div>
    );
}));

export default BlogDetails;