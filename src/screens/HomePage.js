import { useLocation } from "react-router-dom";
import { inject, observer } from "mobx-react";

const HomePage = inject("UserStore")(observer((props) => {
    // const location = useLocation();
    // ${location.state?.user}
    console.log(props) 
    //fake prop ama deneyelim
    return ( 
    <div>{`HomePage ${props.UserStore.user?.name}` }</div>
    );
}));
 
export default HomePage;