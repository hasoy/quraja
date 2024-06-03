"use client";
import React, { useContext, useState } from "react";
import AddMistakesPerAya from "./AddMistakesPerAya";
import { Button } from "./ui/button";
import { saveNewPageMistakes, updatePageData } from "@/context/user";
import { AuthContext } from "@/context/AuthProvider";
import { UserContext } from "@/context/UserProvider";
import { IPageMistakeMap } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { PageInput } from "./PageInput";
interface QuranPageProps {
  ayaat: string[];
  pageNumber: number;
  suraNumber: number;
  juzNumber: number;
  pageMistakes: IPageMistakeMap;
}

export default function QuranPage(props: QuranPageProps) {
  const authData = useContext(AuthContext);
  const userData = useContext(UserContext);
  const router = useRouter();
  function addRevision(): void {
    updatePageData(
      userData,
      props.pageNumber,
      authData.uid,
      localPageMistakes.size,
    );
    saveNewPageMistakes(
      authData.uid,
      localPageMistakes,
      props.pageNumber.toString(),
      userData,
    );
    setFormDirty(false);
  }
  const [localPageMistakes, setPageLocalMistakes] = useState(
    props.pageMistakes ?? new Map(),
  );
  const [formDirty, setFormDirty] = useState(false);

  function goToPage(page: number) {
    router.push(`/pages/${page}`);
  }

  return (
    <div className="mx-auto flex h-screen flex-col gap-4 p-4  md:w-1/2 lg:w-1/3">
      <div className="flex justify-between">
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">How to mark mistakes:</h3>
          <ol className="list-decimal space-y-1 pl-4 text-sm text-gray-500 dark:text-gray-400">
            <li>click on a letter to mark</li>
            <li>ctrl + click on a word to mark</li>
            <li>click on an aya to mark</li>
          </ol>
        </div>
        <div>
          <PageInput />
          <Button className="mt-4 w-min self-end" onClick={addRevision}>
            Save revision +1
          </Button>
        </div>
      </div>
      <ul className="my-10 list-none text-3xl">
        {props.ayaat.map((aya, index) => (
          <AddMistakesPerAya
            key={index}
            text={aya}
            ayaNumber={index}
            pageNumber={props.pageNumber}
            pageMistakes={localPageMistakes}
            setAllMistakes={setPageLocalMistakes}
            setFormDirty={setFormDirty}
          ></AddMistakesPerAya>
        ))}

        {/* TODO: make a cleaner UI for this */}
      </ul>
      <div className="mb-4 flex justify-between">
        {/* FIX: prevent going to page -1 or 605 */}
        <Button
          className="w-min self-end underline"
          onClick={() => {
            if (formDirty) addRevision();
            goToPage(props.pageNumber - 1);
          }}
          variant="ghost"
          disabled={props.pageNumber === 1}
        >
          Go to {props.pageNumber - 1}
        </Button>

        <p className="text-md text-center font-bold ">
          Page {props.pageNumber}
        </p>
        <Button
          className="w-min self-end underline"
          onClick={() => {
            if (formDirty) addRevision();
            goToPage(props.pageNumber + 1);
          }}
          variant="ghost"
          disabled={props.pageNumber > 603}
        >
          Go to {props.pageNumber + 1}
        </Button>
      </div>
    </div>
  );
}
