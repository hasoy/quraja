import React from "react";
import AddMistakesPerAya from "./AddMistakesPerAya";
interface QuranPageProps {
  ayaat: string[];
  pageNumber: number;
  suraNumber: number;
  juzNumber: number;
}
export default function QuranPage(props: QuranPageProps) {
  return (
    <div className="flex flex-col">
      <ul className="list-none my-10">
        {props.ayaat.map((aya, index) => (
          <AddMistakesPerAya
            key={index}
            className="list-none"
            text={aya}
            ayaNumber={index}
            pageNumber={props.pageNumber}
          ></AddMistakesPerAya>
        ))}
      </ul>
      <div className="flex">
        <div>Page{props.pageNumber}</div>
        <div>Sura number{props.suraNumber}</div>
        <div>Juz number{props.juzNumber}</div>
      </div>
    </div>
  );
}
