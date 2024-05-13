"use client";
import { IMistake } from "@/components/AddMistakesPerAya";
import { db } from "@/lib/firestore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { createContext } from "react";

type IPageMistakeMap = Map<string, IMistakeMap>;
export type IMistakeMap = Map<string, IMistake>;

interface IUser {
  id: string;
  allMistakes: IPageMistakeMap;
}

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
    return { id: userId, allMistakes: new Map() };
  const mappedData = objectToMap(req.data().allMistakes);
  const userData = {
    id: req.data().id,
    allMistakes: mappedData,
  };
  return userData as unknown as IUser;
}

export async function addMistake(
  userId: string,
  pageNumber: string,
  mistakeId: string,
  mistake: IMistake,
) {
  const user = doc(db, "user", userId);
  // TODO: everytime we add a mistake, we need to call the backend and do all the conversion. Maybe save it locally and only push it to the backend when the user is done?
  const userData = await getUser(userId);
  const userMap = userData.allMistakes as IPageMistakeMap;

  if (!userMap.size) {
    const pageMap = new Map();
    const mistakeMap = new Map();
    mistakeMap.set(mistakeId, mistake);
    pageMap.set(pageNumber, Object.fromEntries(mistakeMap));
    const mistakeMapObject = Object.fromEntries(pageMap);
    setDoc(user, { allMistakes: mistakeMapObject });
    return;
  }

  if (userMap.has(pageNumber)) {
    const mistakeMap = userMap.get(pageNumber);
    if (!mistakeMap) return;
    mistakeMap.set(mistakeId, mistake);
    userMap.delete(pageNumber);
    userMap.set(pageNumber, mistakeMap);
  } else {
    const newMistakeMap = new Map();
    newMistakeMap.set(mistakeId, mistake);
    userMap.set(pageNumber, newMistakeMap);
  }
  await updateDoc(user, {
    allMistakes: mapToObject(userMap),
  });
}

// TODO: fix and use this code in the addmistake component
// export async function deleteMistake(mistake: IMistakeMap, userId: string) {
//   const user = doc(db, "user", userId);
//   const oldMistakes = await getUser(userId);
//   const filteredArray = oldMistakes.pageMistakes.map((suraMistake) => {
//     return {
//       ...suraMistake,
//       mistakes: suraMistake.mistakes.filter(
//         (m) => m.index !== mistake.index && m.note !== mistake.note,
//       ),
//     };
//   });
//   await updateDoc(user, {
//     suraMistakes: filteredArray,
//   });
// }

// TODO: add and fix this code to the add mistake component
// export async function changeMistake(newMistake: IMistakeMap, userId: string) {
//   const user = doc(db, "user", userId);
//   const oldMistakes = await getUser(userId);
//   const changedArray = oldMistakes.pageMistakes.map((suraMistake) => {
//     return {
//       ...suraMistake,
//       mistakes: suraMistake.mistakes.map((m) => {
//         if (m.index === newMistake.index) {
//           return newMistake;
//         }
//         return m;
//       }),
//     };
//   });
//   await updateDoc(user, {
//     suraMistakes: changedArray,
//   });
// }
