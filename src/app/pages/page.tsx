"use client";
import { PageTable } from "@/components/PagesTable";
import { columns } from "@/components/PagesTableColums";
import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";
import { PageInput } from "@/components/PageInput";
const PageOverview: React.FC = () => {
  const userData = useContext(UserContext);
  return (
    <main className="mx-auto px-2 sm:px-6 md:w-4/6 lg:w-1/2">
      <h1 className="my-4">Page overview</h1>
      <p className="mb-8 mt-4">
        View all your pages with their scores, mistakes and revisions. Click on
        a row to view and revise it again. To start a revision, type the page
        number in the following field.
      </p>
      <PageInput />
      <PageTable data={userData.pageData} columns={columns} />
    </main>
  );
};

export default PageOverview;
