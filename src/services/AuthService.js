import ServiceConstants from '../core/constants/service/ServiceConstants'
//authservice veya genel service düşünelim bunu bi ara
class AuthService{

    callAPI() {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.HOMEPAGE).then(res => res.text())
            .catch(err => err);
    }
    signUp(body){
        console.log(ServiceConstants.BASEURL + ServiceConstants.SIGNUP);
       return fetch(ServiceConstants.BASEURL + ServiceConstants.SIGNUP, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body:JSON.stringify(body),
          }).then((res)=>{
              console.log(res)
              return res.text();
          }).catch(err => err);
    }

}
export default new AuthService();