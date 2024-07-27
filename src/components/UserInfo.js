export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this.nameSelector = nameSelector;
        this.jobSelector = jobSelector;
    }

    getUserInfo() {
        return {
          name: document.querySelector(this.nameSelector).textContent,
          job: document.querySelector(this.jobSelector).textContent
        }
    }

    setUserInfo({name, job}) {
        this._name = name;
        document.querySelector(this.nameSelector).textContent = this._name;
        this._job = job;
        document.querySelector(this.jobSelector).textContent = this._job;
    }
}