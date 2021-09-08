import ServiceConstants from '../core/constants/service/ServiceConstants'


class UserService {
    followUser(username, follower) {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${username}` + ServiceConstants.FOLLOW, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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

    updateProfilePhoto(image, id) {
        // var photoBody = { photo: image };
        return fetch(ServiceConstants.BASEURL + ServiceConstants.UPLOADS + `/${id}`, {
            method: ServiceConstants.POST,
            body: image
        }).then(res => {
            if (res.ok) {
                console.log("UPLOAD BAŞARILI");
                return res.text();
            }
            else {
                console.log("Upload sırasında hata oluştu.")
                return false;
            }
        })
    }

    updateUserName(username, id) {
        // var photoBody = { photo: image };
        var usernameBody = { username: username };
        console.log(usernameBody)
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${id}` + ServiceConstants.UPDATE + ServiceConstants.USERNAME, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    username: username
                }
            )
        }).then(res => {
            if (res.ok) {
                console.log("USERNAME UPDATE BAŞARILI");
                return username;
            }
            else {
                console.log("USERNAME UPDATE SIRASINDA HATA.")
                return false;
            }
        })
    }

    updateName(name, id) {
        // var photoBody = { photo: image };
        var usernameBody = { name: name };
        console.log(usernameBody)
        return fetch(ServiceConstants.BASEURL + ServiceConstants.USER + `/${id}` + ServiceConstants.UPDATE + ServiceConstants.NAME, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name: name
                }
            )
        }).then(res => {
            if (res.ok) {
                console.log("USERNAME UPDATE BAŞARILI");
                //responsedan gelse daha iyi
                return name;
            }
            else {
                console.log("USERNAME UPDATE SIRASINDA HATA.")
                return false;
            }
        })
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

