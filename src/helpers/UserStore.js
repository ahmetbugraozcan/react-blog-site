import { makeAutoObservable, observable, computed, action } from "mobx"

export class UserStore {
    user = undefined
    constructor(value) {
        makeAutoObservable(this)
    }

    setUser(value) {
        this.user = value;
    }
    setUserName(value) {
        this.user.userName = value;
    }
}
export default new UserStore()