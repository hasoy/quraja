"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import QuranPage from "@/components/QuranPage";
export default function PageView() {
  const [ayaat, setAyaat] = useState([""]);
  const [loading, setLoading] = useState(false);
  const { pageNumber } = useParams();
  const getPageData = async () => {
    const pageNumberInt = Number(pageNumber);
    if (pageNumberInt > 606 || pageNumberInt < 0) {
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
    } catch (error) {
      console.log("Error getting document:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  if (loading) {
    // TODO: add loading spinner/cleaner ui
    return <div>loading</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QuranPage
        ayaat={ayaat}
        pageNumber={Number(pageNumber)}
        suraNumber={0}
        juzNumber={0}
      ></QuranPage>
    </main>
  );
}
