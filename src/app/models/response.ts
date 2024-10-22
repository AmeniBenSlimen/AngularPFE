import { Variable } from "./variable";

export class Response {
  id?: number;
  variableId?: number;
  response?: string;
  variable?: Variable | null;
  constructor(variableId?: number, response?: string, id?: number) {
      this.variableId = variableId;
      this.response = response;
      this.id = id;
  }
}
