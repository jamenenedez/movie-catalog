export class Actor {

    constructor(_id = "", fullname = "") {
        this._id = _id;
        this.fullname = fullname;
    }

    _id: String;
    fullname: String;
}
