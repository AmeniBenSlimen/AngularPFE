import { Notation } from "./notation";

export class Client {
    
id?:number;
codeRelation?:number;
idNat?:String;
codeRelationFlexcube?:String;
identifiantProspect?:String;
nom?:String;
profession?:String;
adresse?:String;
agence?:String;
ville?:String;
region?:String;
dateNaissance?:Date; 
dateDebutRelation?:Date;
autre?:String; 
dateCreate?:Date;
dateUpdate?:Date; 
isfull?:boolean;
nationalite?:String;
situationFamiliale?:String; 
salaireDomicile?:number;
dateEmbauche?:Date;
newProfessionCode?:number; 
newModelUBCI?:String;
  //notations: boolean;
  notations?: Notation[];
}
