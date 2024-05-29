"use client";
import React, { useContext, useState } from "react";
import AddMistakesPerAya from "./AddMistakesPerAya";
import { Button } from "./ui/button";
import { saveNewPageMistakes, updatePageData } from "@/context/user";
import { AuthContext } from "@/context/AuthProvider";
import { UserContext } from "@/context/UserProvider";
import { IMistakeMap } from "@/types/ayat.types";
interface QuranPageProps {
  ayaat: string[];
  pageNumber: number;
  suraNumber: number;
  juzNumber: number;
  allMistakes: IMistakeMap;
}

export default function QuranPage(props: QuranPageProps) {
  const authData = useContext(AuthContext);
  const userData = useContext(UserContext);
  function addRevision(): void {
    updatePageData(
      userData,
      props.pageNumber,
      authData.uid,
      localMistakes.size,
    );
    saveNewPageMistakes(
      authData.uid,
      localMistakes,
      props.pageNumber.toString(),
      userData,
    );
  }
  // FIX: if all mistakes is empty, test if the ternary works
  const [localMistakes, setLocalMistakes] = useState(
    props.allMistakes ?? new Map(),
  );

  return (
    <div className="mx-auto flex h-screen flex-col gap-4 p-4 text-3xl md:w-1/2 lg:w-1/3">
      <Button className="w-min self-end" onClick={addRevision}>
        Save revision +1
      </Button>
      <ul className="my-10 list-none ">
        {props.ayaat.map((aya, index) => (
          <AddMistakesPerAya
            key={index}
            text={aya}
            ayaNumber={index}
            pageNumber={props.pageNumber}
            allMistakes={localMistakes}
            setAllMistakes={setLocalMistakes}
          ></AddMistakesPerAya>
        ))}

        {/* TODO: make a cleaner UI for this */}
        <p className="text-md text-center font-bold text-slate-600 underline">
          Page {props.pageNumber}
        </p>
      </ul>
    </div>
  );
}
