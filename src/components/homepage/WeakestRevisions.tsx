import { UserContext } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function WeakestRevisions() {
  const userData = useContext(UserContext);
  const router = useRouter();
  const [weakestRevisions, setWeakestRevisions] = React.useState<any[]>([]);
  useEffect(() => {
    if (userData?.pageData?.length === 0) return;
    setWeakestRevisions(
      userData?.pageData?.sort((a, b) => a.score - b.score).slice(0, 5),
    );
  }, []);
  return (
    <div className="py-10">
      <h3>Your Weakest Pages:</h3>
      <ul className="flex flex-col gap-2">
        {/* TODO: add pages table and show the weakest on top{" "} */}
        {weakestRevisions?.map((item, index) => (
          <li
            key={index}
            onClick={() => router.push(`/pages/${item.pageNumber}`)}
            className="w-fit border-b p-2 hover:bg-blue-200"
          >
            <div>pageNumber:{item.pageNumber}</div>
            <div>score:{item.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
