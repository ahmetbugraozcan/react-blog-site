import { useLocation } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button } from "@material-ui/core";
import BlogService from "../services/BlogService";


const HomePage = inject("UserStore")(observer((props) => {
    // const location = useLocation();
    // ${location.state?.user}
    return ( 
    <div>
        <div>{`HomePage ${props.UserStore.user?.name}` }</div>
        <Button onClick={()=>{BlogService.addBlog({title : "title", content: "ASDŞKLAJFNKLAS JSAKLDJAS KLŞÇD JSALŞKÖÇDH ASJKLÖDH NASKLDNASLKD NASKLJ DNASKLDH ASKLD JAKSL", image:'https://blog.holosophic.org/countries/countries-page-image-placeholder-800x500/'})}}>Add Blog</Button>
    </div>

    );
}));
 
export default HomePage;