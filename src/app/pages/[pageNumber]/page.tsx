"use client";

import { useContext, useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import QuranPage from "@/components/QuranPage";
import LoadingElement from "@/components/LoadingElement";
import { IMistakeMap } from "@/types/user.types";
import { UserContext } from "@/context/UserProvider";
import { useParams } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
export default function PageView() {
  const userData = useContext(UserContext);
  const [ayaat, setAyaat] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [userMistakes, setUserMistakes] = useState<IMistakeMap>();
  const { pageNumber } = useParams();

  const getPageData = async () => {
    const pageNumberInt = Number(pageNumber);
    if (pageNumberInt > 606 || pageNumberInt < 1) {
      setAyaat(["This page does not exist"]);
      return;
    }
    try {
      setLoading(true);
      const docRef = doc(db, "page", pageNumber.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAyaat(docSnap.data().ayaat);
      } else {
        setAyaat(["This page does not exist"]);
        return;
      }
      setUserMistakes(userData.allMistakes.get(pageNumber.toString()));
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
          allMistakes={userMistakes}
        ></QuranPage>
      )}
    </>
  );
}
