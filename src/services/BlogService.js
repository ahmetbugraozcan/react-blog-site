import ServiceConstants from '../core/constants/service/ServiceConstants'

import { inject, observer } from "mobx-react";

class BlogService {
    getBlog(id){
        return fetch(ServiceConstants.BASEURL + ServiceConstants.BLOG + `/${id}`, {
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
            console.log("LOGIN CATCH BLOGSERVICE GETBLOG", err)
            return null
        });
    }

    getBlogs(){
        return fetch(ServiceConstants.BASEURL + ServiceConstants.BLOG, {
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
            console.log("LOGIN CATCH BLOGSERVICE ADD ", err)
            return null
        });
    }

    addBlog(body) {
      // Object olduğu için dönüştürmeye gerek yok, logine bakılmadı
        return fetch(ServiceConstants.BASEURL + ServiceConstants.BLOG, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((res) => {
            console.log("STATUSCODE", res.status)
            if (res.status == '200' ||res.status == '202') {
                console.log("TRUE DÖNDÜ")
                return true;
            }
            else {
                return false;
            }
        }).catch(err => {
            console.log("LOGIN CATCH BLOGSERVICE ADD ", err)
            return false;
        });

    }




    // getCurrentUser = () => {
    //     return JSON.parse(localStorage.getItem("user"));
    // };

}
export default new BlogService();