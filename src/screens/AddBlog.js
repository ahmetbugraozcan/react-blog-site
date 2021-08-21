import { AddCircleOutline } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BlogService from "../services/BlogService";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { Editor, RichUtils } from "draft-js";
import EditorState from "draft-js/lib/EditorState";
import MyEditor from "../components/modal/MyEditor"


// authorName: Joi.string().required(),
// authorID: Joi.string().required(),

@inject("UserStore")
@observer
class AddBlog extends React.Component {
    constructor(props) {
        super(props);
        // const [title, setTitle] = useState('');
        //     const [content, setContent] = useState('');
        //     const [image, setImage] = useState('https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg');
        //     // const [author, setAuthor] = useState('yoshi');
        //     const [isPending, setIsPending] = useState(false);
        //     const history = useHistory();
        this.state = {
            title: '',
            content: '',
            image: 'https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg',
            isPending: false,
        }
        this.onChange = (editorState) => this.setState({ editorState });
    }
    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ));
    }
    _onLinkClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'LINK'
        ));
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    componentDidMount(){
        console.log(this.state.editorState)
    }
    addBlog() {
        console.log("title : ", this.state.title)
        const blog = {
            title: this.state.title,
            content: this.state.content,
            image: this.state.image,
            authorName: this.props.UserStore.user.username,
            authorID: this.props.UserStore.user._id,
        }
        // Api request here
        // setIsPending(true);
        this.setState({ isPending: true })
        console.log("Blog : ", blog)

        BlogService.addBlog(blog).then((res) => {
            {
                this.setState(this.state);
                this.setState({ isPending: false })
                if (res) {
                    // var blogRes = JSON.parse(res);
                    console.log("RESPONSE : ", res);
                    alert("Blog Başarıyla Eklendi")
                }
                else {
                    alert("Blog yüklenirken bir hata oluştu")
                }

            }
        }
        )
    }

    render() {
        return (
            <div className="create">
                <h2>Yeni Blog Ekle</h2>
                <h2>{this.props.UserStore.user.name}</h2>
                {/* <div className='add-blog-image-container' onClick={() => {

            }}>
                <AddCircleOutline className={'add-blog-image-icon'} />
            </div> */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.addBlog();
                }}>
                    <label>Blog Başlığı:</label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        maxLength={40}
                        value={this.state.title}
                        onChange={(e) => {
                            e.preventDefault();
                            this.setState({ title: e.target.value })
                        }}
                    />
                    <label>Blog Fotoğrafı:</label>
                    <input
                        type="text"
                        required
                        value={this.state.image}
                        onChange={(e) => {
                            e.preventDefault();
                            this.setState({ image: e.target.value })
                        }}
                    />
                    <label>Blog İçeriği:</label>
                    {/* <textarea
                        required
                        minLength={40}
                        value={this.state.content}
                        onChange={(e) => {
                            e.preventDefault();
                            this.setState({ content: e.target.value })
                        }}
                    ></textarea> */}

                    {/* <label>Blog author:</label> */}
                    {/* <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select> */}
                    {!this.state.isPending && <button>Add Blog</button>}
                    {this.state.isPending && <button>Adding blog..</button>}
                </form>
                <MyEditor />
                {/* <DraftEditor onChange={this.onChange} editorState={this.state.editorState}/> */}
            </div>
        );
    }


}
export default AddBlog;

// const AddBlog  = inject("UserStore")(observer((props) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [image, setImage] = useState('https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg');
//     // const [author, setAuthor] = useState('yoshi');
//     const [isPending, setIsPending] = useState(false);
//     const history = useHistory();

//     const fetchRequest = useCallback(() => {

//         console.log("TITLE : " , title , " Content: " , content);
//         // const blog = {
//         //     title: title,
//         //     content: content,
//         //     image:image,
//         //     authorName: props.UserStore.user.username,
//         //     authorID: props.UserStore.user._id,
//         // } 
//         // // Api request here
//         // setIsPending(true);
//         // console.log("Blog : " , blog)
//         //  BlogService.addBlog(blog).then((res) => {
//         //         {
//         //             if (res) {
//         //                 // var blogRes = JSON.parse(res);
//         //                 console.log("RESPONSE : " , res);
//         //             }
//         //             else{
//         //                 alert("Blog yüklenirken bir hata oluştu")
//         //             }
//         //             setIsPending(false);
//         //         }
//         //     }
//         //     )
//     }, []);

// return (
//     <div className="create">
//         <h2>Yeni Blog Ekle</h2>
//         <h2>{props.UserStore.user.name}</h2>
//         {/* <div className='add-blog-image-container' onClick={() => {

//         }}>
//             <AddCircleOutline className={'add-blog-image-icon'} />
//         </div> */}
//         <form onSubmit={(e) => {
//             e.preventDefault();
//             console.log("title : ", title);

//              fetchRequest()}}>
//             <label>Blog Başlığı:</label>
//             <input
//                 type="text"
//                 required
//                 minLength={3}
//                 maxLength={40}
//                 value={title}
//                 onChange={(e) => {setTitle(e.target.value)}}
//             />
//             <label>Blog Fotoğrafı:</label>
//             <input
//                 type="text"
//                 required
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//             />
//             <label>Blog İçeriği:</label>
//             <textarea
//                 required
//                 minLength={40}
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//             ></textarea>
//             {/* <label>Blog author:</label> */}
//             {/* <select
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//             >
//                 <option value="mario">mario</option>
//                 <option value="yoshi">yoshi</option>
//             </select> */}
//             {!isPending && <button>Add Blog</button>}
//             {isPending && <button>Adding blog..</button>}

//         </form>
//     </div>
// );
// }));

// export default AddBlog;