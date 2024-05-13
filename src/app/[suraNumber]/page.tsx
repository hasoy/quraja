"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import AddMistakesPerAya from "@/components/AddMistakesPerAya";
import { addMistake, getUser } from "@/context/user";

export default function SuraView() {
  const [sura, setSura] = useState([""]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { suraNumber } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "sura", suraNumber.toString());
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

  useEffect(() => {
    getData();
    // addMistake("test", "4", "mistakeIdTest2", { mistake: "test" });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="w-1/2 text-2xl">
        {sura.map((aya, ayaNumber) => (
          <AddMistakesPerAya
            key={ayaNumber}
            text={aya}
            ayaNumber={ayaNumber}
            // TODO: fix
            pageNumber={ayaNumber}
          ></AddMistakesPerAya>
        ))}
      </div>
    </main>
  );
}
