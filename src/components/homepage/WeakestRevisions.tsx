import { UserContext } from "@/context/UserProvider";
import { calculateScore } from "@/helpers/score";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import NoPagesYet from "./NoPagesYet";
import { calculateSuraNumber, pushPages } from "@/data/addSuwar";

export default function WeakestRevisions() {
  const userData = useContext(UserContext);
  const router = useRouter();
  const [weakestRevisions, setWeakestRevisions] = React.useState<any[]>([]);
  useEffect(() => {
    if (userData?.pageData?.length === 0) return;
    setWeakestRevisions(
      userData?.pageData?.sort((a, b) => a.score - b.score).slice(0, 5),
    );
    // pushPages();
  }, []);
  if (!userData?.pageData?.length) return <NoPagesYet />;
  return (
    <div className="py-10">
      <h3>Your Weakest 5 Pages:</h3>
      <ul className="flex flex-col gap-2">
        {weakestRevisions?.map((item) => (
          <li
            key={item.pageNumber}
            onClick={() => router.push(`/pages/${item.pageNumber}`)}
            className="w-fit rounded border p-2 hover:bg-primary"
          >
            <p className="font-bold">Page number: {item.pageNumber}</p>
            <p>
              Score:{" "}
              {calculateScore(
                item.totalRevisions,
                item.mistakes,
                item.lastRevised,
              )}
              %
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
