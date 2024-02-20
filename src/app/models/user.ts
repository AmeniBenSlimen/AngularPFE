import {Roles} from "./roles";
export class User {
    id?:number;
    email?:string;
    fullname?:string;
    username?:string;
    password?:string;
    phone?:string;
    status?:boolean;
    roles: Roles;
    constructor(id: number,email:string,fullname:string, username: string, password: string,phone:string,status:boolean, roles: Roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
      }
    
    }    