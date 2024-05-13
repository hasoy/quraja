import { db } from "@/lib/firestore";
import { doc, setDoc } from "firebase/firestore";
import { AYAAT } from "./ayaat";
import { PageList } from "./page-meta";
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

export async function pushPages() {
  let beginIndex = 0;
  let endIndex = 0;
  PageList.forEach(async (page, index) => {
    const pageNumber = index + 1;
    beginIndex = page - 1;
    endIndex = PageList[pageNumber] - 1;
    const slicedAyaat = AYAAT.slice(beginIndex, endIndex);
    await setDoc(doc(db, "page", pageNumber.toString()), {
      ayaat: slicedAyaat,
    });
  });
}
