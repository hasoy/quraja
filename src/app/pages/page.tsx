"use client";
import { PageTable } from "@/components/PagesTable";
import { columns } from "@/components/PagesTableColums";
import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";

const PageOverview: React.FC = () => {
  const userData = useContext(UserContext);
  const index = 1;
  const placeholderArray = Array.from({ length: 604 }, (_, i) => ({
    pageNumber: index + i,
    score: 101,
    mistakes: 0,
    totalRevisions: 0,
    streak: 0,
    lastRevised: "",
  }));
  userData?.pageData.forEach((page) => {
    placeholderArray[page.pageNumber - 1] = page;
  });
  return (
    <main className="mx-auto px-2 sm:px-6 md:w-4/6 lg:w-1/2">
      <h1 className="my-4">Page overview</h1>
      <p className="my-4">
        View all your pages with their scores, mistakes and revisions. Click on
        a row to view and revise it again
      </p>
      <PageTable data={placeholderArray} columns={columns} />
    </main>
  );
};

export default PageOverview;
