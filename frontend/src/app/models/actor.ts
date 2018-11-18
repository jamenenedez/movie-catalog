export class Actor {

    constructor(_id = "", fullname = "", nationality = []) {
        this._id = _id;
        this.fullname = fullname;
        this.nationality = nationality;
    }

    _id: String;
    fullname: String;
    nationality: Array<String>;
}
