export type IMistake = {
  marked: string;
  note?: string;
};

export type IAllMistakeMap = Map<string, IMistake>;
export interface IUser {
  allMistakes: IAllMistakeMap;
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
