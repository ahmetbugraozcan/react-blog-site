import ServiceConstants from '../core/constants/service/ServiceConstants'
//authservice veya genel service düşünelim bunu bi ara
class AuthService{

    callAPI() {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.HOMEPAGE).then(res => res.text())
            .catch(err => err);
    }

}
export default new AuthService();