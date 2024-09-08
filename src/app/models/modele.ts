import { Variable } from "./variable";

export class Modele {
id?: number;
name?:string;
description?:string; 
dateCreation?:Date;
dateUpdate?:Date;
used?:boolean;
updatebale?:boolean;
nextUpdateDate?:Date;
lastUsedDate?:Date;
disabled?:boolean;
annee?:number;
variables: Variable[] = [];
}
