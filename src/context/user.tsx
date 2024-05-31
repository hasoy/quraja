"use client";
import { toast } from "sonner";
import { calculateMistakeScore, calculateScore } from "@/helpers/score";
import { db } from "@/lib/firestore";
import { doc, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { IMistakeMap, IPageData, IUser } from "@/types/user.types";

// Convert Map to Object
function mapToObject(map: Map<any, any>): any {
  const obj: any = {};
  // FIX: this ts error
  // @ts-ignore
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

export function subscribeToUser(
  userId: string,
  callback: (user: IUser) => void,
) {
  const user = doc(db, "user", userId);

  const unsubscribe = onSnapshot(user, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      if (data) {
        const userData = {
          ...data,
          allMistakes: objectToMap(data.allMistakes),
        };
        callback(userData as unknown as IUser);
      }
    } else {
      setDoc(user, { allMistakes: [], pageData: [] });
      callback({ allMistakes: new Map(), pageData: [] });
    }
  });

  return unsubscribe;
}

// Function to create a new page
function createNewPage(pageNumber: number, mistakeCount: number): IPageData {
  const dateNow = new Date().toString();
  return {
    pageNumber: pageNumber,
    lastRevised: dateNow,
    mistakes: mistakeCount,
    streak: 1,
    totalRevisions: 1,
    score: 4 + calculateMistakeScore(mistakeCount),
  };
}

// Function to update an existing page
function updateExistingPage(
  page: IPageData,
  newPage: IPageData,
  mistakeCount: number,
): IPageData {
  return {
    ...newPage,
    streak: mistakeCount > 0 ? 1 : page.streak + 1,
    totalRevisions: page.totalRevisions + 1,
    score: calculateScore(
      page.totalRevisions + 1,
      mistakeCount,
      newPage.lastRevised,
    ),
  };
}

export async function updatePageData(
  userData: IUser,
  pageNumber: number,
  userId: string,
  mistakeCount: number,
) {
  const user = doc(db, "user", userId);
  let newPage = createNewPage(pageNumber, mistakeCount);
  let newPageArray: IPageData[] = userData?.pageData || [];
  const hasPageNumberAlready = newPageArray.some(
    (page) => page.pageNumber == pageNumber,
  );

  if (hasPageNumberAlready) {
    newPageArray = newPageArray.map((page: IPageData) =>
      page.pageNumber == pageNumber
        ? updateExistingPage(page, newPage, mistakeCount)
        : page,
    );
  } else {
    newPageArray = [...newPageArray, newPage];
  }
  try {
    await updateDoc(user, { pageData: newPageArray });
  } catch (error) {
    console.log(error);
    toast(`Error saving new revision`);
  } finally {
    toast(`New revision saved`);
  }
}

export async function saveNewPageMistakes(
  userId: string,
  newPageMistakes: IMistakeMap,
  pageNumber: string,
  userData: IUser,
) {
  const user = doc(db, "user", userId);
  const dbMap = userData.allMistakes;
  dbMap.delete(pageNumber);
  dbMap.set(pageNumber, newPageMistakes);
  await updateDoc(user, {
    allMistakes: mapToObject(dbMap),
  });
}
