import { Category } from "./category";
import { Gender } from "./gender";
import { Country } from "./country";
import { User } from "./user";
import { Director } from "./director";
import { Actor } from "./actor";

export class Movie {

    constructor(_id = "", title = "", category = { _id: "", name: "" },
        genders = [], country = { _id: "", name: "" }, duration = 0, year = "",
        calification = 0, director = {
            _id: "", fullname: "",
            nationality: { _id: "", name: "" }
        }, actors = []) {
        this._id = _id;
        this.title = title;
        this.category = category;
        this.genders = genders;
        this.year = year;
        this.country = country;
        this.duration = duration;
        this.calification = calification;
        this.director = director;
        this.actors = actors;
    }

    _id: string;
    title: string;
    category: Category;
    genders: Gender[];
    year: string;
    country: Country;
    duration: number;
    calification: number;
    /* scores: User[{ user: { type: Schema.Types.ObjectId; ref: 'User' }; score: { type: Number } }]; //User average qualifications   */
    director: Director;
    actors: Actor[];
}
