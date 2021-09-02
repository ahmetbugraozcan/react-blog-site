import ServiceConstants from '../core/constants/service/ServiceConstants'


class UserService {
    followUser(username, follower) {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${username}` + ServiceConstants.FOLLOW, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                follower: follower,
                followedUserName: username,
            }),
        }).then((res) => {
            console.log("STATUSCODE", res.status)
            if (res.status == '200') {
                console.log("TAKİP ETTİN")
                return res.status;
            } else if (res.status == '202') {
                console.log("TAKİP ETTİKLERİNDEN ÇIKARDIN")
                return res.status;
            }
            else {
                return null;
            }
        }).catch(err => {
            console.log("LİKE CATCH ", err)
            return false;
        });
     }

     getFollowedUsers(username) {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${username}` + ServiceConstants.FOLLOWEDUSERS, {
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
            console.log("getFollowedUsers ERROR ", err)
            return null
        });
     }

     getFollowingUsers(username) {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${username}` + ServiceConstants.FOLLOWERS, {
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
            console.log("getFollowedUsers ERROR ", err)
            return null
        });
     }

 
}
export default new UserService();

