"use client";
import { toast } from "sonner";
import { IPageData } from "@/components/PagesTable";
import { calculateMistakeScore, calculateScore } from "@/helpers/score";
import { db } from "@/lib/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { createContext } from "react";
import { IMistake } from "@/types/ayat.types";

type IPageMistakeMap = Map<string, IMistakeMap>;
export type IMistakeMap = Map<string, IMistake>;

interface IUser {
  id: string;
  allMistakes: IPageMistakeMap;
  pageData: IPageData[];
}

// TODO: add context and make it available to all functions/pages
// also fill it with data from the backend on load
const UserContext = createContext({} as IUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={{} as IUser}>{children}</UserContext.Provider>
  );
}

// Convert Map to Object
function mapToObject(map: Map<any, any>): any {
  const obj: any = {};
  for (let [key, value] of map) {
    if (value instanceof Map) {
      obj[key] = mapToObject(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// Convert Object to Map
function objectToMap(obj: any): Map<any, any> {
  const map = new Map();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        map.set(key, objectToMap(obj[key]));
      } else {
        map.set(key, obj[key]);
      }
    }
  }
  return map;
}

export async function getUser(userId: string) {
  const user = doc(db, "user", userId);
  const req = await getDoc(user);
  if (Object.keys(req.data()).length === 0)
    return { id: userId, allMistakes: new Map(), pageData: [] };
  const mappedData = objectToMap(req.data()?.allMistakes);
  const userData = {
    ...req.data(),
    allMistakes: mappedData,
  };
  return userData as unknown as IUser;
}

export async function updateUserMistakes(
  userId: string,
  newMistakes: IUser["allMistakes"],
) {
  const user = doc(db, "user", userId);
  await updateDoc(user, { allMistakes: newMistakes });
}

export async function updatePageData(userId: string, pageNumber: number) {
  // TODO: add a loading and disable button to prevent multiple requests being sent
  const user = doc(db, "user", userId);
  const userData = await getUser(userId);
  const mistakeCount = userData.allMistakes.size;
  const dateNow = new Date().toString();
  let newPage: IPageData = {
    pageNumber: pageNumber,
    lastRevised: dateNow,
    mistakes: mistakeCount,
    streak: 1,
    totalRevisions: 1,
    score: 4 + calculateMistakeScore(mistakeCount),
  };
  const hasPageNumberAlready = userData.pageData.some(
    (page) => page.pageNumber == pageNumber,
  );
  let newPageArray: IPageData[];
  if (hasPageNumberAlready) {
    newPageArray = userData.pageData.map((page: IPageData) => {
      if (page.pageNumber == pageNumber) {
        const newData = {
          ...newPage,
          streak: mistakeCount > 0 ? 1 : page.streak + 1,
          totalRevisions: page.totalRevisions + 1,
          score: calculateScore(page.totalRevisions + 1, mistakeCount, dateNow),
        };
        return newData;
      }
      return page;
    });
  } else {
    newPageArray = [...userData.pageData, newPage];
  }
  try {
    await updateDoc(user, { pageData: newPageArray });
  } catch (error) {
    console.log(error);
  } finally {
    toast(`New revision saved`);
  }
}

export async function saveNewPageMistakes(
  userId: string,
  newPageMistakes: IMistakeMap,
  pageNumber: string,
) {
  const user = doc(db, "user", userId);
  const userData = await getUser(userId);
  const dbMap = userData.allMistakes;
  dbMap.delete(pageNumber);
  dbMap.set(pageNumber, newPageMistakes);
  await updateDoc(user, {
    allMistakes: mapToObject(dbMap),
  });
}
