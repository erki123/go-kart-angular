import { Member } from "./member";
import { Race } from "./race";

export interface Registration {
  id: number;
  member: Member;
  race: Race;
  }