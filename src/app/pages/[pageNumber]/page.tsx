"use client";

import { useContext, useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import QuranPage, { Aya } from "@/components/QuranPage";
import { LoadingElement } from "@/components/LoadingElement";
import { UserContext } from "@/context/UserProvider";
import { useParams } from "next/navigation";
import { IAllMistakeMap } from "@/types/user.types";
export default function PageView() {
  const userData = useContext(UserContext);
  const [ayaat, setAyaat] = useState<Aya[]>([]);
  const [loading, setLoading] = useState(false);
  const [userMistakes, setUserMistakes] = useState<IAllMistakeMap>();
  const { pageNumber } = useParams();

  const getPageData = async () => {
    const pageNumberInt = Number(pageNumber);
    if (pageNumberInt > 606 || pageNumberInt < 1) {
      setAyaat([
        {
          aya: "This page does not exist",
          ayaNumber: 0,
          suraNumber: 0,
          ayaNumberInSura: 0,
        },
      ]);
      return;
    }
    try {
      setLoading(true);
      const docRef = doc(db, "page", pageNumber.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAyaat(docSnap.data().ayaat);
      } else {
        setAyaat([
          {
            aya: "This page does not exist",
            ayaNumber: 0,
            suraNumber: 0,
            ayaNumberInSura: 0,
          },
        ]);
        return;
      }
      // FIX: adjust this to get the mistakes per page instead of all of them
      setUserMistakes(userData.allMistakes);
    } catch (error) {
      console.error("Error getting page data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingElement />
      ) : (
        <QuranPage
          ayaat={ayaat}
          pageNumber={Number(pageNumber)}
          suraNumber={0}
          juzNumber={0}
          // FIX: adjust this to get the mistkaes per page instead of all of them
          pageMistakes={userMistakes ?? new Map()}
        ></QuranPage>
      )}
    </>
  );
}
