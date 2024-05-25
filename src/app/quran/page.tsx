import SuraTable, { SuraTableData } from "@/components/SuraTable";
import React from "react";

export default function Quran() {
  const MistakesData: SuraTableData[] = [
    {
      SuraNumber: 1,
      Sura: "Al-Fatiha",
      Score: "100",
      MemorizedPercent: 100,
      TotalRevisions: 10,
      Mistakes: 0,
      LastRevised: "2021-09-01",
    },
  ];
  return <SuraTable data={MistakesData} />;
}
