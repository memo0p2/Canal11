import {Direccion} from './Direccion'
import {Compania} from './Compania'
export interface Usuario {
    
    id:       number;
    name:     string;
    username: string;
    email:    string;
    address:  Direccion;
    phone:    string;
    website:  string;
    company:  Compania;
}