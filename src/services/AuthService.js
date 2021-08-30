import ServiceConstants from '../core/constants/service/ServiceConstants'

import { inject, observer } from "mobx-react";

class AuthService {

    getUser(username){
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${username}`, {
            method: ServiceConstants.GET,
        }).then((res) => {
            console.log("STATUSCODE", res.status)
            if (res.status == '200') {
                return res.text();
            }
            else {
                return null;
            }
        }).catch(err => {
            console.log("LOGIN CATCH USERSERVİCE GETUSER", err)
            return null
        });
    }

    signUp(body) {
      // Object olduğu için dönüştürmeye gerek yok, logine bakılmadı
        return fetch(ServiceConstants.BASEURL + ServiceConstants.SIGNUP, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((res) => {
            console.log("STATUSCODE", res.status)
            if (res.status == '200') {
                console.log("TRUE DÖNDÜ")
                return true;
            }
            else {
                return false;
            }
        }).catch(err => {
            console.log("LOGIN CATCH AUTHSERVICE ", err)
            return false;
        });

    }

    login(body) {
        // var token = this.getToken();
        return fetch(ServiceConstants.BASEURL + ServiceConstants.LOGIN, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(response => {
            if (response.status == '200'){
                return response.text();
            }else{
                throw `${response.status} ERROR`
            }
        }
        ).then(response => {
                console.log("AUTHSERVICE LOGIN RES DATA : ", response)
                localStorage.setItem("user", response);
                return response;
        });
    };

    logOut() {
        localStorage.removeItem("user");
    };

    //düzeltilecek... Localstoragedeki idye göre user vs getirilebilir...
    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };

    // getCurrentUser ()  {
    //     console.log(JSON.parse(localStorage.getItem("user"))._id)
    //     return this.getUser(JSON.parse(localStorage.getItem("user"))._id).then(res => {
    //         if (res) {
    //             // console.log(typeof JSON.parse(res))
    //             return JSON.parse(res);
    //         }
    //         else {
    //             return null;
    //         }
    //     })
    //     // return JSON.parse(localStorage.getItem("user"));
    // };
}
export default new AuthService();