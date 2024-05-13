"use client";
import { useState } from "react";
import DropdownMenus from "./DropdownMenus";

// TODO: convert code to use a map instead
export type IMistake = {
  mistake: string;
  note?: string;
};
export type IMistakeMap = Map<string, IMistake>;
interface AddMistakesProps {
  text: string;
  pageNumber: number;
  ayaNumber: number;
  className?: string;
}
export default function AddMistakesPerAya({
  text,
  pageNumber,
  ayaNumber,
}: AddMistakesProps) {
  const [wordMistakes, setWordMistakes] = useState<IMistakeMap>(new Map([]));
  const [letterMistakes, setLetterMistakes] = useState<IMistakeMap>(
    new Map([]),
  );
  const [openLetterMenu, setOpenLetterMenu] = useState(false);
  const [openWordMenu, setOpenWordMenu] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // TODO: fix hover on words to show the mistake on the word. It works for letter already. Also what if letter and word?

  const pageAndAyaNumber = `${pageNumber}-${ayaNumber}`;
  const letterMistakeOptions = [
    { value: "pronounciation", label: "Pronounciation" },
    { value: "harakah", label: "Harakah" },
    { value: "letter", label: "Letter" },
    { value: "madd", label: "Madd" },
    { value: "ikhfa", label: "Ikhfa" },
    { value: "izhar", label: "Izhar" },
    { value: "idgham", label: "Idgham" },
    { value: "shams", label: "Sun or moon letter" },
  ];
  const wordMistakesOptions = [
    { value: "pronounciation", label: "Pronounciation" },
    { value: "word", label: "Wrong word" },
    { value: "forgot", label: "Forgot a word" },
    { value: "shams", label: "Sun or moon letter" },
    { value: "al", label: "Forgot Al prefix" },
  ];

  function HandleLetterClicked(e: MouseEvent) {
    if (!e.target) return;
    const ctrlPressed = e.ctrlKey;
    if (ctrlPressed) return;
    const letterId = (e.target as HTMLElement).id;
    const target = e.target as HTMLElement;

    if (letterMistakes.has(letterId)) {
      // TODO: decide if show a modal to delete it
      letterMistakes.delete(letterId);
      setLetterMistakes(letterMistakes);
      return;
    }
    setSelectedId(letterId);
    setOpenLetterMenu(true);
    letterMistakes.set(letterId, { mistake: target.innerText });
    setLetterMistakes(letterMistakes);
  }

  const getHighlight = (id: string) => {
    if (letterMistakes.has(id)) {
      return "bg-red-300";
    }
    if (wordMistakes.has(id)) {
      return "bg-green-300";
    }
  };

  function handleWordClicked(
    event: MouseEvent<HTMLSpanElement, MouseEvent>,
    wordIndex: string,
    word: string,
  ): void {
    const ctrlPressed = event.ctrlKey;
    if (!ctrlPressed) return;
    const wordId = wordIndex.toString();

    if (wordMistakes.has(wordId)) {
      // TODO: decide if show a modal to delete it
      wordMistakes.delete(wordId);
      setWordMistakes(wordMistakes);
      return;
    }
    setSelectedId(wordId);
    setOpenWordMenu(true);
    wordMistakes.set(wordId, { mistake: word });
    setWordMistakes(wordMistakes);
  }

  function setNoteOnLetterOrWord(value: string) {
    const newNotedLetter = letterMistakes.get(selectedId);
    const newNotedWord = wordMistakes.get(selectedId);
    if (!newNotedLetter && !newNotedWord) return;
    if (newNotedWord) newNotedWord.note = value;
    if (newNotedLetter) newNotedLetter.note = value;

    if (newNotedWord) {
      wordMistakes.delete(selectedId);
      wordMistakes.set(selectedId, newNotedWord);
    } else if (newNotedLetter) {
      letterMistakes.delete(selectedId);
      letterMistakes.set(selectedId, newNotedLetter);
    }
  }

  const getLetterId = (wordIndex: number, letterIndex: number) => {
    return `${pageAndAyaNumber}-${wordIndex}-${letterIndex}`;
  };

  // TODO: make styling better so the ayaat get closer to eachother instead of under eachother
  return (
    <>
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          onClick={(e) =>
            handleWordClicked(e, `${pageAndAyaNumber}-${wordIndex}`, word)
          }
          id={`${pageAndAyaNumber}-${wordIndex}`}
          className={getHighlight(`${pageAndAyaNumber}-${wordIndex}`)}
          title={
            wordMistakes.get(`${pageAndAyaNumber}-${wordIndex}`)?.note
              ? `${
                  wordMistakes.get(`${pageAndAyaNumber}-${wordIndex}`)?.note
                } \nClick to remove mistake`
              : ""
          }
        >
          {" "}
          {word.split("").map((letter, letterIndex) => (
            <span
              key={getLetterId(wordIndex, letterIndex)}
              id={getLetterId(wordIndex, letterIndex)}
              onClick={(e) => HandleLetterClicked(e)}
              className={getHighlight(getLetterId(wordIndex, letterIndex))}
              title={
                letterMistakes.get(getLetterId(wordIndex, letterIndex))?.note
                  ? `${
                      letterMistakes.get(getLetterId(wordIndex, letterIndex))
                        ?.note
                    } \nClick to remove mistake`
                  : ""
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
      <span className="bg-red-800 rounded-xl text-white px-1 mr-1">
        {Number(ayaNumber) + 1}
      </span>
    </>
  );
}
