import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import AuthService from "../services/AuthService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";


//Bu kişinin parolası gelmemesi gerekiyor kullanıcı detayları için başka bir sorgu yapabiliriz
const UserDetails = inject("UserStore")(observer((props) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        AuthService.getUser(id).then((res) => {
            {
                if (res) {
                    var userRes = JSON.parse(res);
                    setUser(userRes);
                    setIsPending(false);
                }
            }
        }
        )
    }, []);
    // const history = useHistory();


    return (

        <div>
            {isPending && <div>Loading...</div>}
            {user && <div>{JSON.stringify(user)}</div>}
        </div>

    );
}));

export default UserDetails;