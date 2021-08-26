import ServiceConstants from '../core/constants/service/ServiceConstants'


class CommentService {
    sendComment(blogID, comment) {
        return fetch(ServiceConstants.BASEURL + ServiceConstants.BLOG + `/${blogID}` + ServiceConstants.COMMENT, {
            method: ServiceConstants.POST,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }).then(res => {
            if (res.status == '200') {
                console.log("Başarıyla eklendi")
                return true;
            }
            else {
                console.log("BAŞARISIZ...")
                return false;
            }
        });
    }
    // getBlog(id) {
    //     return fetch(ServiceConstants.BASEURL + ServiceConstants.BLOG + `/${id}`, {
    //         method: ServiceConstants.GET,
    //     }).then((res) => {
    //         console.log("STATUSCODE", res.status)
    //         if (res.status == '200') {
    //             return res.text();
    //         }
    //         else {
    //             return null;
    //         }
    //     }).catch(err => {
    //         console.log("LOGIN CATCH BLOGSERVICE GETBLOG", err)
    //         return null
    //     });
    // }

}
export default new CommentService();