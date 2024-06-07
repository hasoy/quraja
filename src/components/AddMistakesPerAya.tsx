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
import { AYAT_PER_SURA } from "@/data/page-meta";

interface AddMistakesProps {
  aya: Aya;
  allMistakes: IAllMistakeMap;
  setAllMistakes: (mistakes: IAllMistakeMap) => void;
  setFormDirty: (dirty: boolean) => void;
}
export default function AddMistakesPerAya({
  aya,
  allMistakes,
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
    if (allMistakes.has(currentLetterId)) {
      const deletedMistake = allMistakes.get(currentLetterId);
      if (!deletedMistake) return;
      toast(`Letter mistake fixed`, {
        description: `Deleted \n ${deletedMistake?.marked} ${deletedMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            allMistakes.set(currentLetterId, deletedMistake);
            setNewMap(allMistakes);
          },
        },
      });
      allMistakes.delete(currentLetterId);
      setNewMap(allMistakes);
      return;
    }
    setSelectedId(currentLetterId);
    // TODO: make an async await on the open aya menu and only then add the mistake
    setDropdownId(currentLetterId);
    setOpenLetterMenu(true);
    allMistakes.set(currentLetterId, { marked: target.innerText });
    setNewMap(allMistakes);
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
    if (allMistakes.has(wordId)) {
      const wordMistake = allMistakes.get(wordId);
      if (!wordMistake) return;
      toast(`Word mistake fixed`, {
        description: `Deleted \n ${wordMistake?.marked} ${wordMistake?.note ?? ""}`,
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
    setDropdownId(wordId);
    setOpenWordMenu(true);
    // TODO: make an async await on the open aya menu and only then add the mistake
    allMistakes.set(wordId, { marked: word });
    setNewMap(allMistakes);
  }

  function handleAyaClicked(ayaId: string, mistake: string): void {
    if (allMistakes.has(ayaId)) {
      const ayaMistake = allMistakes.get(ayaId);
      setFormDirty(true);
      toast(`Aya mistake fixed`, {
        description: `Deleted \n ${ayaMistake?.marked} ${ayaMistake?.note ?? ""}`,
        action: {
          label: "Undo",
          onClick: () => {
            allMistakes.set(ayaId, { marked: mistake, note: ayaMistake?.note }),
              setNewMap(allMistakes);
          },
        },
      });
      allMistakes.delete(ayaId);
      setNewMap(allMistakes);
      return;
    }
    setFormDirty(true);
    setDropdownId(ayaId);
    setOpenAyaMenu(true);
    // TODO: make an async await on the open aya menu and only then add the mistake
    allMistakes.set(ayaId, { marked: mistake });
    setNewMap(allMistakes);
  }

  function setAyaValue(pageAndAya: string, value: string) {
    const ayaMistake = allMistakes.get(pageAndAya);
    if (!ayaMistake) return;
    allMistakes.delete(pageAndAya);
    allMistakes.set(pageAndAya, { marked: ayaMistake.marked, note: value });
    setAllMistakes(allMistakes);
  }

  const getHighlight = (id: string) => {
    if (allMistakes?.has(id)) {
      const dashes = id.split("-").length;
      if (dashes === 3)
        return theme === "dark" ? "bg-green-900" : "bg-green-300";
      if (dashes === 4) return theme === "dark" ? "bg-red-900" : "bg-red-300";
    }
  };

  function setNoteOnLetterOrWord(value: string) {
    const newNoted = allMistakes.get(selectedId);
    if (!newNoted) return;
    const newNote = { marked: newNoted.marked, note: value };
    allMistakes.delete(selectedId);
    allMistakes.set(selectedId, newNote);
    setAllMistakes(allMistakes);
    setFormDirty(true);
  }

  const getLetterId = (wordIndex: number, letterIndex: number) => {
    return `${ayaId}-${wordIndex}-${letterIndex}`;
  };

  const bismillah = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيم";
  const ayaContainsBismillah = aya.aya.includes(bismillah);

  // TODO: make styling better so the ayaat get closer to eachother instead of under eachother
  return (
    <span
      className={
        allMistakes?.has(ayaId)
          ? theme === "dark"
            ? "bg-blue-900"
            : "bg-blue-300"
          : ""
      }
    >
      {/* TODO: make better styling */}
      {ayaContainsBismillah && (
        <div className="mb-2 flex justify-around gap-4 bg-primary bg-opacity-90 py-2 text-end text-3xl text-white ">
          <span>{AYAT_PER_SURA[aya.suraNumber - 1][5]} </span>
          <span>{bismillah}</span>
        </div>
      )}
      {aya.aya
        .replace(bismillah, "")
        .split(" ")
        .map((word, wordIndex) => (
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
              allMistakes?.get(`${ayaId}-${wordIndex}`)?.note
                ? `${
                    allMistakes?.get(`${ayaId}-${wordIndex}`)?.note
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
          allMistakes?.get(ayaId)?.note
            ? `${allMistakes?.get(ayaId)?.note} \nClick to remove mistake`
            : undefined
        }
      >
        {Number(aya.ayaNumberInSura)}
      </span>
    </span>
  );
}
