import { makeAutoObservable, observable, computed, action } from "mobx"

export class LanguageStore {
    language =  localStorage.getItem('language') || 'tr-TR'
    constructor(value) {
        makeAutoObservable(this)
    }

    setLanguage(value) {
        // console.log("VALUE : " , value);
        this.language = value;
        localStorage.setItem("language", JSON.stringify(value));
    }
}
export default new LanguageStore()