export default class UserInfo {
    constructor({name, job}) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        return {name:this._name, job:this._job};
    }

    setUserInfo({name, job}) {
        this._name = name;
        document.querySelector("#profile__title").textContent = this._name;
        this._job = job;
        document.querySelector("#profile__description").textContent = this._job;
    }
}