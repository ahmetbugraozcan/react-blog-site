import ServiceConstants from '../core/constants/service/ServiceConstants'

import { inject, observer } from "mobx-react";

class AuthService {

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


    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };

}
export default new AuthService();