"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import QuranPage from "@/components/QuranPage";
import { getUser } from "@/context/user";
export default function PageView() {
  const [ayaat, setAyaat] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [userMistakes, setUserMistakes] = useState(new Map());

  const { pageNumber } = useParams();
  const getPageData = async () => {
    const pageNumberInt = Number(pageNumber);
    if (pageNumberInt > 606 || pageNumberInt < 1) {
      setAyaat(["This page does not exist"]);
      return;
    }
    setLoading(true);
    try {
      const docRef = doc(db, "page", pageNumber.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAyaat(docSnap.data().ayaat);
      } else {
        setAyaat(["This page does not exist"]);
      }
      await getAllMistakesByUser("test", pageNumber.toString());
    } catch (error) {
      console.error("Error getting document");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  // TODO: add loading spinner/cleaner ui
  const LoadingElement = <div>loading</div>;

  async function getAllMistakesByUser(userId: string, pageNumber: string) {
    // TODO: make a general context function for pulling the user data and use that instead of calling the backend
    try {
      const user = await getUser(userId);
      // FIX: If page has no pagemistakes yet it says allMistakes undefined, below code seems to fix it but check if smarter way
      const map = user.allMistakes.has(pageNumber)
        ? user.allMistakes.get(pageNumber)
        : new Map();
      setUserMistakes(map);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {loading ? (
        LoadingElement
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
