export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;

        this._nameElement = document.querySelector(this._nameSelector);
        this._jobElement = document.querySelector(this._jobSelector);
    }

    getUserInfo() {
        return {
          name: this._nameElement.textContent,
          job: this._jobElement.textContent
        }
    }

    setUserInfo({name, job}) {
        this._name = name;
        this._nameElement.textContent = this._name;
        this._job = job;
        this._jobElement.textContent = this._job;
    }
}