import { Link, useLocation } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button, Divider } from "@material-ui/core";
import { convertFromRaw } from "draft-js";
import BlogService from "../services/BlogService";
import React, { useState } from "react";
import emptyheart from '../assets/icons/emptyheart.svg'
import heart from '../assets/icons/heart.svg'
import { FavoriteBorder } from "@material-ui/icons";
import { stateToHTML } from "draft-js-export-html";
import { convertDateToReadableString } from '../helpers/Utils';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// const HomePage = inject("UserStore")(observer((props) => {    // const location = useLocation();
//     // ${location.state?.user}
//     const [loading, setLoading] = useState(false);



// }));

@inject("UserStore")
@observer
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            blogs: [],
        }
        // console.log(props.UserStore.user)
    }
    componentDidMount() {
        this.setState({isLoading:true})
        BlogService.getBlogs().then((res) => {
            var blogsRes = JSON.parse(res);
            blogsRes.forEach(blogRes => {
                blogRes.isLiked = false;
                blogRes.likes.forEach(like => {
                    if (like.likerID == this.props.UserStore.user?._id) {
                        console.log("BEĞENMİŞSİN");
                        blogRes.isLiked = true;
                    }
                })
            })

            this.setState({ blogs: blogsRes })
            this.setState(this.state)
            this.setState({isLoading:false})
        })

    }

    /**
     * 
     * 
             
                <div className='blog-card'>
                    <div className='blog-photo-wrapper'>
                        <img className='blog-photo'src="https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg" />
                    </div>
                    <div className='blog-card-content-wrapper'>
                        <p className='blog-content-header'>Lorem Ipsum Dolor Sit Amet</p>
                        <div className="blog-content-container">
                            <p className='blog-content'>{this.loremIpsum2}</p>
                        </div>
                    </div>
                </div>
            
     */
    render() {
        return (
            <div className='blog-page-background'>
                <div className='page-content-wrapper'>
                    {this.state.isLoading ? <h1>LOADING</h1> : this.state.blogs.length > 0 ?
                        <div className='blog-grid'>
                            {this.state.blogs && this.state.blogs.map((blog) => {
                                return <Link key={blog._id} to={`/blog/${blog._id}`} >
                                    <div className='blog-card'>
                                        <div className='blog-photo-wrapper'>
                                            <img className='blog-photo' src={blog.image} alt='blog-image' />
                                        </div>
                                        <div className="blog-body">
                                            <div className='blog-card-content-wrapper'>
                                                <p className='blog-content-header'>{blog.title}</p>
                                                <div className="blog-content-container">
                                                    {/* <div className='blog-content'>{ReactHtmlParser(stateToHTML(convertFromRaw(blog.content))) */}
                                                    <div className='blog-content'>{blog.previewSubtitle
                                                    }</div>
                                                </div>
                                                <Divider></Divider>
                                            </div>
                                            <div className='blog-footer'>
                                                <div className='blog-footer-icon-container'>
                                                    <div className='blog-icon-row'>
                                                        <img className='blog-icon' src="https://image.flaticon.com/icons/png/512/709/709612.png" alt="view-icon" />
                                                        <div className='blog-icon-row-text'>{blog.numberOfView}</div>
                                                    </div>
                                                    <div className='blog-icon-row'>
                                                        <img className='blog-icon' src={blog.isLiked ? heart : emptyheart} alt="like-icon" />
                                                        {/* {<img onClick={() => { likeBlog(blog._id) }} className='like-icon' src={blog.isLiked ? heart : emptyheart} alt="like-icon" />} */}

                                                        <div className='blog-icon-row-text'>{blog.likes.length}</div>
                                                    </div>
                                                    <div className='blog-icon-row'>
                                                        <img className='blog-icon' src="https://image.flaticon.com/icons/png/512/54/54761.png" alt="comment-icon" />
                                                        <div className='blog-icon-row-text'>{blog.comments.length}</div>
                                                    </div>
                                                </div>
                                                <div className='blog-footer-date-container'>
                                                    {convertDateToReadableString(blog.createdDate)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            })
                            }

                        </div> :
                        <div className="empty-home-page-wrapper">{"HENÜZ BİR BLOG EKLENMEMİŞ."}</div>}
                </div>
            </div>
        )
    };
}

export default HomePage;