import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import AuthService from '../../services/AuthService';


const Navbar = inject("UserStore")(observer((props) => {
    function logOut() {
        AuthService.logOut();
        props.UserStore.setUser(undefined);
     
    };

    return (
        <nav className="navbar">
            <h1>BLOG Website</h1>
            <div className="links">
                <Link to="/">Ana Sayfa</Link>
                {!props.UserStore.user && <Link to="/login">{`Giriş Yap`}</Link>}
                {!props.UserStore.user && <Link to="/signup">Kaydol</Link>}
                {props.UserStore.user && <div onClick={() => {
                    logOut();
                }}>Çıkış Yap</div>}
            </div>

        </nav>
    );
}));

export default Navbar;