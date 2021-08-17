import { makeAutoObservable, observable, computed, action } from "mobx"

export class UserStore {
    user = undefined
    constructor(value) {
        makeAutoObservable(this)
    }

    setUser(value) {
        this.user = value;
    }
    setUsername(value) {
        this.user.username = value;
    }
}
export default new UserStore()