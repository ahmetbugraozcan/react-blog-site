import { Link, useLocation } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button, Divider } from "@material-ui/core";
import BlogService from "../services/BlogService";
import React, { useState } from "react";

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
        console.log(props.UserStore.user)
        this.loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            ' Donec convallis lectus vitae tellus placerat lacinia eu ut dolor. Proin fermentum lectus nec felis consectetur, ut ullamcorper purus maximus. Aenean laoreet nulla non neque consequat vestibulum. Curabitur sagittis, velit vel pretium bibendum, felis orci semper enim, sit amet egestas urna dui ut nisi. Duis id vestibulum odio. Aliquam sed metus bibendum, lobortis sapien in, pharetra mi. Proin in imperdiet mi, nec ornare neque. Vestibulum euismod lectus lacus, quis venenatis ligula volutpat sed. Duis in pharetra nisi, eget interdum urna. Phasellus at pellentesque urna. Nulla libero augue, vehicula vitae aliquam pretium, commodo vel mauris. Nam leo odio, suscipit id mi a, ullamcorper facilisis metus. Etiam eu metus purus. Curabitur vitae purus nisl'
            + 'Vivamus posuere id lacus sit amet laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse vulputate turpis justo, a efficitur neque tincidunt id. Maecenas at est eget libero feugiat tempus eu quis sem. Mauris ac mi vitae mi imperdiet tincidunt. Sed eget lacus et quam congue dapibus. Morbi pretium mattis enim, a sagittis neque vulputate quis. Nulla nunc ipsum, tincidunt id risus rutrum, semper finibus augue. Etiam pretium, leo vitae efficitur viverra, nisi nibh viverra metus, at sodales nisi mauris at dui.';
        this.loremIpsum2 = ' Donec convallis lectus vitae tellus placerat lacinia eu ut dolor. Proin fermentum lectus nec felis consectetur, ut ullamcorper purus maximus. Aenean laoreet nulla non neque consequat vestibulum. Curabitur sagittis, velit vel pretium bibendum, felis orci semper enim, sit amet egestas urna dui ut nisi. Duis id vestibulum odio. Aliquam sed metus bibendum, lobortis sapien in, pharetra mi. Proin in imperdiet mi, nec ornare neque. Vestibulum euismod lectus lacus, quis venenatis ligula volutpat sed. Duis in pharetra nisi, eget interdum urna. Phasellus at pellentesque urna. Nulla libero augue, vehicula vitae aliquam pretium, commodo vel mauris. Nam leo odio, suscipit id mi a, ullamcorper facilisis metus. Etiam eu metus purus. Curabitur vitae purus nisl'

            + 'Vivamus posuere id lacus sit amet laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse vulputate turpis justo, a efficitur neque tincidunt id. Maecenas at est eget libero feugiat tempus eu quis sem. Mauris ac mi vitae mi imperdiet tincidunt. Sed eget lacus et quam congue dapibus. Morbi pretium mattis enim, a sagittis neque vulputate quis. Nulla nunc ipsum, tincidunt id risus rutrum, semper finibus augue. Etiam pretium, leo vitae efficitur viverra, nisi nibh viverra metus, at sodales nisi mauris at dui.';
    }
    componentDidMount() {
        BlogService.getBlogs().then((res) => {
            console.log("setstate")
            this.setState({ blogs: JSON.parse(res) })
            // this.setState(this.state)
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
                    <div className='blog-grid'>
                        {
                            this.state.blogs.map((blog) => {
                                return <Link key={blog._id} to={`/blog/${blog._id}`} >
                                    <div className='blog-card'>
                                        <div className='blog-photo-wrapper'>
                                            <img className='blog-photo' src={blog.image} alt='blog-image' />
                                        </div>
                                        <div className="blog-body">
                                            <div className='blog-card-content-wrapper'>
                                                <p className='blog-content-header'>{blog.title}</p>
                                                <div className="blog-content-container">
                                                    <p className='blog-content'>{blog.content}</p>
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
                                                        <img className='blog-icon' src="https://image.flaticon.com/icons/png/512/1077/1077035.png" alt="view-icon" />
                                                        <div className='blog-icon-row-text'>{blog.likes.length}</div>
                                                    </div>
                                                    <div className='blog-icon-row'>
                                                        <img className='blog-icon' src="https://image.flaticon.com/icons/png/512/54/54761.png" alt="comment-icon" />
                                                        <div className='blog-icon-row-text'>{blog.comments.length}</div>
                                                    </div>
                                                </div>
                                                <div className='blog-footer-date-container'>
                                                    {blog.createdDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }

                    </div>
                </div>
            </div>
        )
    };
}

export default HomePage;