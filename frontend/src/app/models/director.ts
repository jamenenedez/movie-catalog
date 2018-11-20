import { Nationality } from "./nationality";

export class Director {

    constructor(_id = "", fullname = "", nationality = {_id:"", name:""}) {
        this._id = _id;
        this.fullname = fullname;
        this.nationality = nationality;
    }

    _id: String;
    fullname: String;
    nationality: Nationality;
}
