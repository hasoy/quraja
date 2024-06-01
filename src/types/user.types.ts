export type IMistake = {
  word: string;
  note?: string;
};
//                               pageNumber
export type IAllMistakeMap = Map<string, IPageMistakeMap>;
//                                mistakeId
export type IPageMistakeMap = Map<string, IMistake>;
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
