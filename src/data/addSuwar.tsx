import { db } from "@/lib/firestore";
import { doc, setDoc } from "firebase/firestore";
import { AYAAT } from "./ayaat";
import { AYAT_PER_SURA, PageList } from "./page-meta";
// async function pushSuwar() {
//   for (let index = 0; index < QURAN.length; index++) {
//     const surah = QURAN[index];
//     const { sura, ayaat } = surah;
//     await setDoc(doc(db, "sura", sura.toString()), {
//       title: SURAH_DATA[index][0],
//       ayaat: ayaat,
//     });
//   }
// }

export const calculateSuraNumber = (ayaNumber: number) => {
  for (let index = 0; index <= AYAT_PER_SURA.length - 1; index++) {
    const startAya = AYAT_PER_SURA[index][0];
    const endAya = AYAT_PER_SURA[index][0] + AYAT_PER_SURA[index][1] - 1;
    if (ayaNumber >= startAya && ayaNumber <= endAya) {
      const ayaNumberInSura = ayaNumber - startAya;
      if (index === 0) {
        return { suraNumber: 1, ayaNumberInSura: ayaNumberInSura + 1 };
      }
      return { suraNumber: index + 1, ayaNumberInSura };
    }
    if (ayaNumber - 1 === endAya) {
      return {
        suraNumber: index + 1,
        ayaNumberInSura: AYAT_PER_SURA[index][1],
      };
    }
  }
  return 0;
};
export async function pushPages() {
  let beginIndex = 0;
  let endIndex = 0;

  PageList.forEach(async (pageStartAya, index) => {
    const pageNumber = index + 1;
    beginIndex = pageStartAya - 1;
    endIndex = PageList[pageNumber] - 1;
    const slicedAyaat = AYAAT.slice(beginIndex, endIndex);
    const mappedAyaat = slicedAyaat.map((aya, index) => ({
      aya,
      ayaNumber: beginIndex + index + 1,
      ...calculateSuraNumber(beginIndex + index + 1),
    }));
    const suwarOnPage = new Set(mappedAyaat.map((ayaat) => ayaat.suraNumber));
    const uniqueSuras = Array.from(suwarOnPage);
    // console.log({
    //   ayaat: mappedAyaat,
    //   suwarOnPage: uniqueSuras,
    // });
    await setDoc(doc(db, "page", pageNumber.toString()), {
      ayaat: mappedAyaat,
      suwarOnPage: uniqueSuras,
    });
    console.log("done");
  });
}
