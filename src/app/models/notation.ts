/*import { Variable } from "./variable";
import { Response } from './response';

export class Notation {
  id: number;
  clientId: number;
  variables: Variable[]; // Liste des variables (questions)
  scores: { [variableId: number]: number }; // Scores associés aux variables
  status: 'en cours' | 'finalisé';
  responses?: Response[];
  note?:number;
   constructor(id: number,clientId: number,note:number,responses: Response[], variables: Variable[], scores: { [variableId: number]: number }, status: 'en cours' | 'finalisé') {
    this.id = id;
    this.clientId = clientId;
    this.variables = variables;
    this.scores = scores;
    this.status = status;
    this.responses = responses;
    this.note=note;
  }
}*/
import { Variable } from "./variable";
import { Response } from "./response";

export class Notation {
    id: number;
    clientId: number;
    variables: Variable[];
    scores: { [variableId: number]: number };
    status: 'en cours' | 'finalisé' | 'IN_PROGRESS'; // Inclure toutes les valeurs possibles
    note?: number; // Assure-toi que cette propriété est définie
    responses?: Response[];

    constructor(
        id: number,
        clientId: number,
        variables: Variable[],
        scores: { [variableId: number]: number },
        status: 'en cours' | 'finalisé' | 'IN_PROGRESS',
        responses?: Response[],
        note?: number
    ) {
        this.id = id;
        this.clientId = clientId;
        this.variables = variables;
        this.scores = scores;
        this.status = status;
        this.responses = responses;
        this.note = note;
    }
}
