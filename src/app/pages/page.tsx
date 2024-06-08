"use client";
import { PageTable } from "@/components/PagesTable";
import { columns } from "@/components/PagesTableColums";
import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";
import PageWrapper from "@/components/PageWrapper";
import { PageAndSuraSelect } from "@/components/PageAndSuraSelect";
const PageOverview: React.FC = () => {
  const userData = useContext(UserContext);
  return (
    <PageWrapper>
      <h1 className="mb-4">Page overview</h1>
      <p className="mb-8 mt-4">
        View all your pages with their scores, mistakes and revisions. Click on
        a row to view and revise it again. To start a revision, type the page
        number in the following field.
      </p>
      <PageAndSuraSelect />

      <PageTable data={userData.pageData} columns={columns} />
    </PageWrapper>
  );
};

export default PageOverview;
