"use client";
import { useState } from "react";
import DropdownMenus from "./DropdownMenus";
import {
  ayaMistakesOptions,
  letterMistakeOptions,
  wordMistakesOptions,
} from "@/constants/dropdown-values";
import { toast } from "sonner";
import { IMistakeMap } from "@/types/ayat.types";

interface AddMistakesProps {
  text: string;
  pageNumber: number;
  ayaNumber: number;
  hasMistake?: "similar" | "forgot" | "";
  allMistakes: IMistakeMap;
  setAllMistakes: (mistakes: IMistakeMap) => void;
}
export default function AddMistakesPerAya({
  text,
  pageNumber,
  ayaNumber,
  allMistakes,
  setAllMistakes,
}: AddMistakesProps) {
  const [openLetterMenu, setOpenLetterMenu] = useState(false);
  const [openWordMenu, setOpenWordMenu] = useState(false);
  const [openAyaMenu, setOpenAyaMenu] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const pageAndAyaNumber = `${pageNumber}-${ayaNumber}`;
  // TODO: add ability to change a mistake

  function setNewMap(oldMap: Map<string, { mistake: string; note?: string }>) {
    const newMap = new Map(oldMap);
    setAllMistakes(newMap);
  }

  function HandleLetterClicked(e: MouseEvent) {
    if (!e.target) return;
    const ctrlPressed = e.ctrlKey;
    if (ctrlPressed) return;
    const currentId = (e.target as HTMLElement).id;
    const target = e.target as HTMLElement;

    if (allMistakes.has(currentId)) {
      const deletedMistake = allMistakes.get(currentId);
      // FIX: Notes seem to not get pulled from database
      toast(`Letter mistake fixed`, {
        description: `Deleted \n ${deletedMistake?.mistake} ${deletedMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            allMistakes.set(currentId, deletedMistake);
            setNewMap(allMistakes);
          },
        },
      });
      allMistakes.delete(currentId);
      setNewMap(allMistakes);
      return;
    }
    setSelectedId(currentId);
    // TODO: make an async await on the open aya menu and only then add the mistake

    setOpenLetterMenu(true);
    allMistakes.set(currentId, { mistake: target.innerText });
    setNewMap(allMistakes);
  }

  function handleWordClicked(
    event: MouseEvent<HTMLSpanElement, MouseEvent>,
    wordIndex: string,
    word: string,
  ): void {
    const ctrlPressed = event.ctrlKey;
    if (!ctrlPressed) return;
    const wordId = wordIndex.toString();

    if (allMistakes.has(wordId)) {
      const wordMistake = allMistakes.get(wordId);
      toast(`Word mistake fixed`, {
        description: `Deleted \n ${wordMistake?.mistake} ${wordMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            allMistakes.set(wordId, wordMistake);
            setNewMap(allMistakes);
          },
        },
      });
      allMistakes.delete(wordId);
      setNewMap(allMistakes);
      return;
    }
    setSelectedId(wordId);
    setOpenWordMenu(true);
    // TODO: make an async await on the open aya menu and only then add the mistake
    allMistakes.set(wordId, { mistake: word });
    setNewMap(allMistakes);
  }

  function handleAyaClicked(pageAndAya: string, mistake: string): void {
    if (allMistakes.has(pageAndAya)) {
      const ayaMistake = allMistakes.get(pageAndAya);
      toast(`Aya mistake fixed`, {
        description: `Deleted \n ${ayaMistake?.mistake} ${ayaMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            allMistakes.set(pageAndAya, { mistake }), setNewMap(allMistakes);
          },
        },
      });
      allMistakes.delete(pageAndAya);
      setNewMap(allMistakes);
      return;
    }
    setOpenAyaMenu(true);
    // TODO: make an async await on the open aya menu and only then add the mistake
    allMistakes.set(pageAndAya, { mistake });
    setNewMap(allMistakes);
  }

  function setAyaValue(pageAndAya: string, value: string) {
    const ayaMistake = allMistakes.get(pageAndAya);
    if (!ayaMistake) return;
    allMistakes.delete(pageAndAya);
    allMistakes.set(pageAndAya, { mistake: value });
    setAllMistakes(allMistakes);
  }

  const getHighlight = (id: string) => {
    if (allMistakes?.has(id)) {
      const dashes = id.split("-").length;
      if (dashes === 4) return "bg-green-300";
      if (dashes === 3) return "bg-red-300";
    }
  };

  function setNoteOnLetterOrWord(value: string) {
    const newNoted = allMistakes.get(selectedId);
    if (!newNoted) return;
    if (newNoted) newNoted.note = value;
    allMistakes.delete(selectedId);
    allMistakes.set(selectedId, newNoted);
    setAllMistakes(allMistakes);
  }

  const getLetterId = (wordIndex: number, letterIndex: number) => {
    return `${pageAndAyaNumber}-${wordIndex}-${letterIndex}`;
  };

  // TODO: make styling better so the ayaat get closer to eachother instead of under eachother
  return (
    <span className={allMistakes?.has(pageAndAyaNumber) ? "bg-yellow-100" : ""}>
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          onClick={(e) =>
            handleWordClicked(e, `${pageAndAyaNumber}-${wordIndex}`, word)
          }
          id={`${pageAndAyaNumber}-${wordIndex}`}
          className={`${getHighlight(`${pageAndAyaNumber}-${wordIndex}`)}  font-sans leading-relaxed`}
          title={
            allMistakes?.get(`${pageAndAyaNumber}-${wordIndex}`)?.note
              ? `${
                  allMistakes?.get(`${pageAndAyaNumber}-${wordIndex}`)?.note
                } \nClick to remove mistake`
              : undefined
          }
        >
          {" "}
          {word.split("").map((letter, letterIndex) => (
            <span
              key={getLetterId(wordIndex, letterIndex)}
              id={getLetterId(wordIndex, letterIndex)}
              onClick={HandleLetterClicked}
              className={getHighlight(getLetterId(wordIndex, letterIndex))}
              title={
                allMistakes?.get(getLetterId(wordIndex, letterIndex))?.note
                  ? `${
                      allMistakes?.get(getLetterId(wordIndex, letterIndex))
                        ?.note
                    } \nClick to remove mistake`
                  : undefined
              }
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
      {/* TODO: place the dropdown on the right spot below cursor click  */}
      <DropdownMenus
        openMenu={openLetterMenu}
        setOpenMenu={setOpenLetterMenu}
        portalId={selectedId.toString()}
        onValueChange={setNoteOnLetterOrWord}
        items={letterMistakeOptions}
      />

      <DropdownMenus
        openMenu={openWordMenu}
        setOpenMenu={setOpenWordMenu}
        portalId={selectedId.toString()}
        onValueChange={setNoteOnLetterOrWord}
        items={wordMistakesOptions}
      />

      <DropdownMenus
        openMenu={openAyaMenu}
        setOpenMenu={setOpenAyaMenu}
        portalId={pageAndAyaNumber}
        onValueChange={(value) => setAyaValue(pageAndAyaNumber, value)}
        items={ayaMistakesOptions}
      />
      <span
        className="mr-1 rounded-xl bg-red-800 px-1 text-white"
        onClick={() => {
          handleAyaClicked(pageAndAyaNumber, "");
        }}
        id={pageAndAyaNumber}
      >
        {Number(ayaNumber) + 1}
      </span>
    </span>
  );
}
