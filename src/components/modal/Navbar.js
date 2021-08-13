import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

const Navbar = inject("UserStore")(observer((props) => {
    return (
        <nav className="navbar">
            <h1>BLOG Website</h1>
            <div className="links">
                <Link to="/">Ana Sayfa</Link>
                { !props.UserStore.user &&  <Link to="/login">{`Giriş Yap`}</Link>}
                { !props.UserStore.user && <Link to="/signup">Kaydol</Link>}
            </div>

        </nav>
    );
  }));

export default Navbar;