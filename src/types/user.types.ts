import { IMistake } from "./ayat.types";
export type IPageMistakeMap = Map<string, IMistakeMap>;
export type IMistakeMap = Map<string, IMistake>;
export interface IUser {
  allMistakes: IPageMistakeMap;
  pageData: IPageData[];
}

export interface IPageData {
  pageNumber: number;
  score: number;
  totalRevisions: number;
  mistakes: number;
  streak: number;
  lastRevised: string;
}
