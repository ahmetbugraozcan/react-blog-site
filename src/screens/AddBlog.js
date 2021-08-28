
import React from "react";
import BlogService from "../services/BlogService";
import { inject, observer } from "mobx-react";
import { EditorState } from 'draft-js';
import { convertFromRaw, convertToRaw} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// // the raw state, stringified
// const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
// // convert the raw state back to a useable ContentState object
// const contentState = convertFromRaw( JSON.parse( rawDraftContentState) );
@inject("UserStore")
@observer
class AddBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            image: 'https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg',
            isPending: false,
            editorState: EditorState.createEmpty(),
        }

        //-----------------------------------------------------------------

    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };


    addBlog() {
        var contentRaw = convertToRaw(this.state.editorState.getCurrentContent());
        // localStorage.setItem('draftRaw', JSON.stringify(contentRaw));
        console.log(contentRaw.entityMap)
        const blog = {
            previewSubtitle: this.state.previewSubtitle,
            title: this.state.title,
            previewSubtitle: this.state.previewSubtitle,
            content: contentRaw,
            image: this.state.image,
            author: this.props.UserStore.user
        }
        // Api request here
        // setIsPending(true);
        this.setState({ isPending: true })
        // console.log("Blog : ", blog)
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
            <div className="add-blog-body">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.addBlog();
                }}>
                    <div className="create">
                        <h2>Yeni Blog Ekle</h2>
                        <h2>{this.props.UserStore.user.name}</h2>
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
                         <label>Blog Altyazısı:</label>
                        <input
                            type="text"
                            required
                            minLength={20}
                            maxLength={150}
                            value={this.state.previewSubtitle}
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({ previewSubtitle: e.target.value })
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
                        <div className='editor-container'></div>
                    </div>

                    <div className="editor-container">
                        <Editor
                        // customStyleMap={}
                            editorState={this.state.editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                    <div style={{marginTop: '50px'}}>
                        {!this.state.isPending && <button>Add Blog</button>}
                        {this.state.isPending && <button>Adding blog..</button>}
                    </div>

                </form>
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