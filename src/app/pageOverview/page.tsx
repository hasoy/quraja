import PagesTable from "@/components/PagesTable";
import React from "react";

function PageOverview() {
  // TODO: remove mock data and pull from api
  // pull data once from backend and pass it to context
  const PageTableData = [
    {
      pageNumber: 1,
      score: 10,
      totalRevisions: 18,
      mistakes: 3,
      streak: 8,
      lastRevised:
        "Thu May 23 2024 20:45:45 GMT+0200 (Central European Summer Time)",
    },
    {
      pageNumber: 2,
      score: 10,
      totalRevisions: 2,
      mistakes: 6,
      streak: 1,
      lastRevised:
        "Thu May 23 2022 20:45:45 GMT+0200 (Central European Summer Time)",
    },
  ];
  return (
    <main className="mx-auto w-4/6">
      <PagesTable data={PageTableData} />
    </main>
  );
}

export default PageOverview;
