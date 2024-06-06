"use client";
import { useState } from "react";
import DropdownMenus from "./DropdownMenus";
import {
  ayaMistakesOptions,
  letterMistakeOptions,
  wordMistakesOptions,
} from "@/constants/dropdown-values";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Aya } from "./QuranPage";
import { IAllMistakeMap } from "@/types/user.types";

interface AddMistakesProps {
  aya: Aya;
  pageMistakes: IAllMistakeMap;
  setAllMistakes: (mistakes: IAllMistakeMap) => void;
  setFormDirty: (dirty: boolean) => void;
}
export default function AddMistakesPerAya({
  aya,
  pageMistakes,
  setAllMistakes,
  setFormDirty,
}: AddMistakesProps) {
  const [openLetterMenu, setOpenLetterMenu] = useState(false);
  const [openWordMenu, setOpenWordMenu] = useState(false);
  const [openAyaMenu, setOpenAyaMenu] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [dropdownId, setDropdownId] = useState("");
  const { theme } = useTheme();
  const ayaId = aya.ayaNumber.toString();
  // TODO: add ability to change a mistake

  function setNewMap(oldMap: IAllMistakeMap) {
    const newMap = new Map(oldMap);
    setAllMistakes(newMap);
  }

  function HandleLetterClicked(event: unknown) {
    const e: MouseEvent = event as MouseEvent;
    if (!e.target) return;
    const ctrlPressed = e.ctrlKey;
    if (ctrlPressed) return;
    const currentLetterId = (e.target as HTMLElement).id;
    const target = e.target as HTMLElement;
    setFormDirty(true);
    if (pageMistakes.has(currentLetterId)) {
      const deletedMistake = pageMistakes.get(currentLetterId);
      if (!deletedMistake) return;
      toast(`Letter mistake fixed`, {
        description: `Deleted \n ${deletedMistake?.word} ${deletedMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            pageMistakes.set(currentLetterId, deletedMistake);
            setNewMap(pageMistakes);
          },
        },
      });
      pageMistakes.delete(currentLetterId);
      setNewMap(pageMistakes);
      return;
    }
    setSelectedId(currentLetterId);
    // TODO: make an async await on the open aya menu and only then add the mistake
    setDropdownId(currentLetterId);
    setOpenLetterMenu(true);
    pageMistakes.set(currentLetterId, { word: target.innerText });
    setNewMap(pageMistakes);
  }

  function handleWordClicked(
    event: unknown,
    wordIndex: string,
    word: string,
  ): void {
    const ctrlPressed = (event as MouseEvent).ctrlKey;
    if (!ctrlPressed) return;
    const wordId = wordIndex.toString();
    setFormDirty(true);
    if (pageMistakes.has(wordId)) {
      const wordMistake = pageMistakes.get(wordId);
      if (!wordMistake) return;
      toast(`Word mistake fixed`, {
        description: `Deleted \n ${wordMistake?.word} ${wordMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            pageMistakes.set(wordId, wordMistake);
            setNewMap(pageMistakes);
          },
        },
      });
      pageMistakes.delete(wordId);
      setNewMap(pageMistakes);
      return;
    }
    setSelectedId(wordId);
    setDropdownId(wordId);
    setOpenWordMenu(true);
    // TODO: make an async await on the open aya menu and only then add the mistake
    pageMistakes.set(wordId, { word });
    setNewMap(pageMistakes);
  }

  function handleAyaClicked(pageAndAya: string, mistake: string): void {
    if (pageMistakes.has(pageAndAya)) {
      const ayaMistake = pageMistakes.get(pageAndAya);
      setFormDirty(true);
      toast(`Aya mistake fixed`, {
        description: `Deleted \n ${ayaMistake?.word} ${ayaMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            pageMistakes.set(pageAndAya, { word: mistake }),
              setNewMap(pageMistakes);
          },
        },
      });
      pageMistakes.delete(pageAndAya);
      setNewMap(pageMistakes);
      return;
    }
    setFormDirty(true);
    setDropdownId(pageAndAya);
    setOpenAyaMenu(true);
    // TODO: make an async await on the open aya menu and only then add the mistake
    pageMistakes.set(pageAndAya, { word: mistake });
    setNewMap(pageMistakes);
  }

  function setAyaValue(pageAndAya: string, value: string) {
    const ayaMistake = pageMistakes.get(pageAndAya);
    if (!ayaMistake) return;
    pageMistakes.delete(pageAndAya);
    pageMistakes.set(pageAndAya, { word: ayaMistake.word, note: value });
    setAllMistakes(pageMistakes);
  }

  const getHighlight = (id: string) => {
    if (pageMistakes?.has(id)) {
      const dashes = id.split("-").length;
      if (dashes === 3)
        return theme === "dark" ? "bg-green-900" : "bg-green-300";
      if (dashes === 4) return theme === "dark" ? "bg-red-900" : "bg-red-300";
    }
  };

  function setNoteOnLetterOrWord(value: string) {
    const newNoted = pageMistakes.get(selectedId);
    if (!newNoted) return;
    const newNote = { word: newNoted.word, note: value };
    pageMistakes.delete(selectedId);
    pageMistakes.set(selectedId, newNote);
    setAllMistakes(pageMistakes);
    setFormDirty(true);
  }

  const getLetterId = (wordIndex: number, letterIndex: number) => {
    return `${ayaId}-${wordIndex}-${letterIndex}`;
  };

  // TODO: make styling better so the ayaat get closer to eachother instead of under eachother
  return (
    <span
      className={
        pageMistakes?.has(ayaId)
          ? theme === "dark"
            ? "bg-blue-900"
            : "bg-blue-300"
          : ""
      }
    >
      {aya.aya.split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          /* tslint:disable-next-line */
          onClick={(e: unknown) =>
            handleWordClicked(e, `${ayaId}-${wordIndex}`, word)
          }
          // TODO: add on hover for phone users to also ctrl click a work and add mistake
          id={`${ayaId}-${wordIndex}`}
          className={`${getHighlight(`${ayaId}-${wordIndex}`)}  font-sans leading-relaxed`}
          title={
            pageMistakes?.get(`${ayaId}-${wordIndex}`)?.note
              ? `${
                  pageMistakes?.get(`${ayaId}-${wordIndex}`)?.note
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
                pageMistakes?.get(getLetterId(wordIndex, letterIndex))?.note
                  ? `${
                      pageMistakes?.get(getLetterId(wordIndex, letterIndex))
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
      {setOpenLetterMenu && (
        <DropdownMenus
          openMenu={openLetterMenu}
          setOpenMenu={setOpenLetterMenu}
          portalId={dropdownId}
          onValueChange={setNoteOnLetterOrWord}
          items={letterMistakeOptions}
        />
      )}
      {setOpenWordMenu && (
        <DropdownMenus
          openMenu={openWordMenu}
          setOpenMenu={setOpenWordMenu}
          portalId={dropdownId}
          onValueChange={setNoteOnLetterOrWord}
          items={wordMistakesOptions}
        />
      )}
      {setOpenAyaMenu && (
        <DropdownMenus
          openMenu={openAyaMenu}
          setOpenMenu={setOpenAyaMenu}
          portalId={dropdownId}
          onValueChange={(value) => setAyaValue(ayaId, value)}
          items={ayaMistakesOptions}
        />
      )}
      <span
        className="mr-1 rounded-xl bg-primary px-1 text-white"
        onClick={() => {
          handleAyaClicked(ayaId, "");
        }}
        id={ayaId}
        title={
          pageMistakes?.get(ayaId)?.note
            ? `${pageMistakes?.get(ayaId)?.note} \nClick to remove mistake`
            : undefined
        }
      >
        {Number(aya.ayaNumberInSura)}
      </span>
    </span>
  );
}
