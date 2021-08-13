import ServiceConstants from '../core/constants/service/ServiceConstants'
//authservice veya genel service düşünelim bunu bi ara
class AuthService {

    callAPI() {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.HOMEPAGE).then(res => res.text())
            .catch(err => err);
    }

    signUp(body) {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.SIGNUP, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((res) => {
            console.log("STATUSCODE", res.status)
            if (res.status == '200') {
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
        return fetch(ServiceConstants.BASEURL + ServiceConstants.LOGIN, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.status == '200') {
                return res.text();
            }
            else {
                return null;
            }
        }).catch(err => {
            console.log("LOGIN CATCH AUTHSERVICE ", err)
            return null;
        });
    }

}
export default new AuthService();