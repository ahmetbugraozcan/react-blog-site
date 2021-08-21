import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import AuthService from '../../services/AuthService';
import { useHistory } from 'react-router-dom';

const Navbar = inject("UserStore")(observer((props) => {
    const history = useHistory();
    const LogOut =(e) =>  {
        e.preventDefault();
        AuthService.logOut();
        props.UserStore.setUser(undefined);
        history.push("/login")


    };

    return (
        <nav className="navbar">
            <h1>BLOG Website</h1>
            <div className="links">
                <Link to="/">Ana Sayfa</Link>
                <Link to="/add-blog">Blog Ekle</Link>
                {!props.UserStore.user && <Link to="/login">{`Giriş Yap`}</Link>}
                {!props.UserStore.user && <Link to="/signup">Kaydol</Link>}
                {props.UserStore.user && <a onClick={(e) => {
                    LogOut(e);
                }}>Çıkış Yap</a>}
            </div>

        </nav>
    );
}));

export default Navbar;