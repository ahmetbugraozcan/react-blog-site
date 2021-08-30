import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../helpers/useFetch';
import AuthService from "../services/AuthService";
import { inject, observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";


//Bu kişinin parolası gelmemesi gerekiyor kullanıcı detayları için başka bir sorgu yapabiliriz
const UserDetails = inject("UserStore")(observer((props) => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log("buraya girdik")
        AuthService.getUser(username).then((res) => {
            {
                setIsPending(true)
                if (res) {
                    var userRes = JSON.parse(res);
                    setUser(userRes);
                    console.log("user : ", user)
                    if (userRes._id == props.UserStore.user._id) {
                        console.log("BENİM PROFİLİM")
                    }
                    else {
                        console.log("BAŞKASININ PROFİLİ")
                    }
                    setIsPending(false);
                }
            }
        }
        )
    }, [username]);
    // const history = useHistory();


    return (
        <div className='user-details-page-background'>
            <div className='user-details-page-content-wrapper'>
                <div className='user-detail-content-container'>
                    <div className='user-detail-content-wrapper'>
                        <img className='user-detail-profile-photo' src={props.UserStore.user.profilePhotoUrl}/>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     {isPending && <div>Loading...</div>}
        //     {user && <div>{JSON.stringify(user)}</div>}
        // </div>

    );
}));

export default UserDetails;