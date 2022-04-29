import {Geo} from './Geo'

export interface Direccion {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}