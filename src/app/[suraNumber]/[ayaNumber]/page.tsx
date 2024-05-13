"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import QuranPage from "@/components/QuranPage";
import { AYAAT } from "@/data/ayaat";
export default function SuraView() {
  const [sura, setSura] = useState([""]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { ayaNumber } = useParams();

  // TODO: get the aya from the sura. first call the sura then filter the aya number
  const getAyaNumber = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "page", ayaNumber.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSura(docSnap.data().ayaat);
        setTitle(docSnap.data().title);
      } else {
        setSura(["This sura does not exist"]);
      }
    } catch (error) {
      console.log("Error getting document:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QuranPage
        ayaat={AYAAT.slice(0, 10)}
        pageNumber={0}
        suraNumber={0}
        juzNumber={0}
      ></QuranPage>
    </main>
  );
}
