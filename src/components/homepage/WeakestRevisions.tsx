import { UserContext } from "@/context/UserProvider";
import React, { useContext, useEffect } from "react";

export default function WeakestRevisions() {
  const userData = useContext(UserContext);
  const [weakestRevisions, setWeakestRevisions] = React.useState<any[]>([]);
  useEffect(() => {
    if (userData?.pageData?.length === 0) return;
    setWeakestRevisions(
      userData?.pageData?.sort((a, b) => a.score - b.score).slice(0, 5),
    );
  }, []);
  return (
    <ul>
      {/* TODO: add pages table and show the weakest on top{" "} */}
      {weakestRevisions?.map((item, index) => (
        <li key={index}>
          <div>pageNumber:{item.pageNumber}</div>
          <div>score:{item.score}</div>
        </li>
      ))}
    </ul>
  );
}
